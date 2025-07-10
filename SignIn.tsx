"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "admin@truecraft.com";
  const ADMIN_PASS = "salty74D!";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Admin login check
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
      return;
    }

    // Creator login check
    const creators = JSON.parse(localStorage.getItem("creators") || "[]");
    const creator = creators.find(
      (c: { email: string; password: string }) =>
        c.email === email && c.password === password
    );

    if (creator) {
      // Save login session
      localStorage.setItem("creatorLoggedIn", "true");
      localStorage.setItem("currentCreatorEmail", creator.email);
      router.push("/seller-dashboard");
      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <main className="bg-[#fefcf9] min-h-screen px-6 py-12 text-[#2e2e2e] font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded p-6 space-y-4"
      >
        {error && <p className="text-red-600 text-center">{error}</p>}

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            autoComplete="email"
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
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition w-full"
        >
          Sign In
        </button>

        <a
          href="/"
          className="block mt-4 text-blue-600 text-center hover:underline"
        >
          ← Back to Home
        </a>
      </form>
    </main>
  );
}