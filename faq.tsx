// Faq.tsx
import React, { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "How do I sell on TrueCraft?",
    answer:
      "Create an account, fill out the seller form, and submit your products for approval."
  },
  {
    question: "Are there any dropshippers allowed?",
    answer:
      "No. TrueCraft focuses on authentic creators only, no dropshipping."
  },
  {
    question: "How do I contact support?",
    answer:
      "You can email support@truecraft.com or use the contact form on the Contact page."
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Currently, we accept credit cards and PayPal payments."
  }
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "3rem auto",
        padding: "1rem 2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222"
      }}
    >
      {/* Back Home Button */}
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/" legacyBehavior>
          <a
            style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              backgroundColor: "#4A90E2",
              color: "#fff",
              borderRadius: "6px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "background-color 0.3s ease",
              userSelect: "none"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#357ABD")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4A90E2")}
          >
            ← Back Home
          </a>
        </Link>
      </div>

      <h1 style={{ textAlign: "center", marginBottom: "2rem", fontWeight: "700", fontSize: "2.5rem" }}>
        Frequently Asked Questions
      </h1>

      {faqs.map(({ question, answer }, index) => (
        <div
          key={index}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "1rem 0",
            cursor: "pointer"
          }}
          onClick={() => toggleIndex(index)}
          aria-expanded={activeIndex === index}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if(e.key === "Enter") toggleIndex(index)}}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "600",
              fontSize: "1.15rem"
            }}
          >
            {question}
            <span
              style={{
                fontSize: "1.5rem",
                transform: activeIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease"
              }}
            >
              +
            </span>
          </div>

          {activeIndex === index && (
            <p style={{ marginTop: "0.75rem", lineHeight: "1.5", color: "#555" }}>{answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}