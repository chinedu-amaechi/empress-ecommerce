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
import ProductSearch from "@/components/product/product-search";
import ProductCard from "@/components/product/product-card";

// Data fetching
import { getAllProducts, getProductsByCollection } from "@/lib/product-service";

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
  const [loading, setLoading] = useState(true);

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

  // Fetch products and collections on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all products
        const allProducts = await getAllProducts();
        setProducts(allProducts);

        // Extract unique collections from products
        const uniqueCollections = [
          ...new Set(allProducts.map((product) => product.collectionId)),
        ].map((collectionId) => {
          const product = allProducts.find((p) => p.collectionId === collectionId);
          return {
            id: collectionId,
            name: product?.collectionName || collectionId,
          };
        });
        setCollections(uniqueCollections);

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
        setLoading(false);
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