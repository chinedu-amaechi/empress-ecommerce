// src/components/home/CollectionsSection.js
import React from "react";
import Image from "next/image";
import Heading from "@/components/ui/heading";

const collections = [
  {
    name: "Ethereal",
    description: "Delicate designs that whisper elegance",
    image: "/collections/ethereal.jpg",
  },
  {
    name: "Divine",
    description: "Bold statements of inner strength",
    image: "/divine.jpg",
  },
  {
    name: "Heritage",
    description: "Timeless craftsmanship passed down",
    image: "/collections/heritage.jpg",
  },
  {
    name: "Celestial Bloom",
    description: "Inspired by the cosmic dance of stars",
    image: "/collections/celestial.jpg",
  },
];

const CollectionsSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading
          level={2}
          className="text-center mb-8 md:mb-12 text-2xl md:text-3xl"
        >
          Our Collections
        </Heading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {collections.map((collection) => (
            <div
              key={collection.name}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                width={400}
                height={400}
                className="w-full h-48 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heading
                  level={3}
                  className="text-white mb-2 text-lg md:text-xl"
                >
                  {collection.name}
                </Heading>
                <p className="text-white text-xs md:text-sm mb-3">
                  {collection.description}
                </p>
                <a
                  href={`/collections/${collection.name
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="text-white text-sm font-semibold hover:underline"
                >
                  Explore Collection →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
