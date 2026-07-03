import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    addressLine: "",
    city: "",
    pincode: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (existing) {
      setError("An account with this email already exists. Please login instead.");
      return;
    }

    const joined = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const newUser = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password, // NOTE: demo only — never store plain-text passwords in production
      joined,
      address: {
        line1: form.addressLine,
        city: form.city,
        pincode: form.pincode,
      },
    };

    // Save to the "database" of registered users
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify([...registeredUsers, newUser])
    );

    // Log the user in
    login({ name: newUser.name, email: newUser.email });

    // Keep Profile.jsx in sync (it reads these keys directly)
    localStorage.setItem("username", newUser.name);
    localStorage.setItem("userEmail", newUser.email);
    localStorage.setItem("userPhone", newUser.phone);
    localStorage.setItem("userJoined", newUser.joined);

    // If address fields were filled, save it as the "Primary" address
    // (same structure Profile.jsx expects: { label, line1, city, pincode, phone, id })
    if (form.addressLine && form.city && form.pincode) {
      const existingAddresses = JSON.parse(localStorage.getItem("addresses")) || [];

      const primaryAddress = {
        label: "Primary",
        line1: form.addressLine,
        city: form.city,
        pincode: form.pincode,
        phone: form.phone,
        id: Date.now(),
      };

      const withoutOldPrimary = existingAddresses.filter((a) => a.label !== "Primary");
      localStorage.setItem(
        "addresses",
        JSON.stringify([...withoutOldPrimary, primaryAddress])
      );
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0] min-h-screen">
      <Navbar />

      <section className="max-w-md mx-auto px-6 py-20">
        <div className="bg-[#FDFBF7] rounded-[30px] shadow-xl border border-[#F0E6D2] p-8 md:p-10">

          <h1 className="text-3xl font-bold text-[#3D2C2E] text-center">
            Create Account
          </h1>
          <p className="text-gray-500 text-center mt-2">
            Join us and start shopping today.
          </p>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#3D2C2E] mb-1 block">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#3D2C2E] mb-1 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#3D2C2E] mb-1 block">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#3D2C2E] mb-1 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#3D2C2E] mb-1 block">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
              />
            </div>

            {/* Address Section */}
            <div className="pt-2 border-t border-[#F0E6D2]">
              <p className="text-sm font-semibold text-[#3D2C2E] mb-3 mt-3">
                Address <span className="text-gray-400 font-normal">(optional)</span>
              </p>

              <input
                name="addressLine"
                value={form.addressLine}
                onChange={handleChange}
                placeholder="Address Line"
                className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40 mb-3"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                />
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3D2C2E] text-white py-3 rounded-full font-semibold hover:bg-[#C9A66B] transition mt-2"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              state={{ from }}
              className="text-[#B8956A] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}