import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const featuredCreators = [
    {
      name: "Willow Works",
      tagline: "Handwoven textiles from Portland",
      image: "https://images.unsplash.com/photo-1608229328735-77591f9dc349",
    },
    {
      name: "Crafted Clay",
      tagline: "Small-batch ceramics, beautifully imperfect",
      image: "https://images.unsplash.com/photo-1602232490023-6556f4659d5e",
    },
    {
      name: "Forge & Timber",
      tagline: "Custom wood and iron pieces",
      image: "https://images.unsplash.com/photo-1582582494700-11e6abfc58d8",
    },
  ];

  const categories = [
    "Jewelry",
    "Pottery",
    "Woodwork",
    "Textiles",
    "Painting",
    "Glass Art",
    "Accessories",
    "Home Decor",
  ];

  return (
    <main className="bg-[#fff8f3] min-h-screen text-[#2e2e2e] font-sans">
      {/* Top Banner */}
      <div className="bg-[#ff7043] text-white text-sm text-center py-2">
        Support small creators. Handmade. Real people. Real craft.
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-[#ffdab9] shadow-md sticky top-0 z-50">
        {/* Left: Dropdown + Logo */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-xl font-bold bg-white text-[#2e2e2e] px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              ☰
            </button>
            {menuOpen && (
              <ul className="absolute top-12 left-0 bg-white border rounded shadow-lg z-50 text-sm py-2 w-48">
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/">🏠 Home</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/marketplace">🛍️ Shop</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/sell">🛠️ Sell on TrueCraft</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/faq">❓ FAQ</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">📬 Contact</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">👤 About</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/SignIn">🔐 Sign In</Link>
                </li>
              </ul>
            )}
          </div>

          <h1 className="text-xl font-bold text-[#2e2e2e] whitespace-nowrap">
            TrueCraft
          </h1>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-grow px-4 hidden md:block">
          <input
            type="text"
            placeholder="Search handmade goods..."
            className="w-full px-5 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-[#ff7043]"
          />
        </div>

        {/* Right: Sign In Button */}
        <div className="ml-4">
          <Link href="/SignIn">
            <button className="bg-[#2e2e2e] text-white px-4 py-2 rounded hover:bg-[#1a1a1a] transition">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-[#ffeadb] to-[#fff8f3] flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-4 text-[#2e2e2e]">
          Handmade, Not Mass-Made
        </h1>
        <p className="text-lg text-gray-700 max-w-xl">
          Support independent artists & creators with unique pieces crafted by hand.
        </p>
        <Link href="/marketplace">
          <button className="mt-8 bg-[#007bff] hover:bg-[#005fc1] text-white py-3 px-8 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            🛍️ Shop Now
          </button>
        </Link>
      </section>

      {/* Categories */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Explore Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <span
              key={i}
              className="bg-[#ffe0b3] text-[#333] px-4 py-2 rounded-full text-sm shadow hover:bg-[#ffcb91] transition"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Creators */}
      <section className="bg-[#fff0e6] px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">✨ Featured Creators</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredCreators.map((creator, i) => (
            <div
              key={i}
              className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full"
            >
              <img
                src={creator.image}
                alt={creator.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold">{creator.name}</h3>
                  <p className="text-sm text-gray-600">{creator.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 px-6 bg-[#ffeede]">
        <h2 className="text-3xl font-bold mb-4">Are You a Creator?</h2>
        <p className="text-gray-700 mb-6">
          Join TrueCraft to sell your handmade goods and reach customers who value authenticity.
        </p>
        <Link href="/sell">
          <button className="bg-[#2e2e2e] text-white px-6 py-3 rounded-full hover:bg-[#1a1a1a] transition-transform transform hover:scale-105">
            ✨ Sell on TrueCraft
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#2e2e2e] text-white text-center py-6 mt-12">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TrueCraft. All rights reserved.
        </p>
      </footer>
    </main>
  );
}