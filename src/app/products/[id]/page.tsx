import { Product } from '@/app/types';
import ProductDetailsClient from './ProductDetailsClient'; 

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <main className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* The non-interactive image part stays here */}
        <div className="p-4 border rounded-lg">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-auto max-h-[500px] object-contain" 
          />
        </div>
        
        <ProductDetailsClient product={product} />
      </div>
    </main>
  );
}