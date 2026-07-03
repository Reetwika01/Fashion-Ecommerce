import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0] min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#3D2C2E]">Shopping Cart 🛒</h2>
          <p className="text-gray-600 mt-2">
            {cart.length > 0
              ? `${cart.length} ${cart.length === 1 ? "Item" : "Items"} in your cart`
              : "Review your selected items before checkout."}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <FaShoppingCart className="text-[#8B6F63] mb-6" size={80} />
            <h2 className="text-3xl font-bold text-[#3D2C2E]">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mt-4 text-center max-w-md">
              Add products to your cart and they will appear here.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="mt-8 bg-[#3D2C2E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#C9A66B] transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {cart.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group bg-[#FDFBF7] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 border border-[#F0E6D2]"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#3D2C2E]">
                    {item.name}
                  </h3>

                  {item.size && (
                    <p className="text-[#B8956A] text-sm mt-1">
                      Size: {item.size}
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-[#3D2C2E]">
                      {item.price}
                    </span>
                  </div>

                  {/* Remove from Cart */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromCart(item.id);
                    }}
                    className="w-full mt-5 bg-[#3D2C2E] text-white py-3 rounded-xl font-semibold hover:bg-[#C9A66B] transition"
                  >
                    Remove from Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}