import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/newsletter";
import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.jpeg";
import hero2 from "../assets/hero2.jpeg";
import hero3 from "../assets/hero3.jpeg";
import { useState, useEffect } from "react";
import { allProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import LoginRequiredModal from "../components/LoginRequiredModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FaTruck,
  FaUndoAlt,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaPaperPlane,
} from "react-icons/fa";
import {
  FaUsers,
  FaShoppingBag,
  FaGem,
} from "react-icons/fa";
const heroImages = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2000",
  hero1,hero3,hero2,
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=2000",
];
const homeProducts = allProducts.filter(
  (product) => product.category === "Home"
);
export default function Home() {
  const navigate = useNavigate();
const { user } = useAuth();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
    const [currentImage, setCurrentImage] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 3000); // changes every 3 seconds
  return () => clearInterval(interval);
}, []);
const nextSlide = () => {
  setCurrentImage((prev) => (prev + 1) % heroImages.length);
};
const prevSlide = () => {
  setCurrentImage(
    (prev) => (prev - 1 + heroImages.length) % heroImages.length);
};
  return (
    <div className="bg-gradient-to-br
from-[#FFFDF9]
via-[#F8EFE0]
to-[#E7C9A5]">
      <Navbar />

      {/* HERO */}
     <section className="h-[90vh] relative overflow-hidden">
  <img
    src={heroImages[currentImage]}
    alt="Fashion Banner"
    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
  />

  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
    <p className="uppercase tracking-[5px] text-gray-300">
      New Season Collection
    </p>

    <h1 className="text-6xl md:text-8xl font-bold mt-4">
      Elevate Your Style
    </h1>

    <p className="max-w-xl mt-6 text-lg text-gray-200">
      Discover premium fashion designed for modern lifestyles.
    </p>
  </div>
{/* Left Arrow */}
<button
  onClick={prevSlide}
  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/40 transition"
>
  <FaChevronLeft size={20} />
</button>

{/* Right Arrow */}
<button
  onClick={nextSlide}
  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/40 transition"
>
  <FaChevronRight size={20} />
</button>
  {/* Dots */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
    {heroImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImage(index)}
        className={`w-3 h-3 rounded-full ${
          currentImage === index
            ? "bg-white"
            : "bg-white/50"
        }`}
      />
    ))}
  </div>
</section>
      {/* STATS */}
<section className="py-24 bg-gradient-to-b from-[#FAF6EF] via-[#F0E6D2] to-[#FAF6EF] overflow-hidden">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center mb-16">

      <p className="uppercase tracking-[4px] text-[#B8956A] font-semibold">
        Our Achievements
      </p>

      <h2 className="text-5xl font-bold mt-3">
        Trusted by Thousands
      </h2>

      <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-8">
        We are proud of our journey and the trust our customers
        place in us every day.
      </p>

    </div>

    {/* Cards */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

      {[
        {
          icon: <FaUsers />,
          number: "10K+",
          title: "Happy Customers",
        },
        {
          icon: <FaShoppingBag />,
          number: "500+",
          title: "Products",
        },
        {
          icon: <FaGem />,
          number: "50+",
          title: "Top Brands",
        },
        
      ].map((item, index) => (

        <div
          key={index}
          className="group relative bg-[#FDFBF7] rounded-[35px] p-8 pt-16 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_35px_60px_rgba(0,0,0,0.18)]"
        >

          {/* Glow */}

          <div className="absolute inset-0 rounded-[35px] bg-gradient-to-b from-[#E8DCC8] to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

          {/* Icon */}

          <div className="absolute -top-10 left-1/2 -translate-x-1/2">

            <div className="w-20 h-20 rounded-full bg-[#FDFBF7] shadow-2xl flex items-center justify-center text-4xl text-[#B8956A] border-4 border-[#F0E6D2] group-hover:scale-110 transition duration-500">

              {item.icon}

            </div>

          </div>

          {/* Number */}

          <h2 className="text-5xl font-extrabold text-center mt-6">

            {item.number}

          </h2>

          {/* Divider */}

          <div className="w-16 h-1 bg-[#C9A66B] rounded-full mx-auto my-5"></div>

          {/* Title */}

          <p className="text-center text-gray-600 text-lg">

            {item.title}

          </p>

          {/* Bottom Glow */}

          <div className="absolute bottom-0 left-5 right-5 h-3 rounded-full bg-[#D4C4A0] blur-xl opacity-0 group-hover:opacity-60 transition"></div>

        </div>

      ))}

    </div>

  </div>

</section>
      {/* SHOP CATEGORIES */}
<section className="py-24 bg-gradient-to-b from-[#F0E6D2] via-[#FAF6EF] to-[#F0E6D2]">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-16">

      <span className="uppercase tracking-[4px] text-[#B8956A] font-semibold">
        Shop By Category
      </span>

      <h2 className="text-5xl font-bold mt-3">
        Discover Your Style
      </h2>

      <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
        Browse our carefully curated collections crafted for every
        occasion and every personality.
      </p>

    </div>

    {/* Categories */}

    <div className="grid md:grid-cols-3 gap-10">

      {[
        {
          title: "Men",
          path:"/men",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Women",
          path:"/women",
          image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
        },
        {
          title: "Accessories",
          path:"/accessories",
          image:
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
        },
      ].map((category, index) => (

        <div
          key={index}
          className="group relative overflow-hidden rounded-[30px] shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-3"
        >

          {/* Image */}
          <img
            src={category.image}
            alt={category.title}
            className="h-[450px] w-full object-cover group-hover:scale-110 transition duration-700"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-8 text-white">

            <h3 className="text-4xl font-bold mt-2">
              {category.title}
            </h3>

           <Link
  to={category.path}
  className="inline-block mt-6 bg-[#F5F0E8] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#C9A66B] hover:text-white transition"
>
  Shop Now →
</Link>

          </div>

        </div>

      ))}

    </div>

  </div>
</section>

      {/* FEATURED COLLECTION */}
      <section className="py-24 bg-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
            alt=""
            className="rounded-3xl"
          />

          <div>
            <p className="uppercase text-[#B8956A] tracking-wider">
              Featured Collection
            </p>

            <h2 className="text-5xl font-bold mt-4">
              Fashion That Defines You
            </h2>

            <p className="text-gray-600 mt-6">
              Carefully curated pieces that combine luxury,
              comfort, and modern design.
            </p>

            <button className="mt-8 bg-black text-white px-8 py-3 rounded-full">
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
<section className=" py-10  bg-[#F0E6D2]">
  <div className="max-w-7xl mx-auto px-6">
  <div className="flex justify-between items-center mb-12">
    <h2 className="text-4xl font-bold text-[#3D2C2E]">
      New Arrivals
    </h2>

    <button className="border border-[#C9A66B] text-[#B8956A] px-6 py-2 rounded-full hover:bg-[#C9A66B] hover:text-white transition">
      View All
    </button>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {homeProducts.map((product) => (
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
  </div>
</section>
      {/* SALE BANNER */}
      <section className="bg-black text-white py-24">
        <div className="max-w-6xl mx-auto text-center px-6">
          <p className="uppercase tracking-[5px] text-gray-400">
            Summer Collection
          </p>

          <h2 className="text-5xl md:text-7xl font-bold mt-4">
            Up To 50% OFF
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-gray-300">
            Discover premium styles crafted for comfort,
            elegance and everyday confidence.
          </p>

          <button className="mt-8 bg-[#F5F0E8] text-black px-8 py-4 rounded-full font-semibold">
            Shop Now
          </button>
        </div>
      </section>

     {/* FEATURES */}
<section className="py-24 bg-gradient-to-b from-[#E8DCC8] to-[#FAF6EF]">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-5xl font-bold text-center mb-16">
      Why Choose Us
    </h2>

    <div className="grid md:grid-cols-4 gap-10">

      {[
        {
          icon: <FaTruck />,
          title: "Free Shipping",
          desc: "Fast and secure delivery on all orders.",
          color: "from-[#C9A66B] to-[#D4C4A0]",
        },
        {
          icon: <FaUndoAlt />,
          title: "Easy Returns",
          desc: "30-day hassle-free return policy.",
          color: "from-[#B8956A] to-[#E8DCC8]",
        },
        {
          icon: <FaShieldAlt />,
          title: "Secure Payment",
          desc: "100% encrypted and protected checkout.",
          color: "from-[#8B6F63] to-[#C9A66B]",
        },
        {
          icon: <FaHeadset />,
          title: "24/7 Support",
          desc: "Always here to help whenever you need.",
          color: "from-[#D4C4A0] to-[#B8956A]",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="group relative rounded-3xl bg-[#FDFBF7] p-8 shadow-xl transition-all duration-500 hover:-translate-y-5 hover:rotate-1 hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
        >
          {/* Glow */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 blur-3xl group-hover:opacity-30 transition duration-500`}
          ></div>

          {/* Icon */}
          <div
            className={`relative z-10 w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-3xl shadow-2xl group-hover:scale-110 transition duration-500`}
          >
            {item.icon}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center mt-6">
            <h3 className="text-2xl font-bold">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-3 leading-7">
              {item.desc}
            </p>
          </div>

          {/* Bottom Line */}
          <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-3xl bg-gradient-to-r from-transparent via-[#D4C4A0] to-transparent group-hover:via-black transition"></div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* TESTIMONIALS */}
<section className="py-24 bg-gradient-to-b from-[#E8DCC8] via-[#FAF6EF] to-[#E8DCC8]">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center">
      What Our Customers Say
    </h2>

    <p className="text-center text-gray-600 mt-4 mb-16">
      Trusted by thousands of happy shoppers worldwide.
    </p>

    <div className="grid md:grid-cols-3 gap-10">

      {[
        {
          name: "John Smith",
          role: "Verified Buyer",
          image:
            "https://randomuser.me/api/portraits/men/32.jpg",
          review:
            "Amazing quality! The hoodie exceeded my expectations and delivery was incredibly fast.",
        },
        {
          name: "Sophia Lee",
          role: "Fashion Blogger",
          image:
            "https://randomuser.me/api/portraits/women/44.jpg",
          review:
            "Absolutely love the premium fabric and stylish design. I'll definitely shop again!",
        },
        {
          name: "David Wilson",
          role: "Regular Customer",
          image:
            "https://randomuser.me/api/portraits/men/85.jpg",
          review:
            "Best online fashion store I've used. Great customer support and excellent product quality.",
        },
      ].map((user, index) => (
        <div
          key={index}
          className="group relative bg-[#FDFBF7]/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-[#E8DCC8] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
        >
          {/* Quote Icon */}
          <div className="absolute -top-6 left-8 w-14 h-14 rounded-full bg-gradient-to-r from-[#C9A66B] to-[#D4C4A0] flex items-center justify-center text-white shadow-xl">
            <FaQuoteLeft />
          </div>

          {/* Customer */}
          <div className="flex items-center mt-6">

            <img
              src={user.image}
              alt={user.name}
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <div className="ml-4">
              <h3 className="font-bold text-lg">
                {user.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {user.role}
              </p>
            </div>

          </div>

          {/* Stars */}
          <div className="flex text-yellow-400 text-lg mt-6 gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className="group-hover:scale-125 transition duration-300"
              />
            ))}
          </div>

          {/* Review */}
          <p className="text-gray-600 mt-6 leading-8 italic">
            "{user.review}"
          </p>

          {/* Bottom Gradient Line */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#C9A66B] via-[#D4C4A0] to-[#B8956A] rounded-b-3xl"></div>

        </div>
      ))}

    </div>
<LoginRequiredModal
  isOpen={showLoginModal}
  onClose={() => setShowLoginModal(false)}
/>
  </div>
</section>
<Newsletter />    


      <Footer />
    </div>
  );
}