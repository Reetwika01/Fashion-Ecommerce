import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
  const response = await api.post("/auth/login", {
    email: form.email,
    password: form.password,
  });

  const data = response.data;
  console.log("LOGIN RESPONSE:", data);

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  localStorage.setItem("userId", data.userId);
  localStorage.setItem("username", data.fullName);
  localStorage.setItem("userEmail", data.email);

  login({
    name: data.fullName,
    email: data.email,
  });

  navigate(from, { replace: true });

} catch (error) {

  if (error.response) {
    setError(error.response.data.message || "Invalid email or password.");
  } else {
    setError("Unable to connect to server.");
  }

}}

  return (
    <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0] min-h-screen">
      <Navbar />

      <section className="max-w-md mx-auto px-6 py-20">
        <div className="bg-[#FDFBF7] rounded-[30px] shadow-xl border border-[#F0E6D2] p-8 md:p-10">

          <h1 className="text-3xl font-bold text-[#3D2C2E] text-center">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-center mt-2">
            Login to continue shopping.
          </p>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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

            <button
              type="submit"
              className="w-full bg-[#3D2C2E] text-white py-3 rounded-full font-semibold hover:bg-[#C9A66B] transition mt-2"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              state={{ from }}
              className="text-[#B8956A] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}