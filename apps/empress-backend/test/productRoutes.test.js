import { describe, it, beforeEach, afterEach, expect, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "../index.js"; // Import your Express app
import Product from "../models/product.js"; // Import the Product model

describe("GET /api/admin/products", () => {
  beforeEach(async () => {
    // Clear existing products
    await Product.deleteMany();

    // Insert valid test products
    await Product.create([
      {
        name: "Product 1",
        price: 100,
        stock: 50,
        sizes: "S, M, L", // Must be a string
        description: "A great product",
        summary: "Short summary of Product 1",
        materials: "Plastic, Metal", // Must be a string
        isVisible: true, // Must be a boolean
        category: "Electronics",
      },
      {
        name: "Product 2",
        price: 200,
        stock: 30,
        sizes: "M, L",
        description: "Another great product",
        summary: "Short summary of Product 2",
        materials: "Cotton",
        isVisible: false,
        category: "Clothing",
      },
    ]);
  });

  afterEach(async () => {
    // Clean up test data
    await Product.deleteMany();
  });

  it("should return a list of products with status 200", async () => {
    const response = await request(app).get("/api/admin/products");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", 200); // Assuming `serverResponse` follows this structure
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(2);

    const firstProduct = response.body.data[0];
    expect(firstProduct).toHaveProperty("name");
    expect(firstProduct).toHaveProperty("price");
    expect(firstProduct).toHaveProperty("stock");
    expect(firstProduct).toHaveProperty("sizes");
    expect(firstProduct).toHaveProperty("description");
    expect(firstProduct).toHaveProperty("summary");
    expect(firstProduct).toHaveProperty("materials");
    expect(firstProduct).toHaveProperty("isVisible");
    expect(firstProduct).toHaveProperty("category");
  });
});


describe("GET /api/admin/product/:productId", () => {
  let productId;

  beforeEach(async () => {
    await Product.deleteMany();

    const product = await Product.create({
      name: "Sample Product",
      price: 50,
      stock: 10,
      sizes: "M, L",
      description: "A test product",
      summary: "Short summary",
      materials: "Cotton",
      isVisible: true,
      category: "Clothing",
    });

    productId = product._id.toString();
  });

  afterEach(async () => {
    await Product.deleteMany();
  });


  it("should return a single product with status 200", async () => {
    const response = await request(app).get(`/api/admin/product/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", 200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.name).toBe("Sample Product");
  });

  it("should return 404 if product is not found", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(
      `/api/admin/product/${nonExistentId}`
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("status", 404);
    expect(response.body.message).toBe("Product not found");
  });
});

