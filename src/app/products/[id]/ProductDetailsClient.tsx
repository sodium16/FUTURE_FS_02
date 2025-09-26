// app/products/[id]/ProductDetailsClient.tsx
"use client"; // This directive marks it as a Client Component

import { useCart } from "@/context/CartContext";
import { Product } from "@/app/types";

export default function ProductDetailsClient({ product }: { product: Product }) {
  const { addToCart } = useCart(); // Use our custom hook

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      <span className="text-lg font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit mb-4 capitalize">
        {product.category}
      </span>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <div className="text-5xl font-extrabold mb-8">${product.price}</div>
      
      {/* This button now calls the addToCart function from our context */}
      <button
        onClick={() => {
          addToCart(product);
          alert(`${product.title} added to cart!`); // Optional: give user feedback
        }}
        className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors w-full md:w-auto"
      >
        Add to Cart
      </button>
    </div>
  );
}