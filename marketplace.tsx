"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Creator {
  name: string;
  email: string;
  password: string;
  productImages?: string[];
}

export default function Marketplace() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("creators") || "[]");
    setCreators(data);
  }, []);

  return (
    <main className="bg-[#fefcf9] min-h-screen text-[#2e2e2e] font-sans">
      {/* Header */}
      <header className="bg-black text-white py-6 px-4 text-center shadow-md sticky top-0 z-50">
        <h1 className="text-3xl font-bold">🛍️ TrueCraft Marketplace</h1>
        <p className="mt-2 text-sm">Explore handmade creations from real artists.</p>
        <Link
          href="/"
          className="inline-block mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Product Grid */}
      <section className="p-6 max-w-6xl mx-auto">
        {creators.filter(c => Array.isArray(c.productImages) && c.productImages.length > 0).length === 0 ? (
          <p className="text-center text-gray-600 mt-20">No products available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {creators
              .filter((c) => Array.isArray(c.productImages) && c.productImages.length > 0)
              .map((creator, i) =>
                creator.productImages!.map((img, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="bg-white shadow border rounded p-4 flex flex-col items-center"
                  >
                    <img
                      src={img}
                      alt={`Product by ${creator.name}`}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                    <h3 className="text-lg font-bold mb-1">{creator.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{creator.email}</p>
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                      ${Math.floor(Math.random() * 50 + 10)}
                    </span>
                  </div>
                ))
              )}
          </div>
        )}
      </section>
    </main>
  );
}