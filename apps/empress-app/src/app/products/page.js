"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// UI Components
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/product/product-card";
import ProductHero from "./product-hero";

// Data fetching
import { getAllProducts } from "@/lib/product-service";
import useCollections from "@/hooks/use-collections";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const collectionFilter = searchParams.get("collection") || "all";
  const searchQuery = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "featured";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const { data } = useCollections();

  // Update search params function
  const updateSearchParams = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  useEffect(() => {
    if (data) {
      setCollections(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      setProductLoading(true);
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering and sorting logic
  useEffect(() => {
    let filtered = [...products];

    // Filter by collection
    if (collectionFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.collectionId === collectionFilter
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, collectionFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9]">
      {/* Import Hero Component */}
      <ProductHero />

      <main className="flex-grow container mx-auto px-6 py-12 max-w-screen-2xl">
        {/* Search and Filters */}
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3 relative">
          {/* Decorative background elements */}
          <div className="absolute -top-4 left-0 w-full h-full bg-white/60 rounded-xl shadow-[0_4px_20px_rgba(17,41,107,0.05)] -z-10"></div>

          {/* Search Input */}
          <div className="lg:col-span-2">
            <label
              htmlFor="product-search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Products
            </label>
            <input
              id="product-search"
              type="text"
              placeholder="Search by name or description..."
              className="w-full px-4 py-3 border-2 border-gray-300/50 
                rounded-xl 
                focus:border-[#11296B]/50 
                focus:ring-2 focus:ring-[#11296B]/20 
                transition-all duration-300 
                bg-white/80 
                shadow-sm"
              value={searchQuery}
              onChange={(e) => updateSearchParams("q", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Collection Filter */}
            <div>
              <label
                htmlFor="collection-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Collection
              </label>
              <select
                id="collection-filter"
                className="w-full px-4 py-3 border-2 border-gray-300/50 
                  rounded-xl 
                  focus:border-[#11296B]/50 
                  focus:ring-2 focus:ring-[#11296B]/20 
                  transition-all duration-300 
                  bg-white/80 
                  shadow-sm"
                value={collectionFilter}
                onChange={(e) =>
                  updateSearchParams("collection", e.target.value)
                }
              >
                <option value="all">All Collections</option>
                {collections.map((collection) => (
                  <option key={collection._id} value={collection._id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label
                htmlFor="sort-by"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sort By
              </label>
              <select
                id="sort-by"
                className="w-full px-4 py-3 border-2 border-gray-300/50 
                  rounded-xl 
                  focus:border-[#11296B]/50 
                  focus:ring-2 focus:ring-[#11296B]/20 
                  transition-all duration-300 
                  bg-white/80 
                  shadow-sm"
                value={sortBy}
                onChange={(e) => updateSearchParams("sort", e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {productLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-16 h-16 border-4 border-[#11296B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="transition-all duration-300 
                  hover:scale-105 
                  hover:shadow-lg 
                  rounded-xl 
                  overflow-hidden"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No products found
            </h2>
            <p className="text-lg text-gray-500 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              className="inline-flex items-center px-6 py-2 
                border border-transparent 
                text-sm font-medium 
                rounded-md 
                text-white 
                bg-[#11296B] 
                hover:bg-[#1E96FC] 
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-[#11296B] 
                transition-all"
              onClick={() => window.history.replaceState(null, "", "/products")}
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
