import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginRequiredModal from "../components/LoginRequiredModal";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Accessories() {
  const { user } = useAuth();
const [showLoginModal, setShowLoginModal] = useState(false);
const [accessoriesProducts, setAccessoriesProducts] = useState([]);
const { wishlist, addToWishlist } = useWishlist();
const { addToCart } = useCart();

useEffect(() => {
  api
.get("/api/accessories?page=0&size=12")
    .then((response) => {
      console.log(response.data);

      const products = response.data.content.map((p) => ({
        id: p.id,
        name: p.productName,
image: `https://fashion-ecommerce-dnv8.onrender.com${p.imageUrl}`,
        price: p.price,
        rating: p.rating,
        stock: p.stock,
        category: p.category,
        description: p.description,
      }));

      setAccessoriesProducts(products);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);
  return (
    <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="h-[70vh] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
          <p className="uppercase tracking-[5px]">
            Premium Accessories
          </p>

          <h1 className="text-6xl md:text-7xl font-bold mt-4">
            Complete Your Style
          </h1>

          <p className="mt-6 max-w-xl">
            Watches, wallets, bags, sunglasses and more.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            "All",
            "Watches",
            "Wallets",
            "Bags",
            "Caps",
            "Sunglasses",
          ].map((item) => (
            <button
              key={item}
               className="px-7 py-3 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 
        text-[#3D2C2E] font-medium shadow-lg transition-all duration-300 hover:bg-[#C9A66B]/80 hover:text-white 
        hover:border-[#C9A66B] hover:shadow-[0_10px_30px_rgba(201,166,107,0.35)] hover:-translate-y-1"
      >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-[#3D2C2E]">
              Accessories Collection
            </h2>

            <p className="text-gray-600 mt-2">
              Showing {accessoriesProducts.length} Products
            </p>
          </div>

           <select className="px-5 py-3 rounded-xl bg-white/30 backdrop-blur-xl border border-white/40
text-[#3D2C2E] font-medium shadow-lg outline-none cursor-pointer
transition-all duration-300 hover:bg-white/40 hover:border-[#C9A66B] hover:shadow-[0_10px_30px_rgba(201,166,107,0.25)] focus:ring-2 focus:ring-[#C9A66B]/40 focus:border-[#C9A66B]">
  <option>Sort by</option>
  <option>Newest</option>
  <option>Price: Low to High</option>
  <option>Price: High to Low</option>
  <option>Best Selling</option>
</select>
  </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {accessoriesProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      user={user}
      addToWishlist={addToWishlist}
      addToCart={addToCart}
      setShowLoginModal={setShowLoginModal}
    />
  ))}
</div>
      </section>

      {/* Banner */}
      <section className="bg-black text-white py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold">
            Upgrade Your Accessories
          </h2>

          <p className="mt-4 text-gray-300">
            Elevate every outfit with timeless accessories.
          </p>

          <button className="mt-8 bg-[#F5F0E8] text-black px-8 py-3 rounded-full font-semibold">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 bg-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200"
            alt="Accessories"
            className="rounded-3xl"
          />

          <div>
            <p className="uppercase text-[#B8956A]">
              Featured Collection
            </p>

            <h2 className="text-5xl font-bold mt-4 text-[#3D2C2E]">
              Luxury Accessories
            </h2>

            <p className="text-gray-600 mt-6">
              Explore premium watches, wallets,
              sunglasses, bags and other accessories
              designed to complement every outfit.
            </p>

            <button className="mt-8 bg-black text-white px-8 py-3 rounded-full hover:bg-[#C9A66B] transition">
              Explore Collection
            </button>
          </div>
<LoginRequiredModal
  isOpen={showLoginModal}
  onClose={() => setShowLoginModal(false)}
/>
  </div>
</section>

      <Footer />
    </div>
  );
}