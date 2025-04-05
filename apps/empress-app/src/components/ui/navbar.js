"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "@/app/contexts/auth-context";
import { useCartContext } from "@/app/contexts/cart-context";
import useCollections from "@/hooks/use-collections";
import { PersonOutline } from "@mui/icons-material";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cart } = useCartContext();
  const { user, setUser } = useAuthContext();

  // Refs for dropdown containers
  const dropdownRefs = useRef({});
  const navbarRef = useRef(null);

  // use collections data
  const { data, isLoading, error } = useCollections();

  // Handle scroll effect
  useEffect(() => {
    // Check initial scroll position immediately
    setIsScrolled(window.scrollY > 10);

    // Add scroll event listener for future scrolling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside dropdown menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search when clicking outside
      if (isSearchOpen && !event.target.closest("[data-search-container]")) {
        setIsSearchOpen(false);
      }

      // Close dropdown when clicking outside
      if (activeDropdown && dropdownRefs.current[activeDropdown]) {
        if (!dropdownRefs.current[activeDropdown].contains(event.target)) {
          setActiveDropdown(null);
        }
      }

      // Close mobile menu when clicking outside
      if (
        isMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown, isMenuOpen]);

  // Toggle dropdown
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Handle search click
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 py-3 ${
        isMenuOpen
          ? "bg-white shadow-md"
          : isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300"
          : "bg-transparent transition-all duration-300"
      }`}
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                className={`w-auto transition-all duration-300 ${"h-12"}`}
                src="/icons/empress_logo.png"
                alt="Empress Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-10">
            {/* Collections dropdown */}
            <div
              className="relative group"
              ref={(el) => (dropdownRefs.current["collections"] = el)}
            >
              <a
                href="#"
                className="text-base font-medium text-gray-900 hover:text-[#11296B] transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("collections");
                }}
              >
                Collections
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#11296B]"></span>
              </a>
              {activeDropdown === "collections" && (
                <div className="absolute left-0 w-64 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {isLoading ? (
                      <div className="px-4 py-2.5 text-base text-gray-700">
                        Loading...
                      </div>
                    ) : error ? (
                      <div className="px-4 py-2.5 text-base text-red-500">
                        Error loading collections
                      </div>
                    ) : (
                      data.map((collection) => (
                        <Link
                          href={`/collections?collection=${collection.name}`}
                          key={collection._id}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                        >
                          {collection.name}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shop dropdown */}
            <div
              className="relative group"
              ref={(el) => (dropdownRefs.current["shop"] = el)}
            >
              <Link
                href="/products"
                className="text-base font-medium text-gray-900 hover:text-[#11296B] transition-colors duration-300"
                // onClick={(e) => {
                //   e.preventDefault();
                //   toggleDropdown("shop");
                // }}
              >
                Shop
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#11296B]"></span>
              </Link>
              {/* {activeDropdown === "shop" && (
                <div className="absolute left-0 w-64 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <a
                      href="#new-arrivals"
                      className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                    >
                      New Arrivals
                    </a>
                    <a
                      href="#bestsellers"
                      className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                    >
                      Bestsellers
                    </a>
                    <Link
                      href="/products"
                      className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                    >
                      All Bracelets
                    </Link>
                  </div>
                </div>
              )} */}
            </div>

            {/* About Us - simple link */}
            <a
              href="/about-us"
              className="text-base font-medium text-gray-900 hover:text-[#11296B] transition-colors duration-300 group"
            >
              About
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#11296B]"></span>
            </a>

            {/* FAQs */}
            <a
              href="/faq"
              className="text-base font-medium text-gray-900 hover:text-[#11296B] transition-colors duration-300 group"
            >
              FAQ
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#11296B]"></span>
            </a>
          </div>

          {/* Right navigation - search, account, cart */}
          <div className="flex items-center space-x-6">
            {/* Account Button */}
            <div
              className="relative hidden md:block"
              ref={(el) => (dropdownRefs.current["account"] = el)}
            >
              <button
                className="p-2 text-gray-900 hover:bg-amber-300/40 rounded-full transition-all duration-300"
                aria-label="Account"
                onClick={() => toggleDropdown("account")}
              >
                {user === null ? (
                  <PersonOutline />
                ) : (
                  <>
                    <p className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      {user.firstName.split("")[0]}
                      {user.lastName.split("")[0]}
                    </p>
                  </>
                )}
              </button>
              {activeDropdown === "account" && (
                <div className="absolute right-0 w-52 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {user === null ? (
                      <>
                        {" "}
                        <Link
                          href="/auth/sign-in"
                          className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth/sign-up"
                          className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Create Account
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/account"
                          className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                        >
                          My Account
                        </Link>
                        <a
                          href="#orders"
                          className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                        >
                          Order History
                        </a>
                        <button
                          onClick={() => {
                            setUser(null);
                            localStorage.removeItem("token");
                          }}
                          className="block w-full text-left px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                        >
                          Sign Out
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <div
              className="relative"
              ref={(el) => (dropdownRefs.current["cart"] = el)}
            >
              <button
                className="flex items-center p-2 text-gray-900 hover:bg-amber-300/40 rounded-full transition-all duration-300"
                aria-label="Shopping Cart"
                onClick={() => toggleDropdown("cart")}
              >
                <ShoppingCart />
                <span className="flex items-center justify-center ml-1 text-xs font-semibold bg-[#11296B] text-white rounded-full w-5 h-5">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </button>
              {activeDropdown === "cart" && (
                <div className="absolute right-0 w-72 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-base font-medium text-gray-900">
                        Shopping Cart
                      </h3>
                      <span className="text-sm text-gray-500">0 items</span>
                    </div>
                    <div className="text-base text-gray-500 text-center py-5">
                      Your cart is empty
                    </div>
                    <Link href="/cart" onClick={() => setActiveDropdown(null)}>
                      <button className="w-full py-2.5 px-4 bg-[#11296B] text-white text-base font-medium rounded hover:bg-opacity-90 transition-all duration-300">
                        View Cart
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-900 hover:bg-[#11296B]/10 rounded-full md:hidden transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full bg-white shadow-lg md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              className="flex justify-between w-full px-3 py-2 text-base font-medium text-gray-900 hover:bg-[#11296B]/10 rounded transition-colors duration-200"
              onClick={() => toggleDropdown("mobile-collections")}
            >
              <span>Collections</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "mobile-collections" && (
              <div className="pl-4 py-2 space-y-1 border-l-2 border-[#11296B]/20 ml-3">
                {isLoading ? (
                  <div className="px-4 py-2.5 text-base text-gray-700">
                    Loading...
                  </div>
                ) : error ? (
                  <div className="px-4 py-2.5 text-base text-red-500">
                    Error loading collections
                  </div>
                ) : (
                  data.map((collection) => (
                    <Link
                      href={`/collections?collection=${collection.name}`}
                      key={collection._id}
                      className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200"
                    >
                      {collection.name}
                    </Link>
                  ))
                )}
              </div>
            )}

            <button
              className="flex justify-between w-full px-3 py-2 text-base font-medium text-gray-900 hover:bg-[#11296B]/10 rounded transition-colors duration-200"
              onClick={() => toggleDropdown("mobile-shop")}
            >
              <span>Shop</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "mobile-shop" && (
              <div className="pl-4 py-2 space-y-1 border-l-2 border-[#11296B]/20 ml-3">
                <a
                  href="#new-arrivals"
                  className="block py-1.5 text-base text-gray-700 hover:bg-[#11296B]/10 rounded px-3 transition-colors duration-200"
                >
                  New Arrivals
                </a>
                <a
                  href="#bestsellers"
                  className="block py-1.5 text-base text-gray-700 hover:bg-[#11296B]/10 rounded px-3 transition-colors duration-200"
                >
                  Bestsellers
                </a>
                <a
                  href="#all"
                  className="block py-1.5 text-base text-gray-700 hover:bg-[#11296B]/10 rounded px-3 transition-colors duration-200"
                >
                  All Bracelets
                </a>
              </div>
            )}

            <a
              href="#about"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-[#11296B]/10 rounded transition-colors duration-200"
            >
              About
            </a>

            <a
              href="#faq"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-[#11296B]/10 rounded transition-colors duration-200"
            >
              FAQ
            </a>

            <div className="flex items-center justify-between px-3 py-4 border-t border-gray-100 mt-2">
              <div className="flex space-x-4">
                <button
                  className="p-2 text-gray-900 rounded-full hover:bg-[#11296B]/10 transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <button className="p-2 text-gray-900 rounded-full hover:bg-[#11296B]/10 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>
              <Link
                href="/auth/sign-in"
                className="px-4 py-2 text-base font-medium text-white bg-[#11296B] rounded-md hover:bg-opacity-90 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
