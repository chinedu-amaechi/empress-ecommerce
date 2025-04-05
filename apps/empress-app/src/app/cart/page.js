"use client";

import { useCartContext } from "../contexts/cart-context";
import CartItem from "./cart-item";
import Footer from "@/components/layout/footer";

function CartPage() {
  const { cart } = useCartContext();

  // Calculate the subtotal based on cart items (business logic remains unchanged)
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // Apply a standard shipping fee when applicable
  const shipping = subtotal > 0 ? 10 : 0;
  // Use Calgary's GST of 5%
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  // Compute the grand total amount
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Updated header styling for consistency with existing UI font */}
          <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">
            Your Cart
          </h1>
          {cart.length === 0 ? (
            <div className="text-center text-gray-600 text-xl">
              Your cart is empty.
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Cart Items Listing Section */}
              <div className="flex-1 space-y-8">
                {cart.map((product) => (
                  <CartItem key={product._id} product={product} />
                ))}
              </div>

              {/* Order Summary and Payment Section */}
              <div className="w-full lg:w-1/3 bg-white p-8 rounded-xl shadow-xl border border-gray-200">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">Subtotal</span>
                    <span className="text-lg text-gray-800">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">Shipping</span>
                    <span className="text-lg text-gray-800">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">Tax (GST 5%)</span>
                    <span className="text-lg text-gray-800">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-300 my-6"></div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <form className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-base font-medium text-gray-700 mb-1"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#11296B] focus:ring-1 focus:ring-[#11296B]"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="expiry"
                        className="block text-base font-medium text-gray-700 mb-1"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        placeholder="MM/YY"
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#11296B] focus:ring-1 focus:ring-[#11296B]"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="cvv"
                        className="block text-base font-medium text-gray-700 mb-1"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#11296B] focus:ring-1 focus:ring-[#11296B]"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="cardHolder"
                      className="block text-base font-medium text-gray-700 mb-1"
                    >
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      id="cardHolder"
                      placeholder="John Doe"
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#11296B] focus:ring-1 focus:ring-[#11296B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#11296B] text-white py-4 rounded-md font-semibold text-xl hover:bg-[#1E96FC] transition-colors duration-300"
                  >
                    Pay Now
                  </button>
                </form>
                <p className="mt-4 text-xs text-gray-500 text-center">
                  Your payment information is securely processed.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
