"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// UI Components
import Footer from "@/components/layout/footer";
import Heading from "@/components/ui/heading";
import ProductCard from "@/components/product/product-card";

// Data fetching
import { getAllProducts } from "@/lib/product-service";
import useCollections from "@/hooks/use-collections";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const collectionFilter = searchParams.get("collection") || "all";
  const searchQuery = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "featured";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "1000"; // Set a default max price

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const { data } = useCollections();

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

  // Apply filters, search, price range, and sorting
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

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= parseFloat(minPrice) &&
        product.price <= parseFloat(maxPrice)
    );

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
        // Default sorting (Featured)
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, collectionFilter, searchQuery, sortBy, minPrice, maxPrice]);

  // Update URL dynamically
  const updateSearchParams = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <Heading level="h1" className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Products
          </Heading>
          <p className="text-lg text-gray-600">
            Find high-quality products that you'll love.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label
              htmlFor="product-search"
              className="block text-sm font-medium text-gray-700"
            >
              Search Products
            </label>
            <input
              id="product-search"
              type="text"
              placeholder="Search by name or description..."
              className="mt-2 block w-full rounded-xl border-2 border-gray-300 py-3 px-4 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              value={searchQuery}
              onChange={(e) => updateSearchParams("q", e.target.value)}
            />
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Collection Filter */}
            <div>
              <label
                htmlFor="collection-filter"
                className="block text-sm font-medium text-gray-700"
              >
                Collection
              </label>
              <select
                id="collection-filter"
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 py-3 px-4 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                value={collectionFilter}
                onChange={(e) =>
                  updateSearchParams("collection", e.target.value)
                }
              >
                <option value="all">All Collections</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label
                htmlFor="sort-by"
                className="block text-sm font-medium text-gray-700"
              >
                Sort By
              </label>
              <select
                id="sort-by"
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 py-3 px-4 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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

            {/* Price Filter */}
            <div>
              <label
                htmlFor="price-range"
                className="block text-sm font-medium text-gray-700"
              >
                Price Range
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  className="mt-2 block w-full rounded-xl border-2 border-gray-300 py-3 px-4 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  value={minPrice}
                  onChange={(e) =>
                    updateSearchParams("minPrice", e.target.value)
                  }
                />
                <span className="text-gray-600">-</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  className="mt-2 block w-full rounded-xl border-2 border-gray-300 py-3 px-4 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  value={maxPrice}
                  onChange={(e) =>
                    updateSearchParams("maxPrice", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {productLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
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
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
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
