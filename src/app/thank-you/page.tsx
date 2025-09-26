import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 md:p-20 min-h-[60vh]">
      <h1 className="text-5xl font-bold mb-4">🎉 Thank You! 🎉</h1>
      <p className="text-xl text-gray-700 mb-8">Your order has been placed successfully.</p>
      <Link 
        href="/" 
        className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
