"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getClientAuth } from '../../../lib/firebase';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    try {
      const auth = getClientAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/'); 
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('auth/email-already-in-use')) {
          setError('This email address is already in use.');
        } else if (err.message.includes('auth/invalid-email')) {
            setError('Please enter a valid email address.');
        } else {
          setError('Failed to create an account. Please try again.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
      console.error("Sign Up Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[var(--prussian-blue)] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[var(--foreground)]">
          Create an Account
        </h1>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--french-gray)]"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-[var(--foreground)] bg-[var(--rich-black)] border border-[var(--charcoal)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--charcoal)]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--french-gray)]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-[var(--foreground)] bg-[var(--rich-black)] border border-[var(--charcoal)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--charcoal)]"
            />
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-[var(--isabelline)] bg-[var(--charcoal)] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--prussian-blue)] focus:ring-[var(--charcoal)]"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-[var(--french-gray)]">
          Already have an account?{' '}
          <Link href="/login" className="font-medium hover:underline text-[var(--isabelline)]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

