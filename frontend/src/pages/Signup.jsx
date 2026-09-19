import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const from = location.state?.from || "/";

  const [form, setForm] = useState({
  email: "",
  name: "",
  phone: "",
  password: "",
});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(loading) return;

    if (!form.email || !form.name || !form.phone || !form.password) {
        setError("Please fill in all required fields.");
        return;
    }


    setLoading(true);

    try {

        const response = await api.post("/auth/register", {

            fullName: form.name,
            email: form.email,
            password: form.password,
            phoneNumber: form.phone,

        });


        const data=response.data;


        localStorage.setItem(
            "accessToken",
            data.accessToken
        );

        localStorage.setItem(
            "refreshToken",
            data.refreshToken
        );


        login({
            email:data.email,
            name:data.fullName
        });


        navigate(from,{replace:true});


    }
    catch(error){

        console.log(error.response);

        setError(
            error.response?.data?.message ||
            "Registration failed."
        );

    }
    finally{
        setLoading(false);
    }

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
            </div>


            <button
    type="submit"
    disabled={loading}
    className="w-full bg-[#3D2C2E] text-white py-3 rounded-full font-semibold hover:bg-[#C9A66B] transition mt-2 disabled:opacity-50"
>
    {loading ? "Registering..." : "Register"}
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