"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth(); 
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('You must be logged in to place an order.');
      router.push('/login');
      return;
    }

    if (!formData.name || !formData.email || !formData.address) {
      alert('Please fill out all shipping details.');
      return;
    }

    const orderDetails = {
      userId: user.uid,
      shippingInfo: formData,
      items: cartItems,
      total: total,
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), orderDetails);
      console.log("Order saved with ID: ", docRef.id);
      
      alert('Thank you for your order!');
      clearCart();
      router.push('/thank-you');
    } catch (error) {
      console.error("Error placing order: ", error);
      alert('There was a problem placing your order. Please try again.');
    }
  };

  if (cartItems.length === 0 && !user) {
     router.push('/');
     return null;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
          <div className="border p-4 rounded-lg">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 mt-6 rounded-lg hover:bg-gray-800 transition-colors font-bold">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

