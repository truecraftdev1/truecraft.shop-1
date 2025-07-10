"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function Sell() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const readers = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((base64Images) => {
      setImages(base64Images);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pending = JSON.parse(localStorage.getItem("pendingCreators") || "[]");
    const token = uuidv4();

    pending.push({
      name,
      email,
      about,
      token,
      images,
    });

    localStorage.setItem("pendingCreators", JSON.stringify(pending));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#fefcf9] flex items-center justify-center font-sans px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Thanks for applying!</h2>
          <p className="text-gray-700 mb-4">We’ll review your application and get back to you soon.</p>
          <Link href="/">
            <button className="text-sm text-blue-600 underline hover:text-blue-800">
              ← Back to Home
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fefcf9] font-sans px-6 py-12 text-[#2e2e2e]">
      <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
        <div className="mb-4">
          <Link href="/">
            <button className="text-sm text-blue-600 underline hover:text-blue-800">
              ← Back to Home
            </button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4">Sell on TrueCraft</h1>
        <p className="mb-6 text-sm text-gray-600">Submit your application to become a TrueCraft creator.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tell us about your craft</label>
            <textarea
              required
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload photos of your work</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((img, i) => (
                  <img key={i} src={img} alt={`Upload ${i + 1}`} className="w-20 h-20 object-cover rounded" />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition w-full"
          >
            Submit Application
          </button>
        </form>
      </div>
    </main>
  );
}