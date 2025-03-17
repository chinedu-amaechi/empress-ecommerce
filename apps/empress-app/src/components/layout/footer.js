"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-gradient-to-b from-[#11296B] to-[#0A1942] border-t border-gray-100">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8">
          {/* Brand and description */}
          <div className="md:col-span-1 pr-4 relative">
            <div className="relative h-16 w-auto">
              <Image
                src="/empress_logo.png"
                alt="Empress Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="absolute w-24 h-24 bg-white/5 rounded-full -top-5 -left-5 blur-xl"></div>
            <p className="mt-6 text-base text-white/90 leading-relaxed">
              Elegant handcrafted bracelets for the modern empress. Timeless
              designs that complement your unique style.
            </p>
            
            {/* Social media icons */}
            <div className="flex mt-6 space-x-5">
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                <span className="sr-only">Pinterest</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-white uppercase after:content-[''] after:block after:w-8 after:h-0.5 after:bg-white/50 after:mt-2 mb-6">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/collections"
                  className="text-base text-white hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Collections
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    New Arrivals
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/bestsellers"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Bestsellers
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/all-products"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    All Products
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-white uppercase after:content-[''] after:block after:w-8 after:h-0.5 after:bg-white/50 after:mt-2 mb-6">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Sustainability
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    FAQ
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-white uppercase after:content-[''] after:block after:w-8 after:h-0.5 after:bg-white/50 after:mt-2 mb-6">
              Stay Connected
            </h3>
            <p className="mt-4 text-base text-white/90">
              Subscribe for exclusive offers and updates.
            </p>
            <form className="mt-4">
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full min-w-0 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md sm:rounded-r-none focus:outline-none focus:ring-1 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-[#11296B] bg-white border border-transparent rounded-md sm:rounded-l-none hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-white"
                >
                  Join
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white mb-3">Payment Methods</h4>
              <div className="flex space-x-3">
                <div className="bg-white/10 p-2 rounded">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 4h20v16H2V4zm18 14V6H4v12h16z" />
                    <path d="M6 10h4v2H6z" />
                    <path d="M12 10h6v2h-6z" />
                    <path d="M6 14h12v2H6z" />
                  </svg>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                    <circle cx="7" cy="13" r="2" />
                    <circle cx="17" cy="13" r="2" />
                    <circle cx="12" cy="13" r="2" />
                  </svg>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                    <path d="M4 6h16v4H4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and policies */}
        <div className="flex flex-col items-center pt-10 mt-16 border-t border-white/20 md:flex-row md:justify-between">
          <div className="flex space-x-6 text-sm text-white/70">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/shipping" className="hover:text-white transition-colors">
              Shipping
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/70 md:mt-0">
            &copy; {currentYear} Empress. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;