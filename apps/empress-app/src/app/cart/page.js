"use client";

import Navbar from "@/components/ui/navbar";
import { useCartContext } from "../contexts/cart-context";
import CartItem from "./cart-item";

function CartPage() {
  const { cart, setCart } = useCartContext();

  console.log(cart);

  return (
    <>
      <Navbar />
      <div className="">
        <h1>Cart Page</h1>

        {cart.map((product) => (
          <CartItem key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

export default CartPage;
