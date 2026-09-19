
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { useState } from "react";

export default function ProductCard({
  product,
  user,
  addToWishlist,
  addToCart,
  setShowLoginModal,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-[#FDFBF7] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 border border-[#F0E6D2]"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-72 bg-[#E8DCC8]">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#E8DCC8] via-[#F5F0E8] to-[#E8DCC8]" />
        )}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          className={`h-72 w-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();

            if (!user) {
              setShowLoginModal(true);
              return;
            }

            addToWishlist(product);
          }}
          className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[#C9A66B] hover:text-white transition"
        >
          <FaHeart />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-lg font-semibold text-[#3D2C2E]">
          {product.name}
        </h3>

        <p className="text-[#B8956A] text-sm mt-0.5">
          Premium Collection
        </p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => {
            if (product.rating >= star) {
              return (
                <FaStar
                  key={star}
                  className="text-[#C9A66B]"
                />
              );
            } else if (product.rating >= star - 0.5) {
              return (
                <FaStarHalfAlt
                  key={star}
                  className="text-[#C9A66B]"
                />
              );
            } else {
              return (
                <FaRegStar
                  key={star}
                  className="text-[#C9A66B]"
                />
              );
            }
          })}

          <span className="text-gray-500 text-sm ml-2">
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-xl font-bold text-[#3D2C2E]">
              ₹{product.price}
            </span>

            <span className="text-gray-400 line-through text-sm ml-2">
              ₹999
            </span>
          </div>

          <span className="text-green-700 text-sm font-semibold">
            50% OFF
          </span>
        </div>

        {/* Add To Cart */}
        <button
          onClick={(e) => {
            e.preventDefault();

            if (!user) {
              setShowLoginModal(true);
              return;
            }

            addToCart(product);
          }}
          className="w-full mt-3 bg-[#3D2C2E] text-white py-3 rounded-xl font-semibold hover:bg-[#C9A66B] transition"
        >
          🛒 Add To Cart
        </button>
      </div>
    </Link>
  );
}
