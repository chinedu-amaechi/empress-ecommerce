// src/app/auth/sign-up/page.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Heading from "@/components/ui/heading";
import toast from "react-hot-toast";
import { postSignUp } from "@/lib/auth-services";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

// Import the bracelet viewer with dynamic loading (no SSR)
const BraceletViewer = dynamic(
  () => import("@/components/3d/bracelet-viewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#11296B]/20 border-t-[#11296B] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading 3D model...</p>
        </div>
      </div>
    ),
  }
);

const provinces = [
  { name: "Alberta", abbr: "AB" },
  { name: "British Columbia", abbr: "BC" },
  { name: "Manitoba", abbr: "MB" },
  { name: "New Brunswick", abbr: "NB" },
  { name: "Newfoundland and Labrador", abbr: "NL" },
  { name: "Nova Scotia", abbr: "NS" },
  { name: "Ontario", abbr: "ON" },
  { name: "Prince Edward Island", abbr: "PE" },
  { name: "Quebec", abbr: "QC" },
  { name: "Saskatchewan", abbr: "SK" },
  { name: "Northwest Territories", abbr: "NT" },
  { name: "Nunavut", abbr: "NU" },
  { name: "Yukon", abbr: "YT" },
];

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [passwordFocus, setPasswordFocus] = useState(false);
  const modelRef = useRef(null);

  async function onSubmit(data) {
    try {
      const response = await postSignUp({ ...data, country: "Canada" });

      if (response.status === 201) {
        toast.success(response.message);
        reset();
        router.push("/auth/sign-in");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred during sign up");
      console.error(error);
    }
  }

  const password = watch("password");

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex">
      <div className="flex flex-col md:flex-row w-full">
        {/* 3D Bracelet Viewer Section - Left Side (50% width) */}
        <div className="md:w-1/2 h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="w-full h-full max-h-screen">
            <BraceletViewer />
          </div>
        </div>

        {/* Form Section - Right Side (50% width) */}
        <div className="md:w-1/2 bg-white flex items-center justify-center overflow-y-auto h-screen">
          <div className="w-full max-w-xl py-10 px-8 lg:px-12">
            <div className="mb-8">
              <Heading
                level={1}
                className="text-3xl font-light text-[#11296B] mb-2"
              >
                Create an Account
              </Heading>
              <div className="w-16 h-px bg-[#11296B]/30 my-4"></div>
              <p className="text-gray-600">
                Join Empress to enjoy personalized shopping experiences, save
                your favorite pieces, and access exclusive content and offers.
              </p>
            </div>

            {/* Error Messages at the Top */}
            {Object.keys(errors).length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                <h3 className="text-sm font-medium mb-2">
                  Please correct the following:
                </h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-2 border rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
                {passwordFocus && (
                  <div className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters long
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="First Name"
                    className={`w-full px-4 py-2 border rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Last Name"
                    className={`w-full px-4 py-2 border rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Please enter a 10-digit phone number",
                    },
                  })}
                  placeholder="Phone Number"
                  className={`w-full px-4 py-2 border rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mt-2">
                <h3 className="text-base font-medium text-gray-900 mb-3">
                  Address Information
                </h3>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  {...register("street")}
                  placeholder="Street Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                  placeholder="City"
                  className={`w-full px-4 py-2 border rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Province & Postal Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("province", {
                      required: "Province is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all appearance-none ${
                      errors.province ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select</option>
                    {provinces.map((province) => (
                      <option key={province.abbr} value={province.abbr}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  {errors.province && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.province.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("postalCode", {
                      required: "Postal code is required",
                      pattern: {
                        value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                        message: "Please enter a valid Canadian postal code",
                      },
                    })}
                    placeholder="A1A 1A1"
                    className={`w-full px-4 py-2 border rounded-none focus:ring-1 focus:ring-[#11296B] outline-none transition-all ${
                      errors.postalCode ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Privacy Policy */}
              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      {...register("terms", {
                        required:
                          "You must agree to the terms and privacy policy",
                      })}
                      className="h-4 w-4 text-[#11296B] border-gray-300 rounded focus:ring-[#11296B]"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-600">
                      I agree to the{" "}
                      <a href="#" className="text-[#11296B] underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#11296B] underline">
                        Privacy Policy
                      </a>
                    </label>
                    {errors.terms && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.terms.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-[#11296B] hover:bg-[#1E96FC] text-white font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#11296B] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              {/* Sign In Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/auth/sign-in"
                    className="text-[#11296B] hover:text-[#1E96FC] font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
