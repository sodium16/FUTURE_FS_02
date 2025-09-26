"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getClientAuth } from '../../../lib/firebase';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const auth = getClientAuth();
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to homepage on successful login
    } catch (err) {
      // Type check the error
      if (err instanceof Error) {
        if (err.message.includes('auth/invalid-credential')) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError('Failed to log in. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[var(--prussian-blue)] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[var(--foreground)]">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
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
              autoComplete="current-password"
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
              Log In
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-[var(--french-gray)]">
          Do not have an account?{' '}
          <Link href="/signup" className="font-medium hover:underline text-[var(--isabelline)]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

