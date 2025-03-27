// src/app/page.js
import React from "react";
import CollectionsSection from "@/components/home/collections-section";
import BestsellersSection from "@/components/home/bestsellers-section";
import TestimonialsCarousel from "@/components/home/testimonials-carousel";
import RecentlyViewedItems from "@/components/home/recentlyviewed-item";
import WhyChooseUs from "@/components/home/whychoose-us";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";


export default function Home() {
  return (
    <main className="bg-white">
      <Header />
      <CollectionsSection />
      <BestsellersSection />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <RecentlyViewedItems />
      <Footer />
    </main>
  );
}
