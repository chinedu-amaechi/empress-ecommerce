// src/app/auth/sign-up/page.js
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Heading from "@/components/ui/heading";
import Button from "@/components/ui/button";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postcode: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
    if (name === "password") {
      setPasswordMatch(formData.confirmPassword === value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordMatch) return;
    // TODO: Implement form submission with proper error handling
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <Heading level={2} className="text-center">
          Sign Up
        </Heading>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
          />
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
          />
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all ${
              passwordMatch ? "border-gray-300" : "border-red-500"
            }`}
          />
          {!passwordMatch && (
            <p className="text-red-500 text-xs">Passwords do not match</p>
          )}
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
            />
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
            />
          </div>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
            />
            <input
              type="text"
              name="province"
              required
              value={formData.province}
              onChange={handleChange}
              placeholder="Province"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
            />
            <input
              type="text"
              name="postcode"
              required
              value={formData.postcode}
              onChange={handleChange}
              placeholder="Postcode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] outline-none transition-all"
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
