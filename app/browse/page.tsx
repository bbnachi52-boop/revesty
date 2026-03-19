"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useLanguage } from "@/app/lib/useLanguage";
import { useShop } from "@/app/store/shopStore";

export default function HomePage() {
  const { t, language } = useLanguage();
  const { products } = useShop();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return products;

    return products.filter((item) =>
      `${item.title} ${item.brand || ""} ${item.description || ""} ${item.category || ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [products, search]);

  const featuredProducts = filteredProducts.slice(0, 4);
  const newArrivals = filteredProducts.slice(0, 8);

  const categoryCards = [
    { label: t.clothes, emoji: "👗" },
    { label: t.shoes, emoji: "👟" },
    { label: t.bags, emoji: "👜" },
    { label: t.accessories, emoji: "✨" }
  ];

  return (
    <main>
      <Navbar search={search} setSearch={setSearch} />

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "36px 24px 24px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "24px",
            alignItems: "stretch"
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, #fcf7f1 0%, #f8efe3 50%, #f3e3d0 100%)",
              border: "1px solid #eadbc8",
              borderRadius: "32px",
              padding: "48px 36px",
              minHeight: "420px",
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
              {t.heroTag}
            </p>

            <h1
              style={{
                fontSize: "4.4rem",
                lineHeight: 1,
                color: "#7a1f3d",
                marginBottom: "18px",
                fontWeight: 800
              }}
            >
              {t.heroTitle}
            </h1>

            <p
              style={{
                maxWidth: "640px",
                color: "#6d5650",
                fontSize: "1.15rem",
                lineHeight: 1.6,
                marginBottom: "26px"
              }}
            >
              {t.heroSubtitle}
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap"
              }}
            >
              <Link href="/sell" className="primary-btn">
                {t.sellItem}
              </Link>

              <Link href="/browse" className="secondary-btn">
                {t.browseItems}
              </Link>
            </div>
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            <div
              style={{
                background: "#fcf7f1",
                border: "1px solid #eadbc8",
                borderRadius: "28px",
                padding: "28px"
              }}
            >
              <h3
                style={{
                  color: "#5c1d36",
                  fontSize: "1.3rem",
                  marginBottom: "10px"
                }}
              >
                {language === "es" ? "Compra con confianza" : "Shop with confidence"}
              </h3>

              <p
                style={{
                  color: "#6d5650",
                  lineHeight: 1.6
                }}
              >
                {language === "es"
                  ? "Descubre moda curada, piezas únicas y artículos pre-loved con estilo."
                  : "Discover curated fashion, unique pieces, and stylish pre-loved items."}
              </p>
            </div>

            <div
              style={{
                background: "#7a1f3d",
                color: "white",
                borderRadius: "28px",
                padding: "28px"
              }}
            >
              <h3
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "10px"
                }}
              >
                {language === "es" ? "Vende con Revesty" : "Sell with Revesty"}
              </h3>

              <p
                style={{
                  lineHeight: 1.6,
                  opacity: 0.95,
                  marginBottom: "16px"
                }}
              >
                {language === "es"
                  ? "Publica tu ropa, zapatos, bolsos y accesorios en minutos."
                  : "List your clothes, shoes, bags, and accessories in minutes."}
              </p>

              <Link
                href="/sell"
                style={{
                  display: "inline-flex",
                  padding: "12px 18px",
                  borderRadius: "999px",
                  background: "white",
                  color: "#7a1f3d",
                  fontWeight: 700
                }}
              >
                {language === "es" ? "Empieza a vender" : "Start selling"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "8px 24px 24px"
        }}
      >
        <div className="page-header" style={{ paddingTop: 10 }}>
          <h1 style={{ fontSize: "2rem" }}>
            {language === "es" ? "Compra por categoría" : "Shop by category"}
          </h1>
          <p>
            {language === "es"
              ? "Encuentra rápido lo que estás buscando."
              : "Find what you're looking for faster."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px"
          }}
        >
          {categoryCards.map((category) => (
            <Link
              key={category.label}
              href="/browse"
              style={{
                background: "#fcf7f1",
                border: "1px solid #eadbc8",
                borderRadius: "24px",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                gap: "14px"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "18px",
                  background: "#f8efe3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.6rem"
                }}
              >
                {category.emoji}
              </div>

              <div>
                <h3 style={{ color: "#2f1e1e", marginBottom: "4px" }}>
                  {category.label}
                </h3>
                <p style={{ color: "#8c6a5d" }}>
                  {language === "es" ? "Explorar ahora" : "Browse now"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "8px 24px 30px"
        }}
      >
        <div className="page-header" style={{ paddingTop: 10 }}>
          <h1 style={{ fontSize: "2rem" }}>
            {language === "es" ? "Destacados" : "Featured picks"}
          </h1>
          <p>
            {language === "es"
              ? "Selección especial para ti."
              : "A special selection for you."}
          </p>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="empty-state-card">
            {language === "es" ? "No hay productos todavía." : "No products yet."}
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((item) => (
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
                  <h3>{item.title}</h3>
                  <p style={{ color: "#6d5650" }}>{item.brand}</p>
                  <strong style={{ color: "#5c1d36" }}>${item.price}</strong>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "8px 24px 30px"
        }}
      >
        <div className="page-header" style={{ paddingTop: 10 }}>
          <h1 style={{ fontSize: "2rem" }}>
            {language === "es" ? "Nuevos artículos" : "New arrivals"}
          </h1>
          <p>
            {language === "es"
              ? "Lo último que está entrando a Revesty."
              : "The latest items arriving on Revesty."}
          </p>
        </div>

        {newArrivals.length === 0 ? (
          <div className="empty-state-card">
            {language === "es" ? "No hay productos todavía." : "No products yet."}
          </div>
        ) : (
          <div className="product-grid">
            {newArrivals.map((item) => (
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
                  <h3>{item.title}</h3>
                  <p style={{ color: "#6d5650" }}>{item.brand}</p>
                  <strong style={{ color: "#5c1d36" }}>${item.price}</strong>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "8px 24px 70px"
        }}
      >
        <div
          style={{
            background: "#fcf7f1",
            border: "1px solid #eadbc8",
            borderRadius: "32px",
            padding: "36px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "center"
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "2.2rem",
                color: "#5c1d36",
                marginBottom: "14px"
              }}
            >
              {language === "es"
                ? "Tu estilo merece otra vida"
                : "Your style deserves another life"}
            </h2>

            <p
              style={{
                color: "#6d5650",
                lineHeight: 1.7,
                marginBottom: "18px"
              }}
            >
              {language === "es"
                ? "Revesty conecta moda, oportunidad y comunidad. Compra mejor, vende con estilo y crea una experiencia más consciente."
                : "Revesty connects fashion, opportunity, and community. Shop better, sell with style, and create a more conscious experience."}
            </p>

            <Link href="/sell" className="primary-btn">
              {language === "es" ? "Publicar mi artículo" : "List my item"}
            </Link>
          </div>

          <div
            style={{
              background: "#f8efe3",
              borderRadius: "24px",
              padding: "28px",
              display: "grid",
              gap: "16px"
            }}
          >
            <div>
              <strong style={{ color: "#5c1d36" }}>
                {language === "es" ? "Moda con propósito" : "Fashion with purpose"}
              </strong>
              <p style={{ color: "#6d5650", marginTop: "6px" }}>
                {language === "es"
                  ? "Dale valor a piezas que todavía tienen mucho por ofrecer."
                  : "Give value to pieces that still have so much to offer."}
              </p>
            </div>

            <div>
              <strong style={{ color: "#5c1d36" }}>
                {language === "es"
                  ? "Un marketplace para todos, inspirado en la cultura latina"
                  : "A marketplace for everyone, inspired by Latino culture"}
              </strong>
              <p style={{ color: "#6d5650", marginTop: "6px" }}>
                {language === "es"
                  ? "Construido para crecer con una comunidad diversa que compra y vende con identidad."
                  : "Built to grow with a diverse community that buys and sells with identity."}
              </p>
            </div>

            <div>
              <strong style={{ color: "#5c1d36" }}>
                {language === "es" ? "Experiencia simple" : "Simple experience"}
              </strong>
              <p style={{ color: "#6d5650", marginTop: "6px" }}>
                {language === "es"
                  ? "Publica, conversa, vende y compra desde un solo lugar."
                  : "List, chat, sell, and shop from one place."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}