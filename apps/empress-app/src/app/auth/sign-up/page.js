// src/app/auth/sign-up/page.js
"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Heading from "@/components/ui/heading";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";
import { postSignUp } from "@/lib/auth-services";
import { useRouter } from "next/navigation";

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
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    const response = await postSignUp({ ...data, country: "Canada" });

    if (response.status === 201) {
      toast.success(response.message);
      reset();
      router.push("/auth/sign-in");
    } else {
      toast.error(response.message);
    }
  }

  const password = watch("password");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <Heading level={2} className="text-center">
          Sign Up
        </Heading>

        {/* Error Messages at the Top */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-4 bg-red-100 border border-red-500 text-red-700 rounded-lg">
            <ul className="list-disc pl-5">
              {Object.values(errors).map((error, index) => (
                <li key={index} className="text-sm">
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="your@email.com"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />

          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="••••••••"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />

          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="••••••••"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />

          <div className="flex space-x-4">
            <input
              type="text"
              {...register("firstName", { required: "First Name is required" })}
              placeholder="First Name"
              className={`w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />

            <input
              type="text"
              {...register("lastName", { required: "Last Name is required" })}
              placeholder="Last Name"
              className={`w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <input
            type="tel"
            {...register("phone", {
              required: "Phone Number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            placeholder="Phone Number"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />

          <input
            type="text"
            {...register("street")}
            placeholder="Street Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
          />

          <div className="flex space-x-4">
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              placeholder="City"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />

            <select
              {...register("province", { required: "Province is required" })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
                errors.province ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Province</option>
              {provinces.map((province) => (
                <option key={province.abbr} value={province.abbr}>
                  {province.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              {...register("postalCode", {
                required: "Postcode is required",
                pattern: {
                  value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                  message: "Invalid Canadian postal code",
                },
              })}
              placeholder="Postcode"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
                errors.postcode ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <Button type="submit">Create Account</Button>
        </form>
        <div className="mt-10 border-t border-gray-300"></div>
        <div className="mt-2 text-center text-sm text-gray-600 flex justify-center items-center gap-1">
          <p>Already have an account?</p>
          <span className="text-[#11296B] hover:text-[#1E96FC] font-semibold">
            <Link href="/auth/sign-in">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
