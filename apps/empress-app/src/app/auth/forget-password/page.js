// src/app/auth/forget-password/page.js
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Link from "next/link";
import React from "react";

function ForgetPassword() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <Heading level={2} className="text-center">
          Forgot Password
        </Heading>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] focus:border-transparent outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <Button>Send Reset Link</Button>
        </form>

        <div className="mt-10 ml-10 mr-10 border-t border-gray-300"></div>

        <div className="mt-2 text-center text-sm text-gray-600 flex justify-center items-center gap-1">
          <p>Remembered your password?</p>
          <span className="text-[#11296B] hover:text-[#1E96FC] font-semibold">
            <Link href="/auth/sign-in">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
