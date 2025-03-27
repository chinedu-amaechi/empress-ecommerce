function CartItem({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
}

export default CartItem;
