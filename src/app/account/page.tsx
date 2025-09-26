"use client";

import { useEffect } from 'react'; 
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]); 

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">My Account</h1>
      <p className="text-gray-600 mb-8">Welcome back, {user.email}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Link href="/orders">
          <div className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
            <h2 className="text-xl font-bold mb-2">My Orders</h2>
            <p className="text-gray-700">View your past orders and track their status.</p>
          </div>
        </Link>

        <div className="border p-6 rounded-lg bg-gray-50 text-gray-400">
          <h2 className="text-xl font-bold mb-2">Account Details</h2>
          <p>Edit your name and password (coming soon).</p>
        </div>

        <div className="border p-6 rounded-lg bg-gray-50 text-gray-400">
          <h2 className="text-xl font-bold mb-2">Shipping Addresses</h2>
          <p>Manage your saved addresses (coming soon).</p>
        </div>

      </div>
    </div>
  );
}

