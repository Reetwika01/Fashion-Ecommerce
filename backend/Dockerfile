FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x gradlew
RUN ./gradlew build -x test

EXPOSE 10000

CMD ["sh", "-c", "java -jar build/libs/shopping-ecommerce-0.0.1-SNAPSHOT.jar --server.port=${PORT:-10000}"]