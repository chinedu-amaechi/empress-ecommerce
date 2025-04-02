// src/app/faq/page.js
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/layout/footer";
import Heading from "@/components/ui/heading";
import { allFaqs, getCategories, filterFaqs } from "./faq-data";

// FAQ Item Component with elegant styling
const FAQItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div className="border-b border-gray-200 overflow-hidden transition-all duration-300">
      {/* Question Button */}
      <button
        onClick={onClick}
        className="w-full py-5 text-left flex justify-between items-center"
        aria-expanded={isActive}
      >
        <span className="text-lg font-normal text-[#11296B]">{question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#11296B]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {/* Answer Panel with smooth animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isActive ? "max-h-[500px] pb-6" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed pr-6">{answer}</p>
      </div>
    </div>
  );
};

// FAQ Categories Tab Component with luxury styling
const CategoryTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 font-light text-sm border-b-2 transition-all duration-200 ${
              activeCategory === category
                ? "border-[#11296B] text-[#11296B]"
                : "border-transparent text-gray-500 hover:text-[#11296B]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Search Bar Component with luxury styling
const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="relative max-w-xl mx-auto mb-16">
      <input
        type="text"
        placeholder="Search for answers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        className="w-full px-5 py-4 pr-12 bg-white border-b border-gray-300 focus:outline-none focus:border-[#11296B] text-gray-700 transition-all"
      />
      <button
        onClick={onSearch}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#11296B] transition-colors p-4"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default function FAQ() {
  // Get categories from the imported data
  const categories = getCategories();

  // State hooks
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(allFaqs);
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroVisible, setHeroVisible] = useState(false);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set hero visibility after component mounts
  useEffect(() => {
    setHeroVisible(true);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    // Use the filterFaqs utility function from faq-data.js
    const result = filterFaqs(activeCategory, searchQuery);

    setFilteredFaqs(result);
    // Reset active index when filters change
    setActiveIndex(null);
  }, [searchQuery, activeCategory]);

  // Toggle FAQ expansion
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Handle search button click
  const handleSearch = () => {
    // The filtering is already handled by the useEffect
    console.log("Searching for:", searchQuery);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Elegant Luxury Hero Header with Gradient */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/faq-hero.jpg"
            alt="Luxury jewelry background"
            fill
            className="object-cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>

        {/* Hero Content with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
        >
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="h-px w-20 bg-white/50 mx-auto mb-6"></div>
              <Heading
                level={1}
                className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider mb-6"
              >
                CUSTOMER CARE
              </Heading>
              <div className="h-px w-20 bg-white/50 mx-auto"></div>
            </div>
            <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-white/80">
              Discover answers to your questions about our products, services,
              and policies
            </p>
          </div>
        </motion.div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-4 py-16 relative">
        {/* Luxury Decorative Elements */}
        <div className="absolute top-0 left-0 -mt-20 w-40 h-40 bg-[#f8f9fc] rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-40 right-0 w-60 h-60 bg-[#11296B]/5 rounded-full opacity-50 blur-3xl"></div>

        {/* Search Bar with Luxury Styling */}
        <div className="relative z-10">
          <div className="text-center mb-12">
            <p className="uppercase text-sm tracking-widest text-gray-500 mb-4">
              FIND YOUR ANSWER
            </p>
            <Heading
              level={2}
              className="text-2xl md:text-3xl font-light text-[#11296B] mb-6"
            >
              Frequently Asked Questions
            </Heading>
            <div className="h-px w-16 bg-amber-300 mx-auto"></div>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* FAQ Accordion Items with Luxury Styling */}
        <div className="relative z-10">
          {filteredFaqs.length > 0 ? (
            <div className="bg-white p-8 md:p-12 shadow-md">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isActive={activeIndex === index}
                    onClick={() => toggleFAQ(index)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white shadow-md">
              <p className="text-gray-500 mb-4">
                No questions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="inline-block px-6 py-2 bg-[#11296B] text-white hover:bg-[#1E96FC] transition-colors duration-300 text-sm"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Contact Section with Luxury Styling */}
        <div className="mt-20 text-center relative z-10">
          <div className="h-px w-16 bg-amber-300 mx-auto mb-8"></div>
          <Heading
            level={2}
            className="text-2xl font-light text-[#11296B] mb-4"
          >
            Still Have Questions?
          </Heading>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Our customer care specialists are here to assist you with any
            inquiries about our products or services.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 border border-[#11296B] text-[#11296B] hover:bg-[#11296B] hover:text-white transition-all duration-300 uppercase tracking-wider text-sm font-light"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
