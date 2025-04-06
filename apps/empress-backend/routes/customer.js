// 3rd party modules
import express from "express";

// Custom modules
import * as customerControllers from "../controllers/customer.js";

/*
 * The express.Router class can be used to create modular, mountable route handlers.
 */
const router = express.Router();

// route to add a product to the cart
router.post("/cart", customerControllers.addToCart);

// route to update a product in the cart
router.put("/cart/:productId", customerControllers.updateCart);

// route to get all products in the cart
router.get("/cart", customerControllers.getCart);

// route to remove a product from the cart
router.delete("/cart/:productId", customerControllers.removeFromCart);

export default router;
