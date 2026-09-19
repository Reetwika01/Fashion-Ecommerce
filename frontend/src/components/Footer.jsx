import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2A1F1D] text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>

          <h2 className="text-4xl font-extrabold text-white">
            Fashion
            <span className="text-[#C9A66B]">X</span>
          </h2>

          <p className="mt-6 leading-8 text-gray-400">
            Discover premium fashion crafted for modern lifestyles.
            We bring quality, comfort and elegance together in every
            collection.
          </p>

          <div className="flex gap-4 mt-8">

            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="w-11 h-11 rounded-full bg-[#3D2C2E] hover:bg-[#C9A66B] transition duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
                >
                  <Icon />
                </div>
              )
            )}

          </div>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-white text-2xl font-semibold mb-6">
            Quick Links
          </h3>

          <ul className="space-y-4">

            <li>
              <Link to="/" className="hover:text-[#C9A66B] transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/men" className="hover:text-[#C9A66B] transition">
                Men
              </Link>
            </li>

            <li>
              <Link to="/women" className="hover:text-[#C9A66B] transition">
                Women
              </Link>
            </li>

            <li>
              <Link
                to="/accessories"
                className="hover:text-[#C9A66B] transition"
              >
                Accessories
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-[#C9A66B] transition">
                Contact
              </Link>
            </li>

          </ul>

        </div>

        {/* Categories */}

        <div>

          <h3 className="text-white text-2xl font-semibold mb-6">
            Categories
          </h3>

          <ul className="space-y-4">

            <li className="hover:text-[#C9A66B] cursor-pointer transition">
              Hoodies
            </li>

            <li className="hover:text-[#C9A66B] cursor-pointer transition">
              Jackets
            </li>

            <li className="hover:text-[#C9A66B] cursor-pointer transition">
              Sneakers
            </li>

            <li className="hover:text-[#C9A66B] cursor-pointer transition">
              T-Shirts
            </li>

            <li className="hover:text-[#C9A66B] cursor-pointer transition">
              New Arrivals
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-white text-2xl font-semibold mb-6">
            Contact Us
          </h3>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#C9A66B]" />
              <span>Bangalore, India</span>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#C9A66B]" />
              <span>+91 9876543210</span>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-[#C9A66B]" />
              <span>support@fashionx.com</span>
            </div>

          </div>

          <div className="flex gap-4 text-4xl mt-10">

            <FaCcVisa className="hover:text-[#D4C4A0] transition cursor-pointer" />

            <FaCcMastercard className="hover:text-[#D4C4A0] transition cursor-pointer" />

            <FaCcPaypal className="hover:text-[#D4C4A0] transition cursor-pointer" />

            <FaCcAmex className="hover:text-[#D4C4A0] transition cursor-pointer" />

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-[#3D2C2E]">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">
            © 2026 FashionX. All Rights Reserved.
          </p>

          <div className="flex gap-8 mt-4 md:mt-0">

            <Link
              to="/privacy"
              className="hover:text-[#C9A66B] transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-[#C9A66B] transition"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;