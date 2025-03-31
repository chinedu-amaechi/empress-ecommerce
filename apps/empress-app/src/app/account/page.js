"use client";

import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/auth-context";
import { useEffect } from "react";

export default function AccountPage() {
  const { user, setUser } = useAuthContext();
  console.log("user", user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.firstName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      province: user?.address?.province || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.firstName || "",
        email: user.email || "",
        phone: user.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        province: user.address?.province || "",
      });
    }
  }, [user]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">johndoe@example.com</p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              {...register("phone", { required: "Phone is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}

            <label className="block text-gray-700">Street</label>
            <input
              type="text"
              {...register("street", { required: "Street is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street.message}</p>
            )}

            <label className="block text-gray-700">City</label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}

            <label className="block text-gray-700">Province</label>
            <input
              type="text"
              {...register("province", { required: "Province is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.province && (
              <p className="text-red-500 text-sm">{errors.province.message}</p>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
