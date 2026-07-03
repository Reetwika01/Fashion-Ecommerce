import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { allProducts } from "../data/products";
import {
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiCheckCircle,
  FiTrash2,
  FiPlus,
  FiX,
  FiSearch,
} from "react-icons/fi";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [step, setStep] = useState("address"); // address -> payment -> success
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ---- Build the list of items to checkout ----
  // Priority: multiple products passed via state (from Cart) -> single product (Buy Now) -> current cart
  const rawItems = (() => {
    if (location.state?.products && location.state.products.length > 0) {
      return location.state.products;
    }
    if (location.state?.product) {
      return [location.state.product];
    }
    return cart || [];
  })();

  const [items, setItems] = useState(
    rawItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }))
  );

  const cameFromCart = !location.state?.product; // true if using cart items (multi) vs a single "Buy Now"

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    pincode: "",
  });

  // ---- Add More Products modal state ----
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category).filter(Boolean));
    return ["All", ...cats];
  }, []);

  const filteredCatalog = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const handleAddProductFromCatalog = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getQuantityInCart = (id) => {
    const found = items.find((i) => i.id === id);
    return found ? found.quantity || 1 : 0;
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isAddressValid =
    address.name && address.phone && address.line1 && address.city && address.pincode;

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleQtyChange = (id, delta) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, quantity: Math.max(1, (i.quantity || 1) + delta) }
          : i
      )
    );
  };

  const getPriceNumber = (price) =>
    Number(String(price).replace(/[₹,]/g, "")) || 0;

  const subtotal = items.reduce(
    (sum, item) => sum + getPriceNumber(item.price) * (item.quantity || 1),
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Create one order entry per item, matching the shape Profile.jsx expects
    const newOrders = items.map((item) => ({
      id: Date.now() + Math.floor(Math.random() * 1000),
      item: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity || 1,
      status: "Processing",
      date: new Date().toLocaleDateString(),
      address,
      paymentMethod,
    }));

    localStorage.setItem(
      "orders",
      JSON.stringify([...newOrders, ...existingOrders])
    );

    // If these items came from the cart, clear it after placing the order
    if (cameFromCart && clearCart) {
      clearCart();
    }

    setStep("success");
  };

  if (items.length === 0 && !showAddModal) {
    return (
      <>
        <Navbar />
        <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0] min-h-screen flex items-center justify-center">
          <div className="text-center py-24">
            <h1 className="text-3xl font-bold text-[#3D2C2E]">No items to checkout</h1>
            <p className="text-gray-500 mt-3">Please select a product first.</p>
            <div className="flex gap-4 justify-center mt-6">
              <Link
                to="/"
                className="inline-block bg-[#3D2C2E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#C9A66B] transition"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-block border border-[#C9A66B] text-[#3D2C2E] px-8 py-3 rounded-full font-semibold hover:bg-[#C9A66B] hover:text-white transition"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
        <Footer />
        {showAddModal && (
          <AddProductsModal
            onClose={() => setShowAddModal(false)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
            filteredCatalog={filteredCatalog}
            getQuantityInCart={getQuantityInCart}
            onAdd={handleAddProductFromCatalog}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0] min-h-screen">
        <section className="max-w-6xl mx-auto px-6 py-16">

          {step !== "success" && (
            <>
              <h1 className="text-4xl font-bold text-[#3D2C2E] mb-2">Checkout</h1>
              <p className="text-gray-500 mb-10">Complete your purchase in a few steps.</p>

              {/* Step indicator */}
              <div className="flex items-center gap-4 mb-10">
                <div className={`flex items-center gap-2 font-semibold ${step === "address" ? "text-[#3D2C2E]" : "text-[#B8956A]"}`}>
                  <span className="w-8 h-8 rounded-full bg-[#3D2C2E] text-white flex items-center justify-center text-sm">1</span>
                  Address
                </div>
                <div className="flex-1 h-0.5 bg-[#E0D4BC]" />
                <div className={`flex items-center gap-2 font-semibold ${step === "payment" ? "text-[#3D2C2E]" : "text-gray-400"}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === "payment" ? "bg-[#3D2C2E] text-white" : "bg-[#E8DCC8] text-[#3D2C2E]"}`}>2</span>
                  Payment
                </div>
              </div>
            </>
          )}

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left: Steps */}
            <div className="lg:col-span-2">

              {step === "address" && (
                <div className="bg-[#FDFBF7] rounded-3xl p-8 shadow-md border border-[#F0E6D2]">
                  <h2 className="flex items-center gap-2 text-2xl font-bold text-[#3D2C2E] mb-6">
                    <FiMapPin /> Shipping Address
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={address.name}
                      onChange={handleAddressChange}
                      placeholder="Full Name"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                    <input
                      name="phone"
                      value={address.phone}
                      onChange={handleAddressChange}
                      placeholder="Phone Number"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                    <input
                      name="line1"
                      value={address.line1}
                      onChange={handleAddressChange}
                      placeholder="Address Line"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#C9A66B]/40 md:col-span-2"
                    />
                    <input
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                    <input
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      placeholder="Pincode"
                      className="border border-[#E0D4BC] bg-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
                    />
                  </div>

                  <button
                    onClick={() => isAddressValid && setStep("payment")}
                    disabled={!isAddressValid}
                    className={`mt-8 w-full md:w-auto px-10 py-3.5 rounded-full font-semibold transition ${
                      isAddressValid
                        ? "bg-[#3D2C2E] text-white hover:bg-[#C9A66B]"
                        : "bg-[#E8DCC8] text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === "payment" && (
                <div className="bg-[#FDFBF7] rounded-3xl p-8 shadow-md border border-[#F0E6D2]">
                  <h2 className="flex items-center gap-2 text-2xl font-bold text-[#3D2C2E] mb-6">
                    <FiCreditCard /> Payment Method
                  </h2>

                  <div className="space-y-4">
                    {[
                      { key: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives" },
                      { key: "upi", label: "UPI", desc: "Pay via any UPI app" },
                      { key: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, Amex accepted" },
                    ].map((method) => (
                      <label
                        key={method.key}
                        className={`flex items-center gap-4 border rounded-2xl p-5 cursor-pointer transition ${
                          paymentMethod === method.key
                            ? "border-[#C9A66B] bg-[#F0E6D2]"
                            : "border-[#E0D4BC] hover:bg-[#FAF6EF]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === method.key}
                          onChange={() => setPaymentMethod(method.key)}
                          className="w-5 h-5 accent-[#C9A66B]"
                        />
                        <div>
                          <p className="font-semibold text-[#3D2C2E]">{method.label}</p>
                          <p className="text-sm text-gray-500">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep("address")}
                      className="border border-[#E0D4BC] text-[#3D2C2E] px-8 py-3.5 rounded-full font-semibold hover:bg-[#F0E6D2] transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-[#3D2C2E] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#C9A66B] transition"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="bg-[#FDFBF7] rounded-3xl p-12 shadow-md border border-[#F0E6D2] text-center">
                  <FiCheckCircle className="mx-auto text-6xl text-[#C9A66B] mb-6" />
                  <h2 className="text-3xl font-bold text-[#3D2C2E]">Order Placed!</h2>
                  <p className="text-gray-500 mt-3">
                    Thank you, {address.name}. Your order for{" "}
                    {items.length === 1
                      ? items[0].name
                      : `${items.length} items`}{" "}
                    has been confirmed.
                  </p>
                  <p className="text-[#B8956A] font-semibold mt-2">
                    Estimated delivery: 4-6 business days
                  </p>

                  <div className="flex gap-4 justify-center mt-8">
                    <Link
                      to="/"
                      className="bg-[#3D2C2E] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#C9A66B] transition"
                    >
                      Continue Shopping
                    </Link>
                    <Link
                      to="/profile"
                      className="border border-[#C9A66B] text-[#3D2C2E] px-8 py-3.5 rounded-full font-semibold hover:bg-[#C9A66B] hover:text-white transition"
                    >
                      View Orders
                    </Link>
                  </div>
                </div>
              )}

            </div>

            {/* Right: Order Summary */}
            {step !== "success" && (
              <div className="bg-[#FDFBF7] rounded-3xl p-8 shadow-md border border-[#F0E6D2] h-fit sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#3D2C2E]">
                    Order Summary {items.length > 1 && `(${items.length} items)`}
                  </h3>

                  {step === "address" && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="flex items-center gap-1 text-sm font-semibold text-[#B8956A] hover:text-[#3D2C2E] transition"
                    >
                      <FiPlus size={14} /> Add more
                    </button>
                  )}
                </div>

                <div className="space-y-5 max-h-80 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-[#3D2C2E] pr-2">{item.name}</p>
                          {step === "address" && items.length > 1 && (
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-[#8B6F63] hover:text-red-500 transition shrink-0"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          )}
                        </div>

                        {item.size && (
                          <p className="text-sm text-gray-500">Size: {item.size}</p>
                        )}

                        {/* Quantity controls */}
                        {step === "address" ? (
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => handleQtyChange(item.id, -1)}
                              className="w-6 h-6 rounded-full bg-[#F0E6D2] text-[#3D2C2E] flex items-center justify-center hover:bg-[#C9A66B] hover:text-white transition text-sm"
                            >
                              −
                            </button>
                            <span className="text-sm font-semibold text-[#3D2C2E]">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => handleQtyChange(item.id, 1)}
                              className="w-6 h-6 rounded-full bg-[#F0E6D2] text-[#3D2C2E] flex items-center justify-center hover:bg-[#C9A66B] hover:text-white transition text-sm"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity || 1}</p>
                        )}

                        <p className="text-[#B8956A] font-semibold mt-1">
                          ₹{(getPriceNumber(item.price) * (item.quantity || 1)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#F0E6D2] mt-6 pt-6 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1"><FiTruck size={14} /> Shipping</span>
                    <span className="text-[#B8956A] font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[#3D2C2E] pt-3 border-t border-[#F0E6D2]">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </div>

      <Footer />

      {showAddModal && (
        <AddProductsModal
          onClose={() => setShowAddModal(false)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
          filteredCatalog={filteredCatalog}
          getQuantityInCart={getQuantityInCart}
          onAdd={handleAddProductFromCatalog}
        />
      )}
    </>
  );
}

// ---- Add More Products Modal ----
function AddProductsModal({
  onClose,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
  filteredCatalog,
  getQuantityInCart,
  onAdd,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-[#FDFBF7] w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-xl border border-[#F0E6D2] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0E6D2]">
          <h2 className="text-2xl font-bold text-[#3D2C2E]">Add More Products</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F0E6D2] flex items-center justify-center text-[#3D2C2E] hover:bg-[#C9A66B] hover:text-white transition"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Search + Filters */}
        <div className="p-6 border-b border-[#F0E6D2] space-y-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-[#E0D4BC] bg-white rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#C9A66B]/40"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                  categoryFilter === cat
                    ? "bg-[#3D2C2E] text-white"
                    : "bg-[#F0E6D2] text-[#3D2C2E] hover:bg-[#C9A66B] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredCatalog.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No products found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredCatalog.map((product) => {
                const qtyInCart = getQuantityInCart(product.id);
                return (
                  <div
                    key={product.id}
                    className="border border-[#F0E6D2] rounded-2xl overflow-hidden bg-white flex flex-col"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-1">
                      <p className="font-semibold text-[#3D2C2E] text-sm leading-snug">
                        {product.name}
                      </p>
                      <p className="text-[#B8956A] font-bold mt-1">{product.price}</p>

                      <button
                        onClick={() => onAdd(product)}
                        className={`mt-auto pt-3 w-full text-sm font-semibold rounded-full py-2 transition ${
                          qtyInCart > 0
                            ? "bg-[#F0E6D2] text-[#3D2C2E] hover:bg-[#C9A66B] hover:text-white"
                            : "bg-[#3D2C2E] text-white hover:bg-[#C9A66B]"
                        }`}
                      >
                        {qtyInCart > 0 ? `Added (${qtyInCart}) — Add another` : "Add to Order"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
