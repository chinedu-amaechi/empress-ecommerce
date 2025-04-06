// importing 3rd party libraries
import Product from "../models/product.js";
import Customer from "../models/customer.js";
import serverResponse from "../utils/serverResponse.js";

export async function addToCart(req, res, next) {
  try {
    if (req.user?.role !== "customer") {
      return serverResponse(res, 401, "Unauthorized access", null);
    }

    const customerId = req.user.id;
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId || !quantity) {
      return serverResponse(
        res,
        400,
        "Product ID and quantity are required",
        null
      );
    }
    // Check if the product exists
    const productExists = await Product.findById(productId);

    if (!productExists) {
      return serverResponse(res, 404, "Product not found", null);
    }

    // Check if the product is available in stock
    if (productExists.stock < quantity) {
      return serverResponse(res, 400, "Insufficient stock available", null);
    }

    // Check if the product is already in the cart
    const customerExists = await Customer.findById(customerId);

    if (!customerExists) {
      return serverResponse(res, 404, "Customer not found", null);
    }

    const productInCart = customerExists.cart.find(
      (item) => item.productId.toString() === productId.toString()
    );

    console.log(productInCart);

    if (!productInCart) {
      // If the product is not in the cart, add it
      customerExists.cart.push({ productId, quantity });
    } else {
      // If the product is already in the cart, update the quantity
      productInCart.quantity += quantity;
    }

    // Save the updated customer document
    await customerExists.save();

    return serverResponse(
      res,
      200,
      "Product added to cart successfully",
      customerExists.cart
    );
  } catch (error) {
    next(error);
  }
}

export async function getCart(req, res, next) {
  try {
    if (req.user?.role !== "customer") {
      return serverResponse(res, 401, "Unauthorized access", null);
    }

    const customerId = req.user.id;

    // Find the customer and populate the cart with product details
    const customer = await Customer.findById(customerId).populate(
      "cart.productId"
    );

    if (!customer) {
      return serverResponse(res, 404, "Customer not found", null);
    }

    const cartWithProductDetails = customer.cart.map((item) => {
      return { ...item.productId._doc, quantity: item.quantity };
    });

    return serverResponse(
      res,
      200,
      "Cart retrieved successfully",
      cartWithProductDetails
    );
  } catch (error) {
    next(error);
  }
}

export async function updateCart(req, res, next) {
    try {
        if (req.user?.role !== "customer") {
            return serverResponse(res, 401, "Unauthorized access", null);
        }

        const customerId = req.user.id;
        const productId = req.params.productId;
        const { quantity, operation = "add" } = req.body;

        // Validate input
        if (!productId || !quantity || !operation) {
            return serverResponse(
                res,
                400,
                "Product ID, quantity, and operation are required",
                null
            );
        }

        if (!["add", "subtract"].includes(operation)) {
            return serverResponse(
                res,
                400,
                "Invalid operation. Use 'add' or 'subtract'.",
                null
            );
        }

        // Find the customer and update the cart
        const customer = await Customer.findById(customerId);

        if (!customer) {
            return serverResponse(res, 404, "Customer not found", null);
        }

        const productInCart = customer.cart.find(
            (item) => item.productId.toString() === productId.toString()
        );

        if (!productInCart) {
            return serverResponse(res, 404, "Product not found in cart", null);
        }

        if (operation === "add") {
            productInCart.quantity += quantity;
        } else if (operation === "subtract") {
            productInCart.quantity -= quantity;
            if (productInCart.quantity <= 0) {
                customer.cart = customer.cart.filter(
                    (item) => item.productId.toString() !== productId.toString()
                );
            }
        }

        // Save the updated customer document
        await customer.save();

        return serverResponse(res, 200, "Cart updated successfully", customer.cart);
    } catch (error) {
        next(error);
    }
}

export async function removeFromCart(req, res, next) {
  try {
    if (req.user?.role !== "customer") {
      return serverResponse(res, 401, "Unauthorized access", null);
    }

    const customerId = req.user.id;
    const productId = req.params.productId;

    // Validate input
    if (!productId) {
      return serverResponse(res, 400, "Product ID is required", null);
    }

    // Find the customer and remove the product from the cart
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return serverResponse(res, 404, "Customer not found", null);
    }

    customer.cart = customer.cart.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    // Save the updated customer document
    await customer.save();

    return serverResponse(
      res,
      200,
      "Product removed from cart successfully",
      customer.cart
    );
  } catch (error) {
    next(error);
  }
}
