"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useLanguage } from "@/app/lib/useLanguage";
import { useShop } from "@/app/store/shopStore";

export default function BrowsePage() {
  const { language, t } = useLanguage();
  const { products, addToCart, addToFavorites } = useShop();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    return products.filter((item: any) => {
      const matchesSearch =
        !q ||
        `${item.title || ""} ${item.brand || ""} ${item.description || ""} ${item.category || ""}`
          .toLowerCase()
          .includes(q);

      const matchesCategory =
        selectedCategory === "all" ||
        String(item.category || "").toLowerCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const categoryCards = [
    {
      key: "all",
      label: language === "es" ? "Todo" : "All"
    },
    {
      key: "clothes",
      label: language === "es" ? "Ropa" : "Clothes"
    },
    {
      key: "shoes",
      label: language === "es" ? "Zapatos" : "Shoes"
    },
    {
      key: "bags",
      label: language === "es" ? "Bolsos" : "Bags"
    },
    {
      key: "accessories",
      label: language === "es" ? "Accesorios" : "Accessories"
    }
  ];

  return (
    <main>
      <Navbar search={search} setSearch={setSearch} />

      <section className="page-header">
        <h1
          style={{
            color: "#5c1d36",
            fontSize: "2.3rem",
            marginBottom: "10px"
          }}
        >
          {language === "es" ? "Explorar artículos" : "Browse Items"}
        </h1>

        <p
          style={{
            color: "#6d5650",
            marginBottom: "22px"
          }}
        >
          {language === "es"
            ? "Descubre piezas de moda que te encantarán."
            : "Discover fashion pieces you'll love."}
        </p>

        <div className="category-pills">
          {categoryCards.map((category) => (
            <button
              key={category.key}
              type="button"
              className={
                selectedCategory === category.key ? "pill pill-dark" : "pill"
              }
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="products-section">
        {filteredProducts.length === 0 ? (
          <div className="empty-state-card">
            <p style={{ marginBottom: "16px" }}>
              {language === "es"
                ? "No encontramos artículos con esos filtros."
                : "We couldn't find items with those filters."}
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
            >
              {language === "es" ? "Limpiar filtros" : "Clear filters"}
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((item: any) => (
              <div key={item.id} className="product-card">
                <Link href={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="product-image"
                  />
                </Link>

                <div className="product-info">
                  <h3 style={{ marginBottom: "6px" }}>{item.title}</h3>

                  <p style={{ color: "#6d5650", marginBottom: "6px" }}>
                    {item.brand}
                  </p>

                  <strong style={{ color: "#5c1d36" }}>${item.price}</strong>

                  <div
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap"
                    }}
                  >
                    <Link href={`/product/${item.id}`} className="pill">
                      {language === "es" ? "Ver" : "View"}
                    </Link>

                    <button
                      type="button"
                      className="pill pill-dark"
                      onClick={() => addToCart(item)}
                    >
                      {language === "es" ? "Agregar al carrito" : "Add to cart"}
                    </button>

                    <button
                      type="button"
                      className="pill"
                      onClick={() => addToFavorites(item)}
                    >
                      {language === "es" ? "Guardar" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}