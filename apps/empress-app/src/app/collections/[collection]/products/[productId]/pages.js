// src/app/collections/[collection]/products/[productId]/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/layout/footer";
import Breadcrumb from "@/components/ui/breadcrumb";
import ProductGallery from "@/components/product/product-gallery";
import ProductInfo from "@/components/product/product-info";
import RelatedProducts from "@/components/product/related-products";
import ReviewSection from "@/components/product/review-section";
import ProductTabs from "@/components/product/product-tabs";

// Data
import {
  getProductById,
  getProductsByCollection,
  getAllProducts,
} from "@/lib/product-service";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { collection, productId } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product data
  useEffect(() => {
    if (!collection || !productId) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);

        // Fetch the current product
        const productData = await getProductById(collection, productId);
        if (!productData) {
          throw new Error("Product not found");
        }

        setProduct(productData);

        // Fetch related products from the same collection
        const collectionProducts = await getProductsByCollection(collection);
        const filtered = collectionProducts
          .filter((item) => item.id !== productId)
          .slice(0, 4); // Limit to 4 related products

        setRelatedProducts(filtered);

        // Add to recently viewed
        addToRecentlyViewed(productData);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [collection, productId]);

  // Add to recently viewed items
  const addToRecentlyViewed = (product) => {
    if (typeof window === "undefined" || !product) return;

    try {
      const recentItems = JSON.parse(
        localStorage.getItem("recently_viewed_items") || "[]"
      );

      // Remove if already exists
      const filteredItems = recentItems.filter(
        (item) => item.id !== product.id
      );

      // Add to beginning and limit to 6 items
      const updatedItems = [product, ...filteredItems].slice(0, 6);

      localStorage.setItem(
        "recently_viewed_items",
        JSON.stringify(updatedItems)
      );
    } catch (error) {
      console.error("Error updating recently viewed items:", error);
    }
  };

  // If loading, show a nice loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex justify-center items-center">
          <div className="animate-pulse space-y-8 w-full max-w-6xl">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-gray-200 h-[500px] rounded-md"></div>
              <div className="space-y-6">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded w-full"></div>
                <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If error, show error page
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-light text-gray-900 mb-6">
            Product Not Found <span className="font-semibold">or Error</span>
          </h1>
          <p className="text-gray-600 mb-8">
            {error || "We couldn't find the product you're looking for."}
          </p>
          <Link
            href={`/collections?collection=${collection}`}
            className="px-6 py-3 bg-[#11296B] text-white rounded-md hover:bg-[#1E96FC] transition-colors"
          >
            Back to Collection
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) return null;

  // Format breadcrumb data
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    {
      label: product.collectionName,
      href: `/collections?collection=${collection}`,
    },
    {
      label: product.name,
      href: `/collections/${collection}/products/${productId}`,
      active: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Gallery */}
            <ProductGallery images={product.images} name={product.name} />

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>

          {/* Product Tabs */}
          <ProductTabs product={product} />

          {/* Review Section */}
          <ReviewSection
            productId={productId}
            collectionId={collection}
            reviews={product.reviews || []}
            rating={product.rating}
          />

          {/* Related Products */}
          <RelatedProducts
            products={relatedProducts}
            collectionName={product.collectionName}
            collectionId={collection}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
