"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useShop } from "@/app/store/shopStore";
import { useLanguage } from "@/app/lib/useLanguage";

export default function FavoritesPage() {
  const { favorites, addToCart, removeFromFavorites } = useShop();
  const { language } = useLanguage();

  return (
    <main>
      <Navbar />

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "36px 24px 60px"
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px"
          }}
        >
          <h1
            style={{
              color: "#5c1d36",
              fontSize: "2.4rem",
              marginBottom: "10px"
            }}
          >
            {language === "es" ? "Favoritos" : "Favorites"}
          </h1>

          <p style={{ color: "#6d5650" }}>
            {language === "es"
              ? "Guarda lo que te gusta y vuelve cuando quieras."
              : "Save what you love and come back anytime."}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-state-card">
            <p style={{ marginBottom: "16px" }}>
              {language === "es"
                ? "Todavía no tienes artículos favoritos."
                : "You don't have favorite items yet."}
            </p>

            <Link href="/browse" className="primary-btn">
              {language === "es" ? "Explorar artículos" : "Browse items"}
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "22px"
            }}
          >
            {favorites.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                style={{
                  background: "#fcf7f1",
                  border: "1px solid #eadbc8",
                  borderRadius: "24px",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "320px 1fr",
                  gap: "0"
                }}
              >
                <Link
                  href={`/product/${item.id}`}
                  style={{
                    background: "#f8efe3",
                    minHeight: "260px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "18px"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "contain",
                      borderRadius: "16px"
                    }}
                  />
                </Link>

                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "8px",
                      fontSize: "1.5rem",
                      color: "#2f1e1e"
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color: "#6d5650",
                      marginBottom: "8px"
                    }}
                  >
                    {item.brand}
                  </p>

                  <strong
                    style={{
                      color: "#5c1d36",
                      fontSize: "1.2rem",
                      marginBottom: "16px"
                    }}
                  >
                    ${item.price}
                  </strong>

                  <div
                    style={{
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
                      {language === "es" ? "Mover al carrito" : "Move to cart"}
                    </button>

                    <Link
                      href="/checkout"
                      className="primary-btn"
                      onClick={() => addToCart(item)}
                      style={{ padding: "10px 16px" }}
                    >
                      {language === "es" ? "Comprar ahora" : "Buy now"}
                    </Link>

                    <button
                      type="button"
                      className="pill"
                      onClick={() => removeFromFavorites(index)}
                    >
                      {language === "es" ? "Eliminar" : "Remove"}
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