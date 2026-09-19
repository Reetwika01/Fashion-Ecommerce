package com.example.shopping_ecommerce.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access-token.expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token.expiration}")
    private long refreshTokenExpiration;

    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(
                jwtSecret.getBytes(StandardCharsets.UTF_8)
        );
    }

    /**
     * Generate Access Token
     */
    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(
                new HashMap<>(),
                userDetails,
                accessTokenExpiration
        );
    }

    /**
     * Generate Access Token with Extra Claims
     */
    public String generateAccessToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return generateToken(
                extraClaims,
                userDetails,
                accessTokenExpiration
        );
    }

    /**
     * Generate Refresh Token
     */
    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(
                new HashMap<>(),
                userDetails,
                refreshTokenExpiration
        );
    }

    /**
     * Common JWT Generation Method
     */
    private String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {

        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract Username (Email)
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extract Expiration Date
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extract Any Claim
     */
    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ) {

        final Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    /**
     * Extract All Claims
     */
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Check if Token Expired
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Validate Token
     */
    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        final String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

}