"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CollectionsData from "./collections-data";
import ProductCard from "@/components/product/product-card";
import Heading from "@/components/ui/heading";
import Footer from "@/components/layout/footer";

// Add these styles directly in the component for now
// In a real application, you would move this to a separate CSS module
const checkerboardStyles = {
  checkerboardContainer: "relative w-full h-full overflow-hidden",
  imageWrapper: "absolute top-0 left-0 w-full h-full",
  checkerCell:
    "absolute overflow-hidden bg-transparent transition-all duration-600",
  cellContent: "absolute w-full h-full object-cover",
  cellHidden: "scale-0 opacity-0",
};

export default function Collections() {
  const searchParams = useSearchParams();
  const highlightCollection = searchParams.get("collection");
  const collectionsData = CollectionsData();
  const [activeCollection, setActiveCollection] = useState(
    highlightCollection || Object.keys(collectionsData)[0]
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Checkerboard transition state
  const [previousCollection, setPreviousCollection] =
    useState(activeCollection);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cells, setCells] = useState([]);
  const gridSize = 8; // 8x8 grid for the checkerboard

  // References to collection sections
  const mainRef = useRef(null);
  const optionsRef = useRef(null);

  // Handle initial load and collection change
  useEffect(() => {
    setIsVisible(true);

    if (
      highlightCollection &&
      Object.keys(collectionsData).includes(highlightCollection)
    ) {
      setActiveCollection(highlightCollection);
    }

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [highlightCollection]);

  // Handle checkerboard transition when collection changes
  useEffect(() => {
    if (previousCollection !== activeCollection) {
      // Setup the transition
      setIsTransitioning(true);

      // Create the cells array for the checkerboard
      const newCells = [];
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          newCells.push({
            row,
            col,
            key: `${row}-${col}`,
            delay: Math.random() * 0.5, // Random delay for more organic effect
          });
        }
      }
      setCells(newCells);

      // After the transition completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousCollection(activeCollection);
      }, 1000); // Slightly longer than the transition time

      return () => clearTimeout(timer);
    }
  }, [activeCollection, previousCollection]);

  // Handle options horizontal scroll
  const handleOptionScroll = (direction) => {
    const container = optionsRef.current;
    if (!container) return;

    const scrollAmount = 100; // Adjust based on your design
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  // Handle collection change without scrolling to top
  const handleCollectionChange = (collection) => {
    setActiveCollection(collection);
    // Removed scrollTo to prevent page reset to top
  };

  return (
    <main ref={mainRef} className="min-h-screen overflow-hidden bg-[#f9f9f9]">
      {/* Fixed navigation bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <Image
                src="/empress_logo.png"
                alt="Empress Logo"
                width={240}
                height={80}
                className={`h-16 w-auto transition-all duration-500 ${
                  isScrolled ? "filter-none" : "brightness-0 invert"
                }`}
              />
            </Link>
          </div>

          {/* Collection Navigation - IMPROVED VISIBILITY */}
          <div className="flex justify-center">
            <div
              className={`backdrop-blur-md rounded-full px-2 py-1 inline-flex transition-all duration-500 ${
                isScrolled
                  ? "bg-gray-100 border border-gray-300 shadow-sm" // Enhanced contrast when scrolled
                  : "bg-white/10 border border-white/20"
              }`}
            >
              {Object.entries(collectionsData).map(([slug, collection]) => (
                <button
                  key={slug}
                  onClick={() => handleCollectionChange(slug)}
                  className={`relative px-4 py-2 mx-1 rounded-full whitespace-nowrap transition-all duration-300 text-sm ${
                    activeCollection === slug
                      ? isScrolled
                        ? "text-[#11296B] bg-amber-300 font-medium shadow-sm" // Amber background when scrolled
                        : "text-white bg-gray-500/50 font-medium" // Gray background when not scrolled
                      : isScrolled
                      ? "text-gray-800 hover:text-[#11296B] hover:bg-gray-200" // Darker text for better visibility
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Header with Dynamic Background and Checkerboard Transition */}
      <header className="relative h-[90vh] overflow-hidden">
        <div className={checkerboardStyles.checkerboardContainer}>
          {!isTransitioning ? (
            // Regular image when not transitioning
            <div className={checkerboardStyles.imageWrapper}>
              <Image
                src={collectionsData[activeCollection].heroImage}
                alt={collectionsData[activeCollection].name}
                fill
                className="object-cover"
                priority
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
            </div>
          ) : (
            // Checkerboard transition
            <>
              {/* Previous image underneath */}
              <div
                className={checkerboardStyles.imageWrapper}
                style={{ zIndex: 1 }}
              >
                <Image
                  src={collectionsData[previousCollection].heroImage}
                  alt={collectionsData[previousCollection].name}
                  fill
                  className="object-cover"
                  priority
                  quality={95}
                />
              </div>

              {/* Checkerboard cells with new image */}
              {cells.map((cell) => {
                const width = 100 / gridSize;
                const height = 100 / gridSize;
                const left = cell.col * width;
                const top = cell.row * height;

                return (
                  <div
                    key={cell.key}
                    className={`${checkerboardStyles.checkerCell} ${
                      isTransitioning ? "" : checkerboardStyles.cellHidden
                    }`}
                    style={{
                      width: `${width}%`,
                      height: `${height}%`,
                      left: `${left}%`,
                      top: `${top}%`,
                      transitionDelay: `${cell.delay}s`,
                      zIndex: 2,
                    }}
                  >
                    <div
                      className={checkerboardStyles.cellContent}
                      style={{
                        backgroundImage: `url(${collectionsData[activeCollection].heroImage})`,
                        backgroundSize: `${gridSize * 100}%`,
                        backgroundPosition: `${-left * gridSize}% ${
                          -top * gridSize
                        }%`,
                      }}
                    />
                  </div>
                );
              })}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"
                style={{ zIndex: 3 }}
              ></div>
            </>
          )}
        </div>

        {/* Elegant Header Content */}
        <motion.div
          key={`header-content-${activeCollection}`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.8,
                delay: 0.4,
                staggerChildren: 0.2,
              },
            },
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white p-6"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <Heading
                level={1}
                className="text-5xl md:text-7xl mb-6 text-white font-light"
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8 },
                    },
                  }}
                  className="font-semibold inline-block"
                >
                  {collectionsData[activeCollection].name}
                </motion.span>
              </Heading>

              {/* Decorative line */}
              <motion.div
                variants={{
                  hidden: { width: 0 },
                  visible: { width: "6rem", transition: { duration: 0.8 } },
                }}
                className="h-px bg-white/60 mx-auto my-6"
              ></motion.div>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              className="max-w-2xl mx-auto text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-12"
            >
              {collectionsData[activeCollection].description}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              <button
                onClick={() => {
                  const productsSection =
                    document.getElementById("products-section");
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-[#11296B] px-10 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Discover the Collection
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Elegant scroll indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/80"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </header>

      {/* Collection Detail Section */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeCollection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 px-6"
        >
          <div className="max-w-7xl mx-auto">
            {/* Collection Introduction */}
            <div className="flex flex-col items-center text-center mb-24">
              <div className="w-16 h-16 rounded-full bg-[#11296B]/10 flex items-center justify-center mb-8">
                <svg
                  className="w-8 h-8 text-[#11296B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>

              <Heading
                level={2}
                className="text-3xl md:text-4xl text-gray-900 font-light tracking-tight mb-6"
              >
                The Essence of{" "}
                <span className="font-semibold">
                  {collectionsData[activeCollection].name}
                </span>
              </Heading>

              <div className="w-16 h-px bg-[#11296B]/30 my-6"></div>

              <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-8">
                Each piece in the {collectionsData[activeCollection].name}{" "}
                collection tells a unique story, crafted with meticulous
                attention to detail and using only the finest materials. Our
                artisans blend traditional techniques with contemporary design
                to create timeless pieces that resonate with the modern empress.
              </p>

              {/* Collection Stats in Elegant Layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-light text-[#11296B] mb-2">
                    {collectionsData[activeCollection].products.length}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">
                    Unique Pieces
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-[#11296B] mb-2">
                    {
                      collectionsData[activeCollection].products.reduce(
                        (acc, product) => [
                          ...acc,
                          ...product.colors.filter(
                            (color) => !acc.includes(color)
                          ),
                        ],
                        []
                      ).length
                    }
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">
                    Color Variants
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-[#11296B] mb-2">
                    {collectionsData[activeCollection].products.reduce(
                      (acc, product) => acc + product.reviews,
                      0
                    )}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">
                    Customer Reviews
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-[#11296B] mb-2">
                    100%
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">
                    Handcrafted
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Product Showcase */}
            <div className="relative mb-32 border-1 border-[#d4d4d4] rounded-3xl overflow-hidden">
              <div className="absolute -inset-4 bg-[#11296B]/5 rounded-3xl -z-10 transform -rotate-1"></div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  {/* Added h-full here */}
                  {/* Image Side */}
                  <div className="relative h-80 lg:h-auto lg:min-h-[600px] overflow-hidden">
                    <Image
                      src={
                        collectionsData[activeCollection].products[0].images[0]
                      }
                      alt={collectionsData[activeCollection].products[0].name}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full">
                      <span className="text-sm text-[#11296B] font-medium">
                        Featured Piece
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex flex-col justify-center p-10 lg:p-16">
                    <h3 className="text-3xl font-light text-gray-900 mb-4">
                      {collectionsData[activeCollection].products[0].name}
                    </h3>

                    <div className="w-12 h-px bg-[#11296B]/30 my-6"></div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {
                        collectionsData[activeCollection].products[0]
                          .description
                      }
                      {/* Extended description */}
                      <span className="block mt-4">
                        Crafted with{" "}
                        {collectionsData[activeCollection].products[0].material}{" "}
                        and designed to embody the essence of the{" "}
                        {collectionsData[activeCollection].name} collection,
                        this piece stands as a testament to our commitment to
                        exceptional craftsmanship.
                      </span>
                    </p>

                    {/* Product Insights with responsive mobile-first design */}
                    <div className="mb-8">
                      <div className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                        Product Insights
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {/* First row - 3 columns on tablet and up, stacked on mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                          {/* Materials */}
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500 uppercase mb-1">
                              Materials
                            </div>
                            <div className="text-sm font-medium">
                              {collectionsData[activeCollection].products[0]
                                .material || "Premium Materials"}
                            </div>
                          </div>

                          {/* Creation Time */}
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500 uppercase mb-1">
                              Crafting Time
                            </div>
                            <div className="text-sm font-medium">48 Hours</div>
                          </div>

                          {/* Sustainability */}
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500 uppercase mb-1">
                              Sustainability
                            </div>
                            <div className="text-sm font-medium">
                              Eco-Friendly
                            </div>
                          </div>
                        </div>

                        {/* Second row - Full width Rating */}
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 uppercase mb-1">
                            Rating
                          </div>
                          <div className="flex items-center">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-4 h-4"
                                  fill={
                                    i <
                                    Math.round(
                                      collectionsData[activeCollection]
                                        .products[0].rating || 4.5
                                    )
                                      ? "currentColor"
                                      : "none"
                                  }
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                  />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm font-medium">
                              {collectionsData[activeCollection].products[0]
                                .rating || "4.8"}{" "}
                              / 5
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              (
                              {collectionsData[activeCollection].products[0]
                                .reviews || "124"}{" "}
                              reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collection Products Grid Section */}
            <section id="products-section" className="mb-32">
              <div className="text-center mb-16">
                <Heading
                  level={3}
                  className="text-2xl md:text-3xl text-gray-900 font-light tracking-tight mb-4"
                >
                  Explore the{" "}
                  <span className="font-semibold">
                    {collectionsData[activeCollection].name}
                  </span>{" "}
                  Collection
                </Heading>

                <div className="w-16 h-px bg-[#11296B]/30 mx-auto my-6"></div>

                <p className="max-w-2xl mx-auto text-gray-600">
                  Each piece in this collection has been meticulously crafted to
                  embody the essence of timeless elegance and contemporary
                  sophistication.
                </p>
              </div>

              {/* Plain grid with no motion effects, just basic centering */}
              <div className="mx-auto flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center max-w-7xl">
                  {collectionsData[activeCollection].products.map((product) => (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-12">
                <Link
                  href={`/collections/${activeCollection}`}
                  className="inline-block border border-[#11296B] text-[#11296B] hover:bg-[#11296B] hover:text-white px-8 py-3 rounded-full transition-colors duration-300"
                >
                  View All {collectionsData[activeCollection].name} Pieces
                </Link>
              </div>
            </section>

            {/* Other Collections */}
            <section>
              <div className="text-center mb-16">
                <Heading
                  level={3}
                  className="text-2xl md:text-3xl text-gray-900 font-light tracking-tight mb-4"
                >
                  Explore Other{" "}
                  <span className="font-semibold">Collections</span>
                </Heading>

                <div className="w-16 h-px bg-[#11296B]/30 mx-auto my-6"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(collectionsData)
                  .filter(([slug]) => slug !== activeCollection)
                  .slice(0, 3)
                  .map(([slug, collection]) => (
                    <div
                      key={slug}
                      className="relative h-80 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                      onClick={() => handleCollectionChange(slug)}
                    >
                      <Image
                        src={collection.heroImage}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h4 className="text-xl font-medium mb-2">
                          {collection.name}
                        </h4>
                        <p className="text-white/80 text-sm line-clamp-2 mb-4">
                          {collection.description}
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-white group-hover:underline">
                          Explore Collection
                          <svg
                            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </motion.section>
      </AnimatePresence>

      <Footer />
    </main>
  );
}
