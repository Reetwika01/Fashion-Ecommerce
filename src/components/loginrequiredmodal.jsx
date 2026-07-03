import { useNavigate, useLocation } from "react-router-dom";

export default function LoginRequiredModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[380px] text-center shadow-2xl">

        <h2 className="text-3xl font-bold mb-4">
          Login Required
        </h2>

        <p className="text-gray-600 mb-8">
          Please login or create an account to add products to your cart or wishlist.
        </p>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login", { state: { from: location.pathname } })}
            className="flex-1 bg-black text-white py-3 rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup", { state: { from: location.pathname } })}
            className="flex-1 bg-[#C9A66B] text-white py-3 rounded-lg"
          >
            Sign Up
          </button>

        </div>

        <button
          onClick={onClose}
          className="mt-5 text-gray-500 hover:text-black"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}