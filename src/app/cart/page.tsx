// app/cart/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  // These functions don't exist yet, we'll add them in the next step!
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-20">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-b pb-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <Image src={item.image} alt={item.title} width={100} height={100} className="object-contain mr-4" />
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold">-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold">+</button>
                  </div>
                  <p className="font-bold text-lg w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-bold text-2xl">
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="block w-full">
            <button className="w-full bg-black text-white py-3 mt-6 rounded-lg hover:bg-gray-800 transition-colors">
              Proceed to Checkout
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}