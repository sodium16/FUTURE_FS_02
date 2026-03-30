import { Product } from '@/app/types';
import ProductList from '@/app/components/ProductList';

export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Our Products</h1>
      <ProductList products={products} />
    </main>
  );
}
