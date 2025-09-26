"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { getClientAuth } from "../../../lib/firebase"; // Corrected relative path
import { signOut } from "firebase/auth";

export default function Header() {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    try {
      const auth = getClientAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    // THE FIX: Removed sticky, top-0, and z-10 classes from here
    <header className="bg-[var(--surface)] shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[var(--text)] hover:text-[var(--muted)]">
          FutureInterns Store
        </Link>
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/account" className="hover:text-[var(--muted)]">
                My Account
              </Link>
              <button onClick={handleLogout} className="hover:text-[var(--muted)] font-bold">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-[var(--muted)]">
              Login
            </Link>
          )}

          <Link href="/cart" className="relative block w-8 h-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-[var(--text)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

