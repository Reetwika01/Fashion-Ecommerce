import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#F5F0E8] via-[#EFE4D0] to-[#E8DCC8] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-3xl font-extrabold text-[#3D2C2E]"
          >
            Fashion
            <span className="bg-gradient-to-r from-[#C9A66B] to-[#8B6F63] bg-clip-text text-transparent">
              X
            </span>
          </Link>

          {/* Search */}
          {/* Search */}
<div className="hidden lg:flex items-center bg-white border border-[#E0D4BC] rounded-full px-4 py-2 w-96 shadow-sm focus-within:border-[#C9A66B] focus-within:ring-2 focus-within:ring-[#C9A66B]/30 transition">
  <FiSearch className="text-[#8B6F63]" />

  <input
    type="text"
    placeholder="Search products..."
    className="bg-transparent outline-none ml-3 w-full text-[#3D2C2E] placeholder:text-[#9C8B7A]"
  />
</div>

        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 font-medium text-[#3D2C2E]">

          <li><Link to="/" className="hover:text-[#B8956A] transition">Home</Link></li>

          <li><Link to="/men" className="hover:text-[#B8956A] transition">Men</Link></li>

          <li><Link to="/women" className="hover:text-[#B8956A] transition">Women</Link></li>

          <li><Link to="/accessories" className="hover:text-[#B8956A] transition">Accessories</Link></li>

        </ul>

        {/* Icons */}
        <div className="flex gap-4">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#FDFBF7] to-[#E8DCC8] text-[#3D2C2E] hover:from-[#D4C4A0] hover:to-[#8B6F63] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
          >
            <FiHeart />

            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-[#B8956A] to-[#8B6F63] text-white w-5 h-5 rounded-full text-xs flex items-center justify-center shadow">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#FDFBF7] to-[#E8DCC8] text-[#3D2C2E] hover:from-[#D4C4A0] hover:to-[#8B6F63] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
          >
            <FiShoppingBag />

            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-[#B8956A] to-[#8B6F63] text-white w-5 h-5 rounded-full text-xs flex items-center justify-center shadow">
                {cart.length}
              </span>
            )}
          </Link>

         
          {/* User */}
<Link
  to="/profile"
  className="w-10 h-10 rounded-full bg-[#F5F0E8] text-[#3D2C2E] hover:bg-[#C9A66B] hover:text-white flex items-center justify-center transition"
>
  <FiUser />
</Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;