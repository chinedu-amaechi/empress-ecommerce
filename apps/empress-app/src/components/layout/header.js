"use client";

import React from "react";
import Navbar from "@/components/ui/navbar";

const Header = () => {
  return (
    <header className="relative">
      {/* Navbar Component */}
      <Navbar />

      {/* Compact Hero Section */}
      <div className="relative pt-16 flex items-center min-h-[100vh]">
        {/* Background Image with Subtle Overlay */}
        <div
          className="absolute top-0 w-full h-full  bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/Empress/Heritage/Suyan/IMG_1801.JPG')",

          }}
        >
          <span className="w-full h-full absolute opacity-30 bg-black"></span>
        </div>

        {/* Minimal Hero Content */}
        <div className="container relative p-12 md:py-16">
          <div className="max-w-lg">
            <h1 className="text-white font-light text-4xl md:text-5xl mb-4 leading-tight">
              Elegance for the{" "}
              <span className="font-semibold">Modern Empress</span>
            </h1>
            <p className="mt-4 text-lg text-white font-light">
              Handcrafted bracelets designed for timeless sophistication.
            </p>
            <div className="mt-8">
              <a
                href="/collections"
                className="bg-white text-gray-900 hover:bg-amber-500 text-sm font-medium px-6 py-3 rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
              >
                Explore Collections
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
