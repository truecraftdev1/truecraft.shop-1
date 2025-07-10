"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

interface Product {
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function SellerDashboard() {
  const router = useRouter();
  const [creatorEmail, setCreatorEmail] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [shopImage, setShopImage] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");

  const [newProduct, setNewProduct] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("creatorLoggedIn");
    const email = localStorage.getItem("currentCreatorEmail");

    if (isLoggedIn !== "true" || !email) {
      router.push("/SignIn");
    } else {
      setCreatorEmail(email);
      const storedProducts = JSON.parse(localStorage.getItem(`products_${email}`) || "[]");
      setProducts(storedProducts);
      setShopImage(localStorage.getItem(`shopImage_${email}`) || "");
      setBannerImage(localStorage.getItem(`bannerImage_${email}`) || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("creatorLoggedIn");
    localStorage.removeItem("currentCreatorEmail");
    router.push("/SignIn");
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: "product" | "shop" | "banner") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (type === "product") {
        setNewProduct({ ...newProduct, image: base64 });
      } else if (type === "shop") {
        setShopImage(base64);
        localStorage.setItem(`shopImage_${creatorEmail}`, base64);
      } else {
        setBannerImage(base64);
        localStorage.setItem(`bannerImage_${creatorEmail}`, base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProductSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!creatorEmail) return;

    const newEntry = {
      ...newProduct,
      price: parseFloat(newProduct.price),
    };

    const updated = [...products, newEntry];
    setProducts(updated);
    localStorage.setItem(`products_${creatorEmail}`, JSON.stringify(updated));

    setNewProduct({ image: "", title: "", description: "", price: "" });
  };

  const productStats = {
    count: products.length,
    fakeViews: products.length * 34 + 123,
    fakeSales: Math.floor(products.length * 0.6),
  };

  return (
    <main className="min-h-screen bg-[#fefcf9] text-[#2e2e2e] font-sans">
      <nav className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 shadow-md z-50">
        <h1 className="text-xl font-bold">TrueCraft Creator</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </nav>

      {/* Banner */}
      {bannerImage && (
        <div
          className="w-full h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        />
      )}

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-6">
          {shopImage ? (
            <img src={shopImage} alt="Shop" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
              🧵
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">Welcome, {creatorEmail?.split("@")[0]} 👋</h2>
            <p className="text-sm text-gray-600">Manage your shop below</p>
          </div>
        </div>

        {/* Upload Shop Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div>
            <label className="font-medium block mb-1">Shop Profile Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "shop")} />
          </div>
          <div>
            <label className="font-medium block mb-1">Shop Banner</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "banner")} />
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded shadow p-4 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{productStats.count}</p>
            <p className="text-sm text-gray-500">Products</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{productStats.fakeViews}</p>
            <p className="text-sm text-gray-500">Views</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{productStats.fakeSales}</p>
            <p className="text-sm text-gray-500">Fake Sales 😅</p>
          </div>
        </div>

        {/* Product Upload Form */}
        <div className="bg-white rounded shadow p-6 mb-10">
          <h3 className="text-xl font-bold mb-4">📸 Upload a New Product</h3>
          <form onSubmit={handleProductSubmit} className="grid gap-4">
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => handleImageUpload(e, "product")}
            />
            <input
              type="text"
              placeholder="Product Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <textarea
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="number"
              placeholder="Price (USD)"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2"
              required
              step="0.01"
              min="0"
            />
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Upload Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="grid gap-4">
          <h3 className="text-xl font-bold mb-2">🧺 Your Products</h3>
          {products.length === 0 ? (
            <p className="text-gray-600">No products yet. Get to uploading!</p>
          ) : (
            products.map((product, i) => (
              <div
                key={i}
                className="bg-white rounded shadow p-4 flex flex-col sm:flex-row gap-4 items-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-bold">{product.title}</h4>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
                <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>

        {/* Easter Egg 😎 */}
        <div className="mt-16 text-center text-gray-400 text-xs">
          {products.length >= 3 && "Psst... You’ve unlocked Artisan Mode 🧙‍♂️✨"}
        </div>
      </div>
    </main>
  );
}