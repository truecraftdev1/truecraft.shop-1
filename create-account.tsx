"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreateAccount() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [creator, setCreator] = useState<{ name: string; email: string } | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]);

  useEffect(() => {
    if (!router.isReady) return;

    const queryToken = router.query.token as string;
    setToken(queryToken);

    const pending = JSON.parse(localStorage.getItem("pendingCreators") || "[]");
    const match = pending.find((c: any) => c.token === queryToken);

    if (match) {
      setCreator({ name: match.name, email: match.email });
    } else {
      setError("Invalid or expired invite link.");
    }
  }, [router.isReady, router.query.token]);

  const handleProductImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const readers = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((base64Images) => {
      setProductImages(base64Images);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creator) return;

    const creators = JSON.parse(localStorage.getItem("creators") || "[]");

    const exists = creators.find((c: any) => c.email === creator.email);
    if (exists) {
      setError("This account has already been created.");
      return;
    }

    creators.push({
      name: creator.name,
      email: creator.email,
      password,
      productImages,
    });

    localStorage.setItem("creators", JSON.stringify(creators));

    // Remove the token from pendingCreators
    const pending = JSON.parse(localStorage.getItem("pendingCreators") || "[]");
    const updatedPending = pending.filter((c: any) => c.token !== token);
    localStorage.setItem("pendingCreators", JSON.stringify(updatedPending));

    localStorage.setItem("creatorLoggedIn", "true");
    localStorage.setItem("currentCreatorEmail", creator.email);
    router.push("/seller-dashboard");
  };

  if (error) {
    return (
      <main className="min-h-screen bg-[#fefcf9] flex items-center justify-center text-red-600 font-sans px-6">
        <p className="text-xl font-bold">{error}</p>
      </main>
    );
  }

  if (!creator) {
    return (
      <main className="min-h-screen bg-[#fefcf9] flex items-center justify-center text-[#2e2e2e] font-sans px-6">
        <p className="text-xl font-medium">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fefcf9] font-sans px-6 py-12 text-[#2e2e2e]">
      <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Create Your TrueCraft Account</h1>
        <p className="mb-4">Welcome, {creator.name}! Set a password and upload photos of your creations to finish registration.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={creator.email}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Photos of Your Work</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleProductImagesChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {productImages.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {productImages.map((img, i) => (
                  <img key={i} src={img} alt={`Product ${i + 1}`} className="w-20 h-20 object-cover rounded" />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition w-full"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}