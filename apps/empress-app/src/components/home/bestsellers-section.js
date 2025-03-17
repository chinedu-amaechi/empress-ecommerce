// src/components/home/BestsellersSection.js
import React from "react";
import Image from "next/image";
import Heading from "@/components/ui/heading";
import Button from "@/components/ui/button";

const bestsellers = [
  {
    id: 1,
    name: "Moonlight Elegance",
    description: "Delicate silver bracelet with lunar inspiration",
    price: 129.99,
    image: "/products/bestseller-1.jpg",
  },
  {
    id: 2,
    name: "Golden Horizon",
    description: "Warm-toned bracelet with intricate detailing",
    price: 149.99,
    image: "/products/bestseller-2.jpg",
  },
  {
    id: 3,
    name: "Cosmic Whisper",
    description: "Ethereal design with subtle gemstone accents",
    price: 179.99,
    image: "/products/bestseller-3.jpg",
  },
];

const BestsellersSection = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading
          level={2}
          className="text-center mb-8 md:mb-12 text-2xl md:text-3xl"
        >
          Bestselling Bracelets
        </Heading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-2"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="p-4 md:p-6">
                <Heading level={4} className="mb-2 text-base md:text-lg">
                  {product.name}
                </Heading>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-semibold text-[#11296B]">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button className="px-3 py-2 text-sm">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellersSection;
