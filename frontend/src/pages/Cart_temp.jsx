import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const {
    cart,
    totalAmount,
    loading,
    fetchCart,
    removeFromCart,
    updateCartItem,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0]">
          <h2 className="text-2xl font-bold text-[#3D2C2E]">
            Loading Cart...
          </h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-[#F5F0E8] via-[#E8DCC8] to-[#D4C4A0] min-h-screen">

        <section className="max-w-6xl mx-auto py-16 px-6">

          <h1 className="text-4xl font-bold text-[#3D2C2E] mb-10 text-center">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-24">

              <FaShoppingCart
                size={80}
                className="mx-auto text-[#8B6F63]"
              />

              <h2 className="text-3xl font-bold mt-6 text-[#3D2C2E]">
                Your Cart is Empty
              </h2>

              <button
                onClick={() => navigate("/")}
                className="mt-8 bg-[#3D2C2E] text-white px-8 py-3 rounded-xl hover:bg-[#C9A66B] transition"
              >
                Continue Shopping
              </button>

            </div>
          ) : (
            <>
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                <table className="w-full">

                  <thead className="bg-[#3D2C2E] text-white">

                    <tr>
                      <th className="p-4 text-left">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {cart.map((item) => (
                      <tr
                        key={item.cartItemId}
                        className="border-b"
                      >
                        <td className="p-4 font-semibold">
                          {item.productName}
                        </td>

                        <td className="text-center">
                          ₹{item.price}
                        </td>

                        <td className="text-center">

                          <div className="flex justify-center items-center gap-3">

                            <button
                              onClick={() =>
                                item.quantity > 1 &&
                                updateCartItem(
                                  item.cartItemId,
                                  item.quantity - 1
                                )
                              }
                              className="bg-gray-200 px-3 py-1 rounded"
                            >
                              -
                            </button>

                            <span className="font-bold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateCartItem(
                                  item.cartItemId,
                                  item.quantity + 1
                                )
                              }
                              className="bg-gray-200 px-3 py-1 rounded"
                            >
                              +
                            </button>

                          </div>

                        </td>

                        <td className="text-center font-semibold">
                          ₹{item.totalPrice}
                        </td>

                        <td className="text-center">

                          <button
                            onClick={() =>
                              removeFromCart(item.cartItemId)
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                          >
                            Remove
                          </button>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

              <div className="flex justify-between items-center mt-10">

                <button
                  onClick={clearCart}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
                >
                  Clear Cart
                </button>

                <div className="text-right">

                  <h2 className="text-3xl font-bold text-[#3D2C2E]">
                    Total : ₹{totalAmount}
                  </h2>

                  <button
  onClick={() =>
    navigate("/checkout", {
      state: {
        products: cart.map((item) => ({
          id: item.productId,
          name: item.productName,
          price: item.price,
          image: item.productImage,
          quantity: item.quantity,
        })),
      },
    })
  }
  className="mt-5 bg-[#3D2C2E] text-white px-10 py-3 rounded-xl hover:bg-[#C9A66B] transition"
>
  Proceed To Checkout
</button>

                </div>

              </div>
            </>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}