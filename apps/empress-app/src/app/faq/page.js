// src/app/faq/page.js
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/layout/footer";
import Heading from "@/components/ui/heading";

// FAQ Item Component
const FAQItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Question Button */}
      <button
        onClick={onClick}
        className={`w-full px-6 py-5 text-left flex justify-between items-center ${
          isActive ? "bg-[#f8f9fc]" : "bg-white"
        }`}
      >
        <span className="text-lg font-medium text-[#11296B]">{question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
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
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isActive ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-5 bg-[#f8f9fc] border-t border-gray-100">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

// FAQ Categories Tab Component
const CategoryTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex justify-center mb-12 flex-wrap">
      <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeCategory === category
                ? "bg-white text-[#11296B] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Search Bar Component
const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="mb-16 relative max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search for answers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        className="w-full px-5 py-4 pr-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#11296B] text-gray-700 shadow-sm"
      />
      <button
        onClick={onSearch}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#11296B] transition-colors"
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
  // FAQ data structure with categories
  const allFaqs = [
    {
      category: "Product Information",
      question: "How do I determine my bracelet size?",
      answer:
        'Measure your wrist circumference with a flexible tape measure. Add 0.5-1 inch (1.3-2.5 cm) to your wrist measurement for a comfortable fit. Our bracelets come in sizes XS (5.5"), S (6"), M (6.5"), L (7"), and XL (7.5"). For a more precise fit, we offer a complimentary sizing guide with every order.',
    },
    {
      category: "Product Information",
      question: "What materials are used in Empress bracelets?",
      answer:
        "Our bracelets are crafted using ethically sourced precious metals including sterling silver, 18K gold, and rose gold plating. Select pieces feature genuine gemstones such as moonstone, amethyst, jade, opal, pearl, blue topaz, amazonite, and mother of pearl. We prioritize hypoallergenic materials and each piece undergoes rigorous quality testing.",
    },
    {
      category: "Product Care",
      question: "How should I care for my Empress bracelet?",
      answer:
        "To maintain your bracelet's beauty, we recommend storing it in the provided jewelry pouch when not in use. Avoid contact with perfumes, lotions, and chemicals. Clean gently with a soft, lint-free cloth. For silver pieces, use a specialized silver polishing cloth to restore shine. We offer a complimentary cleaning kit with purchases over $150.",
    },
    {
      category: "Orders & Shipping",
      question: "What is your return and exchange policy?",
      answer:
        "We accept returns and exchanges within 30 days of delivery. Items must be in their original condition with all packaging and documentation included. Returns due to craftsmanship issues are eligible for a full refund or exchange. For hygiene reasons, custom or personalized items cannot be returned unless defective.",
    },
    {
      category: "Orders & Shipping",
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Standard international shipping takes 7-14 business days. Express shipping (3-5 business days) is available for most countries. Import duties and taxes may apply depending on your location and are the responsibility of the customer. All shipments include tracking information.",
    },
    {
      category: "Product Care",
      question: "Are Empress bracelets water-resistant?",
      answer:
        "While our bracelets are crafted for durability, we recommend removing them before swimming, showering, or engaging in activities with excessive moisture. Brief exposure to water won't damage most pieces, but prolonged contact may affect the finish and mechanics. For specific care instructions for your piece, please refer to the care card included with your purchase.",
    },
    {
      category: "Customer Service",
      question: "Do you offer bracelet repairs or re-sizing?",
      answer:
        "Yes, we provide repair and re-sizing services for all Empress bracelets. Re-sizing is complimentary within the first 60 days of purchase. After this period, or for repairs, a nominal fee may apply depending on the complexity of the work required. Please contact our customer service team to arrange for these services.",
    },
    {
      category: "Customer Service",
      question: "What is the warranty period for Empress bracelets?",
      answer:
        "All Empress bracelets come with a one-year limited warranty against manufacturing defects. This covers issues with clasps, chain integrity, and stone settings under normal wear. The warranty does not cover damage resulting from accidents, improper use, or natural wear over time. Extended warranty options are available for purchase.",
    },
    {
      category: "Collections",
      question: "What collections does Empress offer?",
      answer:
        "Empress offers four distinct collections, each with its own unique character and aesthetic: Ethereal, Divine, Heritage, and Celestial Bloom. Each collection features carefully curated pieces that reflect different aspects of elegance and sophistication.",
    },
    {
      category: "Collections",
      question: "Can you tell me about the Ethereal Collection?",
      answer:
        "The Ethereal Collection embodies whispers of grace and serenity, featuring soft hues and luminous stones that reflect inner beauty. Notable pieces include Aurelia (with Opal, Pearl, Jade Thread, representing golden light and timeless grace), Aluna (featuring Opal, Blue Topaz, Amazonite, Pearl, symbolizing moonlit calm and gentle renewal), Sorelle (with Amethyst and Mother of Pearl, representing sisterhood, protection, and wisdom), and Selene (featuring Pink Conch and Pearl, named after the goddess of the moon, representing feminine beauty).",
    },
    {
      category: "Product Information",
      question: "What do the stones and materials in your bracelets symbolize?",
      answer:
        "Each material in our bracelets carries special meaning: Opal represents hope and purity, Pearl symbolizes wisdom and integrity, Jade stands for harmony and balance, Blue Topaz enhances communication and self-expression, Amazonite represents courage and truth, Amethyst offers protection and spiritual awareness, and Mother of Pearl symbolizes prosperity and intuition. We carefully select these materials to create pieces that are not only beautiful but also meaningful.",
    },
    {
      category: "Orders & Shipping",
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with your tracking information. You can also track your order by logging into your account on our website and navigating to the 'Order History' section. If you have any issues accessing your tracking information, please contact our customer support team.",
    },
    {
      category: "Customer Service",
      question: "How can I contact customer support?",
      answer:
        "Our customer support team is available Monday through Friday, 9am to 6pm EST. You can reach us via email at support@empressbracelets.com, by phone at 1-800-EMPRESS, or through the live chat feature on our website. For after-hours inquiries, please leave a message and we'll respond within one business day.",
    },
    {
      category: "Account & Privacy",
      question: "How is my personal information protected?",
      answer:
        "We take your privacy seriously. All personal information is encrypted and securely stored following industry-standard protocols. We never share your information with third parties without your explicit consent. For more details, please review our Privacy Policy on our website.",
    },
    {
      category: "Product Information",
      question: "Are your materials ethically sourced?",
      answer:
        "Yes, we are committed to ethical sourcing practices. All our gemstones and precious metals come from suppliers who adhere to responsible mining and production standards. We regularly audit our supply chain to ensure compliance with ethical guidelines and environmental regulations.",
    },
    {
      category: "Account & Privacy",
      question: "How do I create or manage my account?",
      answer:
        "To create an account, click on the 'Account' icon in the top right corner of our website and select 'Create Account.' For existing customers, log in using your email and password to access your account dashboard. From there, you can manage your profile information, view order history, track shipments, and update payment methods.",
    },
  ];

  // Extract unique categories
  const categories = ["All", ...new Set(allFaqs.map((faq) => faq.category))];

  // State hooks
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(allFaqs);
  const [activeCategory, setActiveCategory] = useState("All");

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = allFaqs;

    // Filter by category if not "All"
    if (activeCategory !== "All") {
      result = result.filter((faq) => faq.category === activeCategory);
    }

    // Filter by search query if it exists
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

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
    // This is just to handle the search button click explicitly
    console.log("Searching for:", searchQuery);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Elegant Hero Header with Parallax Effect */}
      <section className="relative h-[40vh] overflow-hidden mt-16">
        {/* Watermark Background */}
        <div
          className="absolute inset-0 bg-[#f8f9fa]"
          style={{
            backgroundImage: `url("/faq.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.15,
          }}
        ></div>

        {/* Title with Parallax Effect */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="text-center">
            <Heading level={1} className="text-4xl md:text-6xl font-light mb-4">
              Frequently Asked <span className="font-semibold">Questions</span>
            </Heading>
            <div className="w-16 h-px bg-amber-300 mx-auto"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto px-4">
              Find answers to the most common questions about our luxury
              bracelet collections, care instructions, and policies.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-4 py-16 relative">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-12 left-0 w-24 h-24 rounded-full bg-amber-100 opacity-20 blur-xl -z-10"></div>
        <div className="absolute bottom-36 right-0 w-40 h-40 rounded-full bg-[#11296B] opacity-5 blur-xl -z-10"></div>

        {/* Watermark logo in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none -z-5">
          <svg
            width="500"
            height="500"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#11296B">
              <path d="M36,10.5c-14.1-1.3-27.7,4.9-35.4,12.6L0,24l0.3,0.9c7.7,7.7,21.3,13.9,35.4,12.6c14.1,1.3,27.7-4.9,35.4-12.6l0.6-0.9 l-0.3-0.9C64.7,15.4,51.1,9.2,36,10.5z M37.1,15.8C28.7,14.4,19.7,18,15,22L37.1,15.8z M64.7,28.2c-4.7,4-13.7,7.6-22.1,6.2 L64.7,28.2z M61.5,23.5C51.9,28.7,39.8,32,22.7,32C5.6,32,0,32,0,32s3-2,8-4c5-2,17-6,24-12C39,10,54,5,54,5s-7,5.4-7,8.6 C47,16.8,55.1,21.3,61.5,23.5z" />
            </g>
          </svg>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* FAQ Accordion Items */}
        <div className="space-y-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isActive={activeIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No questions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-[#11296B] hover:text-[#1E96FC] transition-colors"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <Heading level={2} className="text-2xl font-light mb-4">
            Still Have <span className="font-semibold">Questions?</span>
          </Heading>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Our customer service team is here to assist you with any inquiries
            about our products or services.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#11296B] text-white hover:bg-[#1E96FC] transition-colors duration-300 rounded-md shadow-sm"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
