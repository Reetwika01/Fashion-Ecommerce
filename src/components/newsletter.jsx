import { useState } from "react";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-24 bg-gradient-to-r from-[#D4C4A0] via-[#C9A66B] to-[#B8956A]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-[#FDFBF7] rounded-[40px] shadow-2xl p-10 md:p-14">

          {/* Heading */}
          <div className="text-center">
            <span className="uppercase tracking-[4px] text-[#B8956A] font-semibold">
              Stay Connected
            </span>

            <h2 className="text-5xl font-bold text-gray-900 mt-4">
              Join Our Newsletter
            </h2>

            <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-8">
              Subscribe to receive exclusive offers, new arrivals, and fashion updates.
            </p>
          </div>

          {/* Input Section */}
          {!subscribed && (
            <div className="flex flex-col md:flex-row gap-5 mt-10">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#F5F0E8] px-6 py-4 rounded-full border border-[#E8DCC8] outline-none focus:ring-2 focus:ring-[#C9A66B]"
              />

              <button
                onClick={handleSubscribe}
                className="group bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3"
              >
                Subscribe
                <FaPaperPlane className="group-hover:translate-x-1 transition" />
              </button>
            </div>
          )}

          {/* Thank You Card */}
          {subscribed && (
            <div className="mt-10 flex justify-center">
              <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full border border-[#E8DCC8]">

                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

                <h3 className="text-2xl font-bold text-gray-800">
                  Thank You for Subscribing!
                </h3>

                <p className="text-gray-600 mt-3">
                  You’ll now receive the latest updates and offers.
                </p>

                <button
                  onClick={() => setSubscribed(false)}
                  className="mt-6 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
                >
                  Done
                </button>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}