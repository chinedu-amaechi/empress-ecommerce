// src/app/page.js
import React from "react";
import CollectionsSection from "@/components/home/collections-section";
import BestsellersSection from "@/components/home/bestsellers-section";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/product/product-card";

export default function Home() {
  return (
    <main className="bg-white">
      <Header />
      <ProductCard />
      <CollectionsSection />
      <BestsellersSection />

      <Footer />
    </main>
  );
}
