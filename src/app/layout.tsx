import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "../context/CartContext";
import Header from "./components/Header";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My E-Commerce Store",
  description: "Built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            {/* The CSS in globals.css will now correctly handle this main element */}
            <main>
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

