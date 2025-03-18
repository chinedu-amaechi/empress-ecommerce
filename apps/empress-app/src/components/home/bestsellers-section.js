// src/components/home/BestsellersSection.js
"use client";

import React, { useRef } from "react";
import Heading from "@/components/ui/heading";
import ProductCard from "@/components/product/product-card";

// Expanded bestsellers data with 7 products
const bestsellers = [
  {
    id: "1",
    name: "Aluna",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviews: 24,
    material: "Sterling Silver",
    colors: ["Silver", "Rose Gold"],
    description:
      "Delicate silver bracelet with lunar inspiration, crafted to capture the ethereal beauty of moonlight.",
    images: ["/bestsellers/aluna-1.jpg", "/bestsellers/aluna-2.jpg"],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "2",
    name: "Sorelle",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 36,
    material: "Gold-Plated Silver",
    colors: ["Gold", "Rose Gold"],
    description:
      "Warm-toned bracelet with intricate detailing, inspired by the golden rays of a setting sun.",
    images: [
      "/bestsellers/sorelle-1.jpg",
      "/bestsellers/sorelle-2.jpg",
      "/bestsellers/sorelle-3.jpg",
    ],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "3",
    name: "Jinhua",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 42,
    material: "Sterling Silver",
    colors: ["Silver", "Gold"],
    description:
      "Elegant bracelet with a celestial design, inspired by the shimmering colors of the Northern Lights.",
    images: ["/bestsellers/jinhua-1.jpg", "/bestsellers/jinhua-2.jpg"],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "4",
    name: "Nyra",
    price: 139.99,
    originalPrice: 169.99,
    rating: 4.6,
    reviews: 30,
    material: "Sterling Silver",
    colors: ["Silver", "Rose Gold"],
    description:
      "Radiant bracelet with a minimalist design, inspired by the brilliance of a starlit sky.",
    images: ["/bestsellers/nyra-1.jpg", "/bestsellers/nyra-2.jpg"],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "5",
    name: "Azurea",
    price: 169.99,
    originalPrice: 209.99,
    rating: 4.9,
    reviews: 48,
    material: "Gold-Plated Silver",
    colors: ["Gold", "Rose Gold"],
    description:
      "Opulent bracelet with a celestial motif, inspired by the changing hues of the sky during the solstice.",
    images: ["/bestsellers/azurea-1.jpg", "/bestsellers/azurea-2.jpg"],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "6",
    name: "Suya",
    price: 179.99,
    originalPrice: 219.99,
    rating: 5.0,
    reviews: 54,
    material: "Sterling Silver",
    colors: ["Silver", "Gold"],
    description:
      "Exquisite bracelet with a celestial design, inspired by the vibrant colors of the Aurora Borealis.",
    images: ["/bestsellers/suya-1.jpg", "/bestsellers/suya-2.jpg"],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "7",
    name: "Noor",
    price: 189.99,
    originalPrice: 229.99,
    rating: 5.0,
    reviews: 60,
    material: "Gold-Plated Silver",
    colors: ["Gold", "Rose Gold"],
    description:
      "Luxurious bracelet with a celestial motif, inspired by the luminous glow of the full moon.",
    images: ["/bestsellers/noor-1.jpg", "/bestsellers/noor-2.jpg"],
    isBestseller: true,
    isNew: false,
  },
];

const BestsellersSection = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400, // Adjust based on your product card width
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400, // Adjust based on your product card width
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <Heading
          level={2}
          className="text-center mb-12 text-3xl md:text-4xl text-[#11296B] font-light tracking-tight"
        >
          Bestselling <span className="font-semibold">Bracelets</span>
        </Heading>

        {/* Scroll Navigation */}
        <div className="absolute left-4 md:left-12 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={scrollLeft}
            className="hidden md:block bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-[#11296B]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <div className="absolute right-4 md:right-12 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={scrollRight}
            className="hidden md:block bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-[#11296B]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Horizontally Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-6 pb-6 -mx-4 px-4 scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-80 scroll-snap-align-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/bestsellers"
            className="inline-block px-8 py-3 border border-[#11296B] text-[#11296B] rounded-full text-sm font-medium hover:bg-[#11296B] hover:text-white transition-all duration-300"
          >
            View All Bestsellers
          </a>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default BestsellersSection;
