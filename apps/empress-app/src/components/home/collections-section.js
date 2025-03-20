// src/components/home/CollectionsSection.js
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/ui/heading";

const collections = [
  {
    name: "Ethereal",
    description: "Delicate designs that whisper elegance",
    image: "/collections/ethereal-full.jpg",
    href: "#",
    accentColor: "bg-blue-400",
  },
  {
    name: "Divine",
    description: "Bold statements of inner strength",
    image: "/collections/divine-full.jpg",
    href: "#",
    accentColor: "bg-amber-400",
  },
  {
    name: "Heritage",
    description: "Timeless craftsmanship passed down",
    image: "/collections/heritage-full.jpg",
    href: "#",
    accentColor: "bg-emerald-400",
  },
  {
    name: "Celestial Bloom",
    description: "Inspired by the cosmic dance of stars",
    image: "/collections/celestial-full.jpg",
    href: "#",
    accentColor: "bg-purple-400",
  },
];

const CollectionsSection = () => {
  return (
    <section className="bg-[#F8F9FC] py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <Heading
            level={2}
            className="text-center mb-4 text-3xl md:text-5xl text-[#11296B] font-light tracking-tight"
          >
            Our <span className="font-semibold">Collections</span>
          </Heading>
          {/* Added thin decorative line above heading */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#11296B]/30 via-[#11296B] to-[#11296B]/30 rounded-full mb-6 mx-auto"></div>
        </div>

        {/* Added descriptive subtitle */}
        <p className="text-gray-600 max-w-xl mx-auto text-lg text-center mb-12">
          Discover our carefully curated collections, each telling a unique
          story of elegance and craftsmanship.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {collections.map((collection) => (
            <Link
              href={`/collections?collection=${collection.href.replace(
                "/collections/",
                ""
              )}`}
              key={collection.name}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    width={500}
                    height={500}
                    className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

                  {/* Added subtle colored dot in corner */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-2 h-2 rounded-full ${collection.accentColor}`}
                    ></div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heading
                    level={3}
                    className="text-2xl font-semibold mb-2 tracking-tight"
                  >
                    {collection.name}
                  </Heading>
                  <p className="text-base mb-3 text-white/80">
                    {collection.description}
                  </p>
                  <span className="text-base font-medium flex items-center text-white">
                    Explore Collection
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
