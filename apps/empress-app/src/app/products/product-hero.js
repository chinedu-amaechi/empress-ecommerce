"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const ProductHero = () => {
  // Hero slideshow images
  const heroImages = [
    "/hero-background-1.jpg",
    "/hero-background-2.jpg",
    "/hero-background-3.jpg",
    "/hero-background-4.jpg",
    "/hero-background-5.jpg",
  ];

  // State for hero image slideshow
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect for image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-[#11296B]/90 to-[#1E96FC]/90 text-white h-dvh overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={`Bracelets Background ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              priority
            />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-6 py-100 relative z-20 text-center">
        <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-6">
          Discover Our Collections
        </h1>
        <p className="text-xl max-w-2xl mx-auto text-white/80">
          Explore our carefully curated selection of elegant bracelets
        </p>
      </div>
    </div>
  );
};

export default ProductHero;
