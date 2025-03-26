// src/app/products/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// UI Components
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/layout/footer";
import Heading from "@/components/ui/heading";
import ProductSearch from "@/app/products/product-search";
import ProductCard from "@/components/product/product-card";

// Data fetching
import { getAllProducts, getProductsByCollection } from "@/lib/product-service";
import useCollections from "@/hooks/use-collections";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const collectionFilter = searchParams.get("collection");
  const searchQuery = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    collection: collectionFilter || "all",
    priceRange: "all",
    sortBy: "featured",
  });
  const [productLoading, setProductLoading] = useState(true);
  const { data, isLoading, error } = useCollections();

  // Price ranges for filtering
  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "under-100", label: "Under $100", min: 0, max: 100 },
    { id: "100-200", label: "$100 - $200", min: 100, max: 200 },
    { id: "200-300", label: "$200 - $300", min: 200, max: 300 },
    { id: "over-300", label: "Over $300", min: 300, max: Infinity },
  ];

  // Sort options
  const sortOptions = [
    { id: "featured", label: "Featured" },
    { id: "newest", label: "Newest" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "name-asc", label: "Name: A to Z" },
    { id: "name-desc", label: "Name: Z to A" },
  ];

  useEffect(() => {
    if (data) {
      setCollections(data);
    }
  }, [data]);

  // Fetch products and collections on component mount
  useEffect(() => {
    const fetchData = async () => {
      setProductLoading(true);
      try {
        // Fetch all products
        const allProducts = await getAllProducts();
        console.log("All products:", allProducts);

        setProducts(allProducts);

        // Extract unique collections from products
        const uniqueCollections = [
          ...new Set(allProducts.map((product) => product.collectionId)),
        ].map((collectionId) => {
          const product = allProducts.find(
            (p) => p.collectionId === collectionId
          );
          return {
            id: collectionId,
            name: product?.collectionName || collectionId,
          };
        });
        // setCollections(uniqueCollections);

        // Initialize active collection filter if provided in URL
        if (collectionFilter) {
          setActiveFilters((prev) => ({
            ...prev,
            collection: collectionFilter,
          }));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchData();
  }, [collectionFilter]);

  // Apply filters whenever active filters change
  useEffect(() => {
    if (products.length === 0) return;

    // Start with all products
    let filtered = [...products];

    // Apply collection filter
    if (activeFilters.collection !== "all") {
      filtered = filtered.filter(
        (product) => product.collectionId === activeFilters.collection
      );
    }

    // Apply price range filter
    if (activeFilters.priceRange !== "all") {
      const range = priceRanges.find(
        (range) => range.id === activeFilters.priceRange
      );
      if (range) {
        filtered = filtered.filter(
          (product) => product.price >= range.min && product.price <= range.max
        );
      }
    }

    // Apply search filter if query exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (activeFilters.sortBy) {
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
      case "featured":
      default:
        // Assuming featured products have a 'featured' boolean or numeric priority
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, activeFilters, searchQuery]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Heading level="h1" className="text-3xl font-bold mb-2">
            Products
          </Heading>
          <p className="text-gray-600">
            Discover our collection of high-quality products
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <ProductSearch initialQuery={searchQuery || ""} />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                value={activeFilters.collection}
                onChange={(e) =>
                  handleFilterChange("collection", e.target.value)
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

            {/* Price Range Filter */}
            <div>
              <label
                htmlFor="price-filter"
                className="block text-sm font-medium text-gray-700"
              >
                Price Range
              </label>
              <select
                id="price-filter"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                value={activeFilters.priceRange}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
              >
                {priceRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
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
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                value={activeFilters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        <div className="mb-6 flex flex-wrap gap-2">
          {activeFilters.collection !== "all" && (
            <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
              Collection:{" "}
              {collections.find((c) => c.id === activeFilters.collection)
                ?.name || activeFilters.collection}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => handleFilterChange("collection", "all")}
              >
                &times;
              </button>
            </div>
          )}
          {activeFilters.priceRange !== "all" && (
            <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
              Price:{" "}
              {
                priceRanges.find((r) => r.id === activeFilters.priceRange)
                  ?.label
              }
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => handleFilterChange("priceRange", "all")}
              >
                &times;
              </button>
            </div>
          )}
          {searchQuery && (
            <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
              Search: "{searchQuery}"
              <Link
                href="/products"
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </Link>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {productLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={() => {
                setActiveFilters({
                  collection: "all",
                  priceRange: "all",
                  sortBy: "featured",
                });
              }}
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
