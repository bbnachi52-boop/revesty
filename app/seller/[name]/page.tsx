"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { useShop } from "@/app/store/shopStore";
import { useLanguage } from "@/app/lib/useLanguage";

export default function SellerPage() {
  const { name } = useParams();
  const { products } = useShop();
  const { language } = useLanguage();

  const sellerName = decodeURIComponent(String(name || ""));

  const sellerProducts = useMemo(() => {
    return products.filter(
      (item: any) => String(item.seller || "").toLowerCase() === sellerName.toLowerCase()
    );
  }, [products, sellerName]);

  const totalListings = sellerProducts.length;

  const categories = useMemo(() => {
    const set = new Set(
      sellerProducts
        .map((item: any) => String(item.category || "").trim())
        .filter(Boolean)
    );
    return Array.from(set);
  }, [sellerProducts]);

  return (
    <main>
      <Navbar />

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "36px 24px 24px"
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Link href="/browse" className="pill">
            ← {language === "es" ? "Atrás" : "Back"}
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "24px",
            alignItems: "stretch",
            marginBottom: "28px"
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, #fcf7f1 0%, #f8efe3 50%, #f3e3d0 100%)",
              border: "1px solid #eadbc8",
              borderRadius: "32px",
              padding: "40px 32px",
              minHeight: "280px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <p
              style={{
                letterSpacing: "4px",
                fontSize: "0.8rem",
                color: "#8c6a5d",
                marginBottom: "14px"
              }}
            >
              {language === "es" ? "PERFIL DEL VENDEDOR" : "SELLER PROFILE"}
            </p>

            <h1
              style={{
                fontSize: "3rem",
                lineHeight: 1.1,
                color: "#7a1f3d",
                marginBottom: "14px",
                fontWeight: 800
              }}
            >
              {sellerName || (language === "es" ? "Vendedor" : "Seller")}
            </h1>

            <p
              style={{
                maxWidth: "640px",
                color: "#6d5650",
                fontSize: "1.05rem",
                lineHeight: 1.7
              }}
            >
              {language === "es"
                ? "Explora los artículos publicados por este vendedor y descubre piezas que combinan estilo, oportunidad y confianza."
                : "Explore the items listed by this seller and discover pieces that combine style, opportunity, and trust."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "18px"
            }}
          >
            <div
              style={{
                background: "#fcf7f1",
                border: "1px solid #eadbc8",
                borderRadius: "24px",
                padding: "24px"
              }}
            >
              <h3
                style={{
                  color: "#5c1d36",
                  fontSize: "1.2rem",
                  marginBottom: "12px"
                }}
              >
                {language === "es" ? "Resumen" : "Summary"}
              </h3>

              <div style={{ display: "grid", gap: "10px", color: "#6d5650" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{language === "es" ? "Artículos publicados" : "Published items"}</span>
                  <strong style={{ color: "#2f1e1e" }}>{totalListings}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{language === "es" ? "Categorías" : "Categories"}</span>
                  <strong style={{ color: "#2f1e1e" }}>{categories.length}</strong>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#7a1f3d",
                color: "white",
                borderRadius: "24px",
                padding: "24px"
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "10px"
                }}
              >
                {language === "es" ? "Compra con confianza" : "Shop with confidence"}
              </h3>

              <p
                style={{
                  lineHeight: 1.6,
                  opacity: 0.95
                }}
              >
                {language === "es"
                  ? "Revesty está diseñado para descubrir vendedores, artículos únicos y una experiencia de compra más humana."
                  : "Revesty is designed to discover sellers, unique items, and a more human shopping experience."}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: "22px"
          }}
        >
          <h2
            style={{
              color: "#5c1d36",
              fontSize: "2rem",
              marginBottom: "8px"
            }}
          >
            {language === "es" ? "Artículos del vendedor" : "Seller listings"}
          </h2>

          <p style={{ color: "#6d5650" }}>
            {language === "es"
              ? "Todo lo que este vendedor tiene publicado en este momento."
              : "Everything this seller currently has listed."}
          </p>
        </div>

        {sellerProducts.length === 0 ? (
          <div className="empty-state-card">
            <p style={{ marginBottom: "16px" }}>
              {language === "es"
                ? "Este vendedor todavía no tiene artículos publicados."
                : "This seller does not have published items yet."}
            </p>

            <Link href="/browse" className="primary-btn">
              {language === "es" ? "Volver a explorar" : "Back to browse"}
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {sellerProducts.map((item: any) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="product-card"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-image"
                />

                <div className="product-info">
                  <h3 style={{ marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ color: "#6d5650", marginBottom: "6px" }}>
                    {item.brand}
                  </p>
                  <strong style={{ color: "#5c1d36" }}>${item.price}</strong>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}