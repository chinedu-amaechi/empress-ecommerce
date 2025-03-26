"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/product/product-card";
import CollectionNavigator from "./collection-navigator";
import Breadcrumb from "@/components/ui/breadcrumb";
import ScrollProgress from "./scroll-progress";
import Heading from "@/components/ui/heading";
import Footer from "@/components/layout/footer";
import { getAllCollections } from "@/lib/collection-service";
import CollectionNavigationHeader from "./collection-navigation-header";
import CollectionIntroduction from "./collection-introduction";
import CollectionFeaturedProduct from "./collection-featured-product";
import CollectionProduct from "./collection-products";
import { useQuery } from "@tanstack/react-query";

// Add these styles directly in the component
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
  const [collectionsData, setCollectionsData] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
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

  const { data, isLoading, error } = useQuery({
    queryFn: getAllCollections,
    queryKey: ["collections"],
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    async function fetchCollections() {
      if (data) {
        setCollectionsData(data);
        console.log("All collections:", data);
        console.log(collectionsData);
        setActiveCollection(
          data.filter(
            (collection) => collection.name === highlightCollection
          )[0]
        );
      } else {
        return;
      }
    }

    fetchCollections();
  }, [data, collectionsData]);

  // Handle initial load and collection change
  useEffect(() => {
    setIsVisible(true);

    if (
      highlightCollection &&
      Object.keys(collectionsData).includes(highlightCollection)
    ) {
      setActiveCollection(highlightCollection);
    }

    // Check initial scroll position immediately
    setIsScrolled(window.scrollY > 100);

    // Add scroll event listener for future scrolling
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
  const handleCollectionChange = (collectionName) => {
    console.log(collectionName);

    // Only proceed if we're changing to a different collection
    if (activeCollection.name !== collectionName) {
      setActiveCollection(
        collectionsData.filter(
          (collection) => collection.name === collectionName
        )[0]
      );

      // Always scroll to top of the page when changing collections
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Update URL query parameter without full page reload
      const url = new URL(window.location);
      url.searchParams.set("collection", collectionName);
      window.history.pushState({}, "", url);
    }
  };

  if (isLoading || !collectionsData || !activeCollection) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading collections...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Error loading collections</p>
      </main>
    );
  }
  console.log(activeCollection);
  console.log(collectionsData);

  // return (
  //   <div>
  //     <h1>Collections</h1>
  //     <h1>{activeCollection.name}</h1>
  //     <img src={activeCollection.imageUrl.optimizeUrl } />
  //   </div>
  // );

  return (
    <main ref={mainRef} className="min-h-screen overflow-hidden bg-[#f9f9f9]">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      {/* Fixed navigation bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"></div>
        <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row items-center">
          {/* Breadcrumb Navigation */}
          <div className="md:w-1/3">
            {/* <Breadcrumb currentCollection={activeCollection} /> */}
          </div>

          {/* Logo - centered with width constraints */}
          <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
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

          {/* Collection Navigation */}
          <CollectionNavigationHeader
            collectionsData={collectionsData}
            activeCollection={activeCollection}
            isScrolled={isScrolled}
            onHandleCollectionChange={handleCollectionChange}
          />
        </div>
      </div>

      {/* Elegant Header with Dynamic Background and Checkerboard Transition */}
      <header className="relative h-[90vh] overflow-hidden">
        <div className={checkerboardStyles.checkerboardContainer}>
          {!isTransitioning ? (
            // Regular image when not transitioning
            <div className={checkerboardStyles.imageWrapper}>
              <Image
                src={activeCollection.imageUrl.optimizeUrl}
                alt={activeCollection.name}
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
                  src={activeCollection.imageUrl.optimizeUrl}
                  alt={activeCollection.name}
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
                        backgroundImage: `url(${activeCollection.imageUrl.optimizeUrl})`,
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
                  {activeCollection.name}
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
              {activeCollection.description}
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
            <CollectionIntroduction
              collection={{ name: "Ethereal", itemsCount: 6 }}
            />

            {/* Featured Product Showcase */}
            {/* <CollectionFeaturedProduct
              product={collectionsData[activeCollection].products[0]}
              collection={collectionsData[activeCollection]}
            /> */}

            {/* Collection Products Grid Section */}
            {/* <CollectionProduct collection={collectionsData[activeCollection]} /> */}

            {/* Other Collections */}
            <section id="products-section">
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
                      onClick={() => handleCollectionChange(collection.name)}
                    >
                      <Image
                        src={collection.imageUrl.optimizeUrl}
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
              {/* Collection Navigator */}
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <CollectionNavigator
                  collections={collectionsData}
                  currentCollection={activeCollection}
                  onNavigate={(collection) =>
                    handleCollectionChange(collection, true)
                  }
                />
              </div>
            </section>
          </div>
        </motion.section>
      </AnimatePresence>

      <Footer />
    </main>
  );
}
