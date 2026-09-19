import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0] min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#3D2C2E]">My Wishlist ❤️</h2>
          <p className="text-gray-600 mt-2">
            {wishlist.length > 0
              ? `${wishlist.length} ${wishlist.length === 1 ? "Item" : "Items"} saved`
              : "Save your favorite styles and shop them anytime."}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <FaHeartBroken className="text-[#8B6F63] mb-6" size={80} />
            <h2 className="text-3xl font-bold text-[#3D2C2E]">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mt-4 text-center max-w-md">
              Browse our latest collections and add your favourite products here.
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
            {wishlist.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group bg-[#FDFBF7] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 border border-[#F0E6D2] block"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#3D2C2E]">
                    {item.name}
                  </h3>

                  {item.size && (
                    <p className="text-[#B8956A] text-sm mt-1">
                      Size: {item.size}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-[#3D2C2E]">
                      {item.price}
                    </span>
                  </div>

                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(item.id);
                    }}
                    className="w-full mt-5 bg-[#3D2C2E] text-white py-3 rounded-xl font-semibold hover:bg-[#C9A66B] transition text-center cursor-pointer"
                  >
                    Remove from Wishlist
                  </div>
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