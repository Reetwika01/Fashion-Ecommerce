import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { allProducts } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const product = allProducts.find((p) => p.id === Number(id));

  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="text-center py-24 text-3xl font-bold text-[#3D2C2E] bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0]">
          Product Not Found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0]">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Image */}
            <div>
              <div className="bg-[#F0E6D2] rounded-3xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[600px] object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Details */}
            <div>

              <span className="bg-[#E8DCC8] text-[#3D2C2E] px-4 py-2 rounded-full text-sm font-semibold">
                In Stock
              </span>

              <h1 className="text-5xl font-bold mt-5 text-[#3D2C2E]">
                {product.name}
              </h1>

              <div className="flex items-center mt-4">
                <span className="text-[#C9A66B] text-xl">
                  ★★★★★
                </span>

                <span className="ml-3 text-gray-500">
                  4.9 (250 Reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <h2 className="text-4xl font-bold text-[#B8956A]">
                  {product.price}
                </h2>

                <span className="line-through text-gray-400 text-xl">
                  ₹9999
                </span>

                <span className="bg-[#F0E6D2] text-[#8B6F63] px-3 py-1 rounded-full">
                  50% OFF
                </span>
              </div>

              <p className="mt-8 text-gray-600 leading-8">
                {product.description || "Premium quality fashion product."}
              </p>

              {/* Size */}
              <div className="mt-10">
                <h3 className="font-bold mb-4 text-[#3D2C2E]">Select Size</h3>

                <div className="flex gap-4">
                  {["S", "M", "L", "XL"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-14 h-14 rounded-xl border border-[#E0D4BC] font-semibold transition ${
                        size === s
                          ? "bg-[#3D2C2E] text-white"
                          : "text-[#3D2C2E] hover:bg-[#C9A66B] hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-10">
                <h3 className="font-bold mb-4 text-[#3D2C2E]">Quantity</h3>

                <div className="flex items-center border border-[#E0D4BC] rounded-xl w-fit bg-[#FDFBF7]">

                  <button
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    className="px-5 py-3 text-xl text-[#3D2C2E]"
                  >
                    −
                  </button>

                  <span className="px-8 text-lg font-bold text-[#3D2C2E]">
                    {qty}
                  </span>

                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-5 py-3 text-xl text-[#3D2C2E]"
                  >
                    +
                  </button>

                </div>
              </div>

              {/* Buttons */}
              <div className="grid md:grid-cols-3 gap-4 mt-12">

                <button
                  onClick={() => addToCart({ ...product, quantity: qty, size })}
                  className="bg-[#3D2C2E] text-white py-4 rounded-xl hover:bg-[#C9A66B] transition font-semibold"
                >
                  🛒 Add To Cart
                </button>

                <button
                  onClick={() => addToWishlist(product)}
                  className="border border-[#C9A66B] text-[#3D2C2E] py-4 rounded-xl hover:bg-[#C9A66B] hover:text-white transition font-semibold"
                >
                  ❤ Wishlist
                </button>

                <button
  onClick={() =>
    navigate("/checkout", { state: { product: { ...product, quantity: qty, size } } })
  }
  className="bg-[#8B6F63] text-white py-4 rounded-xl hover:bg-[#6E574C] transition font-semibold"
>
  Buy Now
</button>

              </div>

              {/* Features */}
              <div className="mt-12 bg-[#FDFBF7] border border-[#F0E6D2] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#3D2C2E]">
                  Product Highlights
                </h3>

                <ul className="space-y-3 text-gray-600">
                  <li>✔ Premium Quality Fabric</li>
                  <li>✔ Comfortable Fit</li>
                  <li>✔ Easy Returns</li>
                  <li>✔ Free Shipping</li>
                  <li>✔ Secure Payment</li>
                </ul>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}