"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import Link from 'next/link';

interface Order {
  id: string;
  total: number;
  createdAt: Timestamp;
  items: Array<{
    id: number;
    title: string;
    quantity: number;
    price: number;
  }>;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, "orders"), 
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
          
          const querySnapshot = await getDocs(q);
          const userOrders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Order));
          
          setOrders(userOrders);
        } catch (err: unknown) {
          console.error("Error fetching orders:", err);
          let errorMessage = "Could not fetch orders. Please try again later.";
          
          if (typeof err === 'object' && err !== null && 'code' in err) {
            const firebaseError = err as { code: string };
            if (firebaseError.code === 'failed-precondition') {
              errorMessage = "Database index required. Check browser console for a link to create it.";
            }
          }
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="text-center p-10">Loading your orders...</div>;
  }
  
  if (error) {
    return <div className="text-center p-10 text-red-400 font-semibold">{error}</div>;
  }

  if (!user) {
    return (
      <div className="text-center p-10">
        <p>Please <Link href="/login" className="text-[var(--muted)] hover:text-[var(--text)] underline">log in</Link> to view your order history.</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
        <p>You have not placed any orders yet.</p>
        <Link href="/" className="mt-4 inline-block bg-[var(--primary)] text-[var(--text)] py-2 px-4 rounded hover:opacity-90">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Your Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-[var(--primary)] p-6 rounded-lg shadow-lg bg-[var(--surface)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-[var(--primary)] pb-2">
              <div className="mb-2 sm:mb-0">
                <p className="font-semibold text-sm text-[var(--muted)]">ORDER ID</p>
                <span className="text-[var(--text)] text-xs font-mono">{order.id}</span>
              </div>
              <div className="flex space-x-6">
                 <div>
                   <p className="font-semibold text-sm text-[var(--muted)]">DATE</p>
                   <span className="text-[var(--text)]">{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</span>
                 </div>
                 <div>
                   <p className="font-semibold text-sm text-[var(--muted)]">TOTAL</p>
                   <span className="font-bold text-lg text-[var(--text)]">${order.total.toFixed(2)}</span>
                 </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-md mb-2 text-[var(--muted)]">Items:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-[var(--text)]">
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.title} (x{item.quantity}) - ${item.price.toFixed(2)} each
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

