"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../lib/useLanguage";
import { useShop } from "../store/shopStore";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const { t } = useLanguage();
  const { addListing } = useShop();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    brand: "",
    size: "",
    price: "",
    category: "clothes",
    condition: "good",
    description: "",
    image: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: typeof reader.result === "string" ? reader.result : ""
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.image) {
      alert("Please complete all required fields");
      return;
    }

    addListing({
      ...form,
      price: Number(form.price)
    });

    router.push("/my-listings");
  };

  return (
    <main>
      <Navbar />

      <section className="simple-page">
        <div className="page-actions">
          <button onClick={() => router.back()} className="pill">
            {(t as any) .back}
          </button>
        </div>

        <div className="auth-card">
          <h1 className="auth-title">Sell an Item</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="form-label">
              Title
              <input
                name="title"
                className="form-input"
                value={form.title}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Brand
              <input
                name="brand"
                className="form-input"
                value={form.brand}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Size
              <input
                name="size"
                className="form-input"
                value={form.size}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Price
              <input
                name="price"
                type="number"
                className="form-input"
                value={form.price}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Upload Image
              <input type="file" onChange={handleImageUpload} />
            </label>

            {form.image && (
              <img
                src={form.image}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                  borderRadius: "10px"
                }}
              />
            )}

            <label className="form-label">
              Description
              <textarea
                name="description"
                className="form-input textarea"
                value={form.description}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="primary-btn">
              Publish
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}