"use client";

import { useCartContext } from "../contexts/cart-context";
import CartItem from "./cart-item";
import Footer from "@/components/layout/footer";
import { Trash2, CreditCard, Lock, Minus, Plus } from "lucide-react";
import Image from "next/image";

function CartPage() {
  const { cart, setCart } = useCartContext();

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

  // Handler for incrementing item quantity
  const handleIncrement = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Handler for decrementing item quantity
  const handleDecrement = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Handler for removing item from cart
  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] selection:bg-[#11296B]/20">
      <main className="flex-grow container mx-auto px-4 py-16 pt-32 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Cart Items Section - Left Column */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex justify-between items-center border-b-2 border-gray-300 pb-6 mb-8 pt-8">
              <h1 className="text-4xl font-light tracking-tight text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600 bg-gray-50 px-4 py-2">
                {cart.length} {cart.length === 1 ? "Item" : "Items"}
              </p>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 bg-white shadow-soft">
                <div className="mx-auto w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-light text-gray-800 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Explore our collections and add some elegance to your cart
                </p>
                <a
                  href="/products"
                  className="inline-block px-8 py-3 bg-[#11296B] text-white font-medium hover:bg-[#1E96FC] transition-colors"
                >
                  Continue Shopping
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-soft p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden relative">
                        <Image
                          src={product.image || "/placeholder-product.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-gray-600">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="flex items-center space-x-2 border border-gray-200 px-1">
                        <button
                          className={`w-8 h-8 flex items-center justify-center text-gray-700 ${
                            product.quantity <= 1
                              ? "bg-gray-100 cursor-not-allowed opacity-50"
                              : "bg-gray-100 hover:bg-gray-200 hover:text-[#11296B]"
                          }`}
                          onClick={() => handleDecrement(product._id)}
                          disabled={product.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-medium w-6 text-center">
                          {product.quantity}
                        </span>
                        <button
                          className="w-8 h-8 bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 hover:text-[#11296B]"
                          onClick={() => handleIncrement(product._id)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        ${(product.price * product.quantity).toFixed(2)}
                      </div>
                      <button
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 border border-transparent hover:border-gray-200"
                        onClick={() => handleRemove(product._id)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Section - Right Column */}
          <div className="md:col-span-1 md:w-[120%]">
            <div className="bg-white shadow-soft p-2 sticky top-24">
              <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-6 pt-8 border-b-2 border-gray-300 pb-6">
                Order Summary
              </h2>

              <div className="space-y-4 border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 5%)</span>
                  <span className="font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-[#11296B]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <form className="space-y-4">
                <div className="relative">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full border-b border-gray-300 pb-2 focus:border-[#11296B] outline-none transition-colors"
                    />
                    <CreditCard className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Expiry
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      placeholder="MM/YY"
                      className="w-full border-b border-gray-300 pb-2 focus:border-[#11296B] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder="123"
                      className="w-full border-b border-gray-300 pb-2 focus:border-[#11296B] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cardHolder"
                    className="block text-sm font-medium text-gray-700 mb-2 mt-4"
                  >
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    placeholder="John Doe"
                    className="w-full border-b border-gray-300 pb-2 focus:border-[#11296B] outline-none transition-colors"
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#11296B] text-white py-4 hover:bg-[#1E96FC] transition-colors flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Secure Checkout
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center flex items-center justify-center mt-4">
                  <Lock className="w-4 h-4 mr-2 text-gray-400" />
                  Secure and encrypted payment
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
