// src/components/home/BestsellersSection.js
"use client";

import React, { useRef } from "react";
import Heading from "@/components/ui/heading";
import ProductCard from "@/components/product/product-card";

// Expanded bestsellers data with 7 products
const bestsellers = [
  {
    id: "1",
    name: "Moonlight Elegance",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviews: 24,
    material: "Sterling Silver",
    colors: ["Silver", "Rose Gold"],
    description:
      "Delicate silver bracelet with lunar inspiration, crafted to capture the ethereal beauty of moonlight.",
    images: [
      "/products/bestseller-1-01.jpg",
      "/products/bestseller-1-02.jpg",
      "/products/bestseller-1-03.jpg",
      "/products/bestseller-1-04.jpg",
      "/products/bestseller-1-05.jpg",
    ],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "2",
    name: "Golden Horizon",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 36,
    material: "Gold-Plated Silver",
    colors: ["Gold", "Rose Gold"],
    description:
      "Warm-toned bracelet with intricate detailing, inspired by the golden rays of a setting sun.",
    images: [
      "/products/bestseller-2-01.jpg",
      "/products/bestseller-2-02.jpg",
      "/products/bestseller-2-03.jpg",
      "/products/bestseller-2-04.jpg",
      "/products/bestseller-2-05.jpg",
    ],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "3",
    name: "Cosmic Whisper",
    price: 179.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviews: 52,
    material: "Sterling Silver with Gemstone Accents",
    colors: ["Silver", "Platinum"],
    description:
      "Ethereal design with subtle gemstone accents that capture the mystique of the cosmos.",
    images: [
      "/products/bestseller-3-01.jpg",
      "/products/bestseller-3-02.jpg",
      "/products/bestseller-3-03.jpg",
      "/products/bestseller-3-04.jpg",
      "/products/bestseller-3-05.jpg",
    ],
    isBestseller: true,
    isNew: true,
  },
  {
    id: "4",
    name: "Royal Opulence",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 41,
    material: "18K Gold with Diamond Accents",
    colors: ["Gold"],
    description:
      "A regal piece that embodies luxury and timeless elegance, perfect for special occasions.",
    images: [
      "/products/bestseller-4-01.jpg",
      "/products/bestseller-4-02.jpg",
      "/products/bestseller-4-03.jpg",
      "/products/bestseller-4-04.jpg",
      "/products/bestseller-4-05.jpg",
    ],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "5",
    name: "Ocean's Embrace",
    price: 139.99,
    originalPrice: 169.99,
    rating: 4.6,
    reviews: 29,
    material: "Sterling Silver with Aquamarine",
    colors: ["Silver", "Blue"],
    description:
      "Inspired by the tranquil depths of the ocean, featuring soft blue aquamarine stones.",
    images: [
      "/products/bestseller-5-01.jpg",
      "/products/bestseller-5-02.jpg",
      "/products/bestseller-5-03.jpg",
      "/products/bestseller-5-04.jpg",
      "/products/bestseller-5-05.jpg",
    ],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "6",
    name: "Celestial Symphony",
    price: 189.99,
    originalPrice: 219.99,
    rating: 4.7,
    reviews: 37,
    material: "Platinum with Star-Cut Crystals",
    colors: ["Platinum", "Silver"],
    description:
      "A mesmerizing bracelet that captures the intricate beauty of the night sky.",
    images: [
      "/products/bestseller-6-01.jpg",
      "/products/bestseller-6-02.jpg",
      "/products/bestseller-6-03.jpg",
      "/products/bestseller-6-04.jpg",
      "/products/bestseller-6-05.jpg",
    ],
    isBestseller: true,
    isNew: true,
  },
  {
    id: "7",
    name: "Vintage Whispers",
    price: 159.99,
    originalPrice: 189.99,
    rating: 4.5,
    reviews: 33,
    material: "Antique Silver with Vintage Finish",
    colors: ["Silver", "Antique Bronze"],
    description:
      "A delicate piece that tells a story of timeless elegance and vintage charm.",
    images: [
      "/products/bestseller-7-01.jpg",
      "/products/bestseller-7-02.jpg",
      "/products/bestseller-7-03.jpg",
      "/products/bestseller-7-04.jpg",
      "/products/bestseller-7-05.jpg",
    ],
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
