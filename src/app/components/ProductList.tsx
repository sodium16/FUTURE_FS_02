    "use client";

    import { useState, useMemo } from 'react';
    import { Product } from '../types'; // Adjusted path for clarity
    import Link from 'next/link';

    export default function ProductList({ products }: { products: Product[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = useMemo(() => {
        const allCategories = products.map(p => p.category);
        return ['all', ...Array.from(new Set(allCategories))];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products
        .filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(product =>
            selectedCategory === 'all' || product.category === selectedCategory
        );
    }, [products, searchTerm, selectedCategory]);

    return (
        <div className="container mx-auto p-8">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-2 border rounded-md bg-[var(--surface)]"
            />
            <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            // THE FIX: Changed the background to white
            className="w-full md:w-auto p-2 border rounded-md bg-white text-black"
            >
            {categories.map(category => (
                <option key={category} value={category} className="capitalize">
                {category}
                </option>
            ))}
            </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
                <div className="border rounded-lg p-4 h-full flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-[var(--surface)]">
                <div>
                    <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4 rounded-md" />
                    <h2 className="text-lg font-semibold truncate text-[var(--text)]">{product.title}</h2>
                </div>
                <p className="text-xl font-bold mt-2 text-[var(--primary)]">${product.price}</p>
                </div>
            </Link>
            ))}
            {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-[var(--muted)]">No products found.</p>
            )}
        </div>
        </div>
    );
    }

