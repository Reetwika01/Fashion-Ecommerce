import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiEdit2, FiPackage, FiHeart, FiMapPin, FiLogOut, FiCamera, FiTrash2, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");

  // ---- User Info (persisted) ----
  const [user, setUser] = useState({
    name: localStorage.getItem("username") || "Guest User",
    email: localStorage.getItem("userEmail") || "",
    phone: localStorage.getItem("userPhone") || "",
    joined: localStorage.getItem("userJoined") || "January 2026",
  });

  // ---- Orders ----
  const [orders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  // ---- Addresses (persisted) ----
  const [addresses, setAddresses] = useState(() => {
    return JSON.parse(localStorage.getItem("addresses")) || [];
  });

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    line1: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    if (!newAddress.line1 || !newAddress.city || !newAddress.pincode) {
      alert("Please fill in address, city, and pincode.");
      return;
    }
    setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    setNewAddress({ label: "", line1: "", city: "", pincode: "", phone: "" });
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  // ---- Edit Profile ----
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name === "Guest User" ? "" : user.name,
    email: user.email,
    phone: user.phone,
    line1: "",
    city: "",
    pincode: "",
  });

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    if (!editForm.name || !editForm.email || !editForm.phone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }

    // Save user info
    const updatedUser = {
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      joined: user.joined,
    };
    setUser(updatedUser);
    localStorage.setItem("username", updatedUser.name);
    localStorage.setItem("userEmail", updatedUser.email);
    localStorage.setItem("userPhone", updatedUser.phone);
    if (!localStorage.getItem("userJoined")) {
      localStorage.setItem("userJoined", updatedUser.joined);
    }

    // If address fields were filled, save/update it as the "Primary" address
    if (editForm.line1 && editForm.city && editForm.pincode) {
      const primaryAddress = {
        label: "Primary",
        line1: editForm.line1,
        city: editForm.city,
        pincode: editForm.pincode,
        phone: editForm.phone,
      };

      setAddresses((prev) => {
        const existingIndex = prev.findIndex((a) => a.label === "Primary");
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = { ...primaryAddress, id: prev[existingIndex].id };
          return updated;
        }
        return [...prev, { ...primaryAddress, id: Date.now() }];
      });
    }

    setShowEditForm(false);
  };

  const openEditForm = () => {
    const primary = addresses.find((a) => a.label === "Primary");
    setEditForm({
      name: user.name === "Guest User" ? "" : user.name,
      email: user.email,
      phone: user.phone,
      line1: primary?.line1 || "",
      city: primary?.city || "",
      pincode: primary?.pincode || "",
    });
    setShowEditForm(true);
  };

  // ---- Logout ----
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userJoined");
    logout(); // clears AuthContext's "user" state + localStorage key
    window.location.href = "/login";
  };

  return (
    <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0] min-h-screen">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* Profile Header Card */}
        <div className="relative bg-[#FDFBF7] rounded-[35px] p-8 md:p-12 shadow-xl border border-[#F0E6D2] flex flex-col md:flex-row items-center gap-8">

          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E8DCC8] to-[#C9A66B] flex items-center justify-center text-5xl font-bold text-white shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#3D2C2E] text-white flex items-center justify-center hover:bg-[#C9A66B] transition">
              <FiCamera size={16} />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-[#3D2C2E]">{user.name}</h1>
            <p className="text-gray-500 mt-1">{user.email || "No email added"}</p>
            <p className="text-gray-500 mt-1">{user.phone || "No phone number added"}</p>
            <p className="text-[#B8956A] text-sm mt-1">Member since {user.joined}</p>
          </div>

          {/* Edit Button */}
          <button
            onClick={openEditForm}
            className="flex items-center gap-2 border border-[#C9A66B] text-[#3D2C2E] px-6 py-3 rounded-full font-semibold hover:bg-[#C9A66B] hover:text-white transition"
          >
            <FiEdit2 /> Edit Profile
          </button>

        </div>

        {/* Edit Profile Modal */}
        {showEditForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-[#FDFBF7] rounded-3xl p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">

              <button
                onClick={() => setShowEditForm(false)}
                className="absolute top-6 right-6 text-[#3D2C2E] hover:text-[#C9A66B] transition"
              >
                <FiX size={22} />
              </button>

              <h2 className="text-2xl font-bold text-[#3D2C2E] mb-6">Edit Profile</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-[#3D2C2E] mb-1 block">Full Name</label>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    placeholder="Full Name"
                    className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#3D2C2E] mb-1 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    placeholder="you@example.com"
                    className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#3D2C2E] mb-1 block">Phone Number</label>
                  <input
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    placeholder="+91 9876543210"
                    className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                  />
                </div>

                <div className="pt-2 border-t border-[#F0E6D2]">
                  <p className="text-sm font-semibold text-[#3D2C2E] mb-3 mt-3">Address</p>

                  <input
                    name="line1"
                    value={editForm.line1}
                    onChange={handleEditChange}
                    placeholder="Address Line"
                    className="w-full border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40 mb-3"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      name="city"
                      value={editForm.city}
                      onChange={handleEditChange}
                      placeholder="City"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                    <input
                      name="pincode"
                      value={editForm.pincode}
                      onChange={handleEditChange}
                      placeholder="Pincode"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-[#3D2C2E] text-white py-3 rounded-full font-semibold hover:bg-[#C9A66B] transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="border border-[#E0D4BC] text-[#3D2C2E] px-6 py-3 rounded-full font-semibold hover:bg-[#F0E6D2] transition"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start">
          {[
            { key: "orders", label: "My Orders", icon: <FiPackage /> },
            { key: "wishlist", label: "Wishlist", icon: <FiHeart /> },
            { key: "addresses", label: "Addresses", icon: <FiMapPin /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${
                activeTab === tab.key
                  ? "bg-[#3D2C2E] text-white shadow-md"
                  : "bg-[#FDFBF7] text-[#3D2C2E] border border-[#E0D4BC] hover:bg-[#F0E6D2]"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8 bg-[#FDFBF7] rounded-[30px] p-8 shadow-md border border-[#F0E6D2] min-h-[300px]">

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold text-[#3D2C2E] mb-6">My Orders</h2>

              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <FiPackage className="mx-auto text-5xl text-[#D4C4A0] mb-4" />
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                  <a
                    href="/"
                    className="inline-block mt-5 bg-[#3D2C2E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#C9A66B] transition"
                  >
                    Start Shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col md:flex-row md:items-center justify-between border border-[#F0E6D2] rounded-2xl p-5 hover:shadow-md transition"
                    >
                      <div>
                        <p className="font-semibold text-[#3D2C2E]">{order.item}</p>
                        <p className="text-gray-500 text-sm">Order #{order.id}</p>
                      </div>

                      <div className="flex items-center gap-6 mt-3 md:mt-0">
                        <span className="text-[#B8956A] font-bold">{order.price}</span>
                        <span
                          className={`text-sm font-semibold px-4 py-1.5 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-[#E8DCC8] text-[#3D2C2E]"
                              : "bg-[#F0E6D2] text-[#B8956A]"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-2xl font-bold text-[#3D2C2E] mb-6">Wishlist</h2>
              <p className="text-gray-500">
                Head to your{" "}
                <a href="/wishlist" className="text-[#C9A66B] font-semibold hover:underline">
                  Wishlist page
                </a>{" "}
                to view saved items.
              </p>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#3D2C2E]">Saved Addresses</h2>

                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="bg-[#3D2C2E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#C9A66B] transition"
                  >
                    + Add New Address
                  </button>
                )}
              </div>

              {/* Add Address Form */}
              {showAddressForm && (
                <div className="border border-[#E0D4BC] rounded-2xl p-6 mb-6 bg-[#FAF6EF]">
                  <h3 className="font-semibold text-[#3D2C2E] mb-4">New Address</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      name="label"
                      value={newAddress.label}
                      onChange={handleAddressChange}
                      placeholder="Label (e.g. Home, Work)"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                    <input
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleAddressChange}
                      placeholder="Phone Number"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                    <input
                      name="line1"
                      value={newAddress.line1}
                      onChange={handleAddressChange}
                      placeholder="Address Line"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40 md:col-span-2"
                    />
                    <input
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                    <input
                      name="pincode"
                      value={newAddress.pincode}
                      onChange={handleAddressChange}
                      placeholder="Pincode"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={handleSaveAddress}
                      className="bg-[#3D2C2E] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#C9A66B] transition"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="border border-[#E0D4BC] text-[#3D2C2E] px-6 py-2.5 rounded-full font-semibold hover:bg-[#F0E6D2] transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Address List */}
              {addresses.length === 0 && !showAddressForm ? (
                <p className="text-gray-500">You have no saved addresses yet.</p>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="flex items-start justify-between border border-[#F0E6D2] rounded-2xl p-5"
                    >
                      <div>
                        {addr.label && (
                          <span className="inline-block bg-[#E8DCC8] text-[#3D2C2E] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                            {addr.label}
                          </span>
                        )}
                        <p className="text-[#3D2C2E] font-medium">{addr.line1}</p>
                        <p className="text-gray-500 text-sm">
                          {addr.city} - {addr.pincode}
                        </p>
                        {addr.phone && (
                          <p className="text-gray-500 text-sm">{addr.phone}</p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-[#8B6F63] hover:text-red-500 transition"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Logout */}
        <div className="mt-10 flex justify-center md:justify-start">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#8B6F63] hover:text-[#3D2C2E] font-semibold transition"
          >
            <FiLogOut /> Log Out
          </button>
        </div>

      </section>

      <Footer />
    </div>
  );
}