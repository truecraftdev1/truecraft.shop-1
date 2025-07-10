import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type SellerData = {
  id: string;
  name: string;
  email: string;
  products: { id: string; name: string; price: number }[];
};

// Mock function to fetch seller data — replace with real API call later
const fetchSellerData = async (sellerId: string): Promise<SellerData | null> => {
  // Dummy data
  const dummySellers: Record<string, SellerData> = {
    seller1: {
      id: "seller1",
      name: "Alice",
      email: "seller1@example.com",
      products: [
        { id: "p1", name: "Handmade Necklace", price: 29.99 },
        { id: "p2", name: "Custom Mug", price: 15.5 }
      ]
    },
    seller2: {
      id: "seller2",
      name: "Bob",
      email: "seller2@example.com",
      products: [
        { id: "p3", name: "Knitted Scarf", price: 45 },
        { id: "p4", name: "Wooden Bowl", price: 60 }
      ]
    }
  };

  return dummySellers[sellerId] || null;
};

export default function SellerDashboard() {
  const router = useRouter();
  const { sellerId } = router.query;
  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof sellerId === "string") {
      fetchSellerData(sellerId).then((data) => {
        setSellerData(data);
        setLoading(false);
      });
    }
  }, [sellerId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!sellerData) return <p className="text-center mt-10">Seller not found.</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">Welcome, {sellerData.name}!</h1>
      <p className="mb-6 text-gray-700">Email: {sellerData.email}</p>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Your Products</h2>
        {sellerData.products.length === 0 ? (
          <p>You have no products listed yet.</p>
        ) : (
          <ul className="space-y-3">
            {sellerData.products.map((product) => (
              <li key={product.id} className="border rounded p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{product.name}</span>
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}