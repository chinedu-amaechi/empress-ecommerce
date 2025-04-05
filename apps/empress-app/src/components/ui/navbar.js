"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuthContext } from "@/app/contexts/auth-context";
import { useCartContext } from "@/app/contexts/cart-context";
import { PersonOutline } from "@mui/icons-material";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Context hooks
  const { cart } = useCartContext();
  const { user, setUser } = useAuthContext();
  const pathname = usePathname();

  // Refs
  const dropdownRefs = useRef({});
  const navbarRef = useRef(null);

  // Derived values
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const userInitials = user ? `${user.firstName[0]}${user.lastName[0]}` : null;

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside handler
  const handleClickOutside = useCallback((event) => {
    if (!navbarRef.current?.contains(event.target)) {
      setIsMenuOpen(false);
    }
    if (activeDropdown && dropdownRefs.current[activeDropdown] && 
        !dropdownRefs.current[activeDropdown].contains(event.target)) {
      setActiveDropdown(null);
    }
  }, [activeDropdown]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Toggle handlers
  const toggleDropdown = useCallback((name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Navigation items
  const navItems = [
    { href: "/collections", label: "Collections" },
    { href: "/products", label: "Shop" },
    { href: "/about-us", label: "About" },
    { href: "/faq", label: "FAQ" }
  ];

  const mobileShopItems = [
    { href: "/collections", label: "Collections" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/bestsellers", label: "Bestsellers" },
    { href: "/products", label: "All Products" }
  ];

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 py-3 ${
        isMenuOpen ? "bg-white shadow-md" : 
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : 
        "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                className="w-auto h-12 transition-all duration-300"
                src="/icons/empress_logo.png"
                alt="Empress Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-10">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-base font-medium text-gray-900 hover:text-[#11296B] transition-colors duration-300"
                >
                  {item.label}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#11296B]"></span>
                </Link>
              </div>
            ))}
          </div>

          {/* Right navigation */}
          <div className="flex items-center space-x-6">
            {/* Account Dropdown */}
            <div className="relative hidden md:block" ref={el => dropdownRefs.current["account"] = el}>
              <button
                className="p-2 text-gray-900 hover:bg-amber-300/40 rounded-full transition-all duration-300"
                onClick={() => toggleDropdown("account")}
                aria-label="Account"
              >
                {user ? (
                  <span className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                    {userInitials}
                  </span>
                ) : (
                  <PersonOutline />
                )}
              </button>
              
              {activeDropdown === "account" && (
                <div className="absolute right-0 w-52 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {user ? (
                      <>
                        <Link href="/account" className="dropdown-item">My Account</Link>
                        <Link href="#orders" className="dropdown-item">Order History</Link>
                        <button 
                          onClick={() => {
                            setUser(null);
                            localStorage.removeItem("token");
                          }}
                          className="dropdown-item w-full text-left"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link href="/auth/sign-in" className="dropdown-item">Sign In</Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Dropdown */}
            <div className="relative" ref={el => dropdownRefs.current["cart"] = el}>
              <button
                className="flex items-center p-2 text-gray-900 hover:bg-amber-300/40 rounded-full transition-all duration-300"
                onClick={() => toggleDropdown("cart")}
                aria-label="Shopping Cart"
              >
                <ShoppingCart />
                {cartItemCount > 0 && (
                  <span className="flex items-center justify-center ml-1 text-xs font-semibold bg-[#11296B] text-white rounded-full w-5 h-5">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              {activeDropdown === "cart" && (
                <div className="absolute right-0 w-72 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-base font-medium text-gray-900">Shopping Cart</h3>
                      <span className="text-sm text-gray-500">{cartItemCount} items</span>
                    </div>
                    {cartItemCount === 0 ? (
                      <div className="text-base text-gray-500 text-center py-5">Your cart is empty</div>
                    ) : (
                      <div className="py-2">Cart items would be listed here</div>
                    )}
                    <Link href="/cart">
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
              className="p-2 text-gray-900 hover:bg-[#11296B]/10 rounded-full md:hidden transition-all duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
              onClick={() => toggleDropdown("mobile-shop")}
            >
              <span>Shop</span>
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${activeDropdown === "mobile-shop" ? "transform rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeDropdown === "mobile-shop" && (
              <div className="pl-4 py-2 space-y-1 border-l-2 border-[#11296B]/20 ml-3">
                {mobileShopItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-1.5 text-base text-gray-700 hover:bg-[#11296B]/10 rounded px-3 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {navItems.slice(2).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-[#11296B]/10 rounded transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/auth/sign-in"
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#11296B] text-white rounded-md hover:bg-opacity-90 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-base font-medium">Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper component for dropdown items
const DropdownItem = ({ children, ...props }) => (
  <span className="block px-4 py-2.5 text-base text-gray-700 hover:bg-[#11296B]/10 transition-colors duration-200" {...props}>
    {children}
  </span>
);

export default Navbar;