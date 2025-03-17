"use client";

import { useState } from "react";
import Image from "next/image";

// SVG Icons to avoid additional package
const StarFullIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-yellow-500"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);

const StarHalfIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-yellow-500"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
      opacity="0.5"
    />
  </svg>
);

const StarEmptyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5 text-gray-300"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-red-500"
  >
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-gray-700"
  >
    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.853a2.25 2.25 0 012.274-2.25h10.5a.75.75 0 00.714-.515l1.605-4.756a.75.75 0 00-.714-1.036H6.981a.75.75 0 00-.691.479L5.324 7.5H4.5a.75.75 0 00-.75.75v.75h.75a.75.75 0 01.75.75v.75h1.5v-1.5a.75.75 0 00-.75-.75H3.75v-1.5h.75a.75.75 0 00.75-.75V6h.75a.75.75 0 00.692-.479L7.324 4.5h8.024a.75.75 0 000-1.5H6.981a1.5 1.5 0 00-1.417.957l-.428 1.285a1.5 1.5 0 001.41 1.958h12.827a.75.75 0 00.714-1.036l-1.605-4.756a.75.75 0 00-.714-.514H8.25a.75.75 0 000 1.5h7.01l1.305 3.864a.75.75 0 01-.714 1.036H5.572a.75.75 0 01-.714-.514L3.25 4.457v9.19a3.75 3.75 0 105.304 2.803 3.739 3.739 0 00-2.804-1.303h7.5a3.75 3.75 0 105.304 2.803c0-1.19-.557-2.257-1.431-2.253a.75.75 0 000 1.5c.469 0 .75.48.75.748a2.25 2.25 0 01-4.5 0 2.25 2.25 0 012.25-2.25h1.5a.75.75 0 000-1.5h-1.5a3.75 3.75 0 00-3.75 3.75 3.75 3.75 0 005.304 2.803 3.739 3.739 0 00-2.804-1.303h-7.5a2.25 2.25 0 00-2.25 2.25c0 1.24 1.01 2.25 2.25 2.25h.75a.75.75 0 000-1.5H5.25a.75.75 0 01-.75-.75 2.25 2.25 0 012.25-2.25h10.5a.75.75 0 00.714-.515l1.605-4.756a.75.75 0 00-.714-1.036H6.981z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default function ProductCard() {
  const rating = 4.5;
  const totalReviews = 120;
  const productImages = [
    "/bracelet-01.jpg",
    "/bracelet-02.jpg",
    "/bracelet-03.jpg",
    "/bracelet-04.jpg",
    "/bracelet-05.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  // Render star rating
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      if (rating >= index + 1) return <StarFullIcon key={index} />;
      if (rating >= index + 0.5) return <StarHalfIcon key={index} />;
      return <StarEmptyIcon key={index} />;
    });
  };

  return (
    <div className="w-fit overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Product Image with Icons */}
      <div
        className="relative h-56 w-full bg-cover bg-center transition-all duration-300 sm:h-48"
        style={{ backgroundImage: `url(${productImages[currentImage]})` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Wishlist Heart Icon */}
        <div className="absolute left-2 top-2 cursor-pointer rounded-full bg-white p-2 shadow-md transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-red-100 sm:left-3 sm:top-3 sm:p-3">
          <HeartIcon />
        </div>

        {/* Cart Icon */}
        <div className="absolute right-2 top-2 cursor-pointer rounded-full bg-white p-2 shadow-md transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-100 sm:right-3 sm:top-3 sm:p-3">
          <CartIcon />
        </div>

        {/* Arrows for image switching (only show on hover) */}
        {isHovered && (
          <>
            {/* Left Arrow */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-2 text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-opacity-80"
              onClick={prevImage}
            >
              <ChevronLeftIcon />
            </button>

            {/* Right Arrow */}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-2 text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-opacity-80"
              onClick={nextImage}
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {/* Rating & Reviews */}
      <div className="mt-3 flex items-center gap-1 px-2">
        {/* Star Rating */}
        <div className="flex items-center">{renderStars()}</div>

        {/* Number of Reviews */}
        <p className="ml-2 text-xs text-gray-600 sm:text-sm">
          ({totalReviews} reviews)
        </p>
      </div>

      {/* Product Details */}
      <div className="p-2 sm:p-4">
        <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
          Elegant Bracelet
        </h1>
        <p className="mt-1 text-xs text-gray-600 hidden md:block">
          Elegant and stylish bracelet to elevate your look.
        </p>

        {/* Price */}
        <div className="mt-2 flex items-center justify-start sm:mt-3">
          <p className="text-base font-bold text-[#1E96FC] sm:text-lg">$100</p>
        </div>
      </div>
    </div>
  );
}
