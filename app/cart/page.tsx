"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useShop } from "@/app/store/shopStore";
import { useLanguage } from "@/app/lib/useLanguage";

export default function CartPage() {
  const { cart, removeFromCart, addToFavorites } = useShop();
  const { language } = useLanguage();

  const total = cart.reduce(
    (acc: number, item: any) => acc + Number(item.price || 0),
    0
  );

  const handleSaveForLater = (item: any, index: number) => {
    addToFavorites(item);
    removeFromCart(index);
  };

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
            {language === "es" ? "Carrito" : "Cart"}
          </h1>

          <p style={{ color: "#6d5650" }}>
            {language === "es"
              ? "Revisa tus artículos antes de pagar."
              : "Review your items before checkout."}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state-card">
            <p style={{ marginBottom: "16px" }}>
              {language === "es"
                ? "Tu carrito está vacío."
                : "Your cart is empty."}
            </p>

            <Link href="/browse" className="primary-btn">
              {language === "es" ? "Seguir comprando" : "Continue shopping"}
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "30px",
              alignItems: "start"
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "22px"
              }}
            >
              {cart.map((item: any, index: number) => (
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
                        className="pill"
                        onClick={() => removeFromCart(index)}
                      >
                        {language === "es" ? "Eliminar" : "Remove"}
                      </button>

                      <button
                        type="button"
                        className="pill pill-dark"
                        onClick={() => handleSaveForLater(item, index)}
                      >
                        {language === "es"
                          ? "Guardar para después"
                          : "Save for later"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "22px",
                border: "1px solid #eadbc8",
                borderRadius: "24px",
                background: "#fcf7f1",
                height: "fit-content",
                position: "sticky",
                top: "24px"
              }}
            >
              <h3
                style={{
                  marginBottom: "16px",
                  color: "#5c1d36",
                  fontSize: "1.3rem"
                }}
              >
                {language === "es" ? "Resumen" : "Summary"}
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  color: "#6d5650"
                }}
              >
                <span>{language === "es" ? "Artículos" : "Items"}</span>
                <strong>{cart.length}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  color: "#6d5650"
                }}
              >
                <span>{language === "es" ? "Total" : "Total"}</span>
                <strong style={{ color: "#5c1d36" }}>${total}</strong>
              </div>

              <div
                style={{
                  background: "#f8efe3",
                  borderRadius: "18px",
                  padding: "14px",
                  marginBottom: "18px",
                  color: "#6d5650",
                  lineHeight: 1.6
                }}
              >
                {language === "es"
                  ? "✔️ Compra segura • ✔️ Guardar para después • ✔️ Revisión antes de pagar"
                  : "✔️ Secure purchase • ✔️ Save for later • ✔️ Review before checkout"}
              </div>

              <Link href="/checkout" className="primary-btn auth-btn">
                {language === "es" ? "Ir a pagar" : "Go to checkout"}
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}