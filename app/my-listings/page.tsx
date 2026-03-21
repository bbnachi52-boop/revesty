"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useLanguage } from "../lib/useLanguage";
import { useShop } from "../store/shopStore";

export default function MyListingsPage() {
  const { t } = useLanguage();
  const { myListings, deleteListing, updateListing } = useShop();

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", price: "", description: "" });

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      price: item.price,
      description: item.description
    });
  };

  const saveEdit = (id: any) => {
    updateListing({
      id,
      ...form
    });
    setEditingId(null);
  };

  return (
    <main>
      <Navbar />

      <section className="simple-page">
        <div className="page-actions">
          <Link href="/" className="pill">{(t as any) .back}</Link>
        </div>

        <div className="page-header">
          <h1>{(t as any) .myListings}</h1>
        </div>

        {myListings.length === 0 ? (
          <div className="empty-state-card">
            No listings yet
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {myListings.map((item: any) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "20px",
                  background: "#fcf7f1",
                  border: "1px solid #eadbc8",
                  borderRadius: "20px",
                  padding: "16px"
                }}
              >
                <img
                  src={item.image}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain"
                  }}
                />

                <div>
                  {editingId === item.id ? (
                    <>
                      <input
                        className="form-input"
                        value={form.title}
                        onChange={(e) =>
                          setForm({ ...form, title: e.target.value })
                        }
                      />

                      <input
                        className="form-input"
                        value={form.price}
                        onChange={(e) =>
                          setForm({ ...form, price: e.target.value })
                        }
                      />

                      <textarea
                        className="form-input textarea"
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                      />

                      <button
                        className="primary-btn"
                        onClick={() => saveEdit(item.id)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h3>{item.title}</h3>
                      <p>${item.price}</p>
                      <p style={{ color: "#6d5650" }}>{item.description}</p>

                      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button
                          className="secondary-btn"
                          onClick={() => startEdit(item)}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="primary-btn"
                          onClick={() => {
                            if (confirm("Delete this item?")) {
                              deleteListing(item.id);
                            }
                          }}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}