"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { useShop } from "@/app/store/shopStore";
import { useLanguage } from "@/app/lib/useLanguage";
import { useMessages } from "@/app/store/messageStore";
import { useReviews } from "@/app/store/reviewStore";

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart, addToFavorites } = useShop();
  const { language } = useLanguage();
  const { sendMessage } = useMessages() as any;
  const { addReview, getReviewsByProduct, getAverageRating } = useReviews();

  const [messageText, setMessageText] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const product = products.find((p: any) => String(p.id) === String(id));

  const productReviews = useMemo(() => {
    if (!product) return [];
    return getReviewsByProduct(product.id);
  }, [product, getReviewsByProduct]);

  const averageRating = useMemo(() => {
    if (!product) return 0;
    return getAverageRating(product.id);
  }, [product, getAverageRating]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (item: any) =>
          item.id !== product.id &&
          String(item.category || "").toLowerCase() ===
            String(product.category || "").toLowerCase()
      )
      .slice(0, 4);
  }, [product, products]);

  if (!product) {
    return (
      <main>
        <Navbar />
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "40px 24px"
          }}
        >
          <div className="empty-state-card">
            <h2 style={{ color: "#5c1d36", marginBottom: "12px" }}>
              {language === "es" ? "Producto no encontrado" : "Product not found"}
            </h2>

            <Link href="/browse" className="primary-btn">
              {language === "es" ? "Volver a explorar" : "Back to browse"}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    sendMessage(product, messageText);
    setMessageText("");
    alert(
      language === "es"
        ? "Mensaje enviado"
        : "Message sent"
    );
  };

  const handleAddReview = () => {
    if (!reviewName.trim() || !reviewComment.trim()) {
      alert(
        language === "es"
          ? "Completa tu nombre y comentario"
          : "Please complete your name and comment"
      );
      return;
    }

    addReview({
      productId: product.id,
      productTitle: product.title,
      rating: reviewRating,
      author: reviewName,
      comment: reviewComment
    });

    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
  };

  const renderStars = (value: number) => {
    const rounded = Math.round(value);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
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
        <div style={{ marginBottom: "20px" }}>
          <Link href="/browse" className="pill">
            ← {language === "es" ? "Atrás" : "Back"}
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "30px",
            alignItems: "start"
          }}
        >
          <div
            style={{
              background: "#fcf7f1",
              border: "1px solid #eadbc8",
              borderRadius: "28px",
              padding: "22px"
            }}
          >
            <div
              style={{
                background: "#f8efe3",
                borderRadius: "22px",
                minHeight: "520px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  maxHeight: "460px",
                  objectFit: "contain"
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: "#fcf7f1",
              border: "1px solid #eadbc8",
              borderRadius: "28px",
              padding: "28px"
            }}
          >
            <h1
              style={{
                fontSize: "2.2rem",
                marginBottom: "10px",
                color: "#2f1e1e"
              }}
            >
              {product.title}
            </h1>

            <p
              style={{
                fontSize: "1.9rem",
                color: "#5c1d36",
                fontWeight: 700,
                marginBottom: "12px"
              }}
            >
              ${product.price}
            </p>

            <div
              style={{
                color: "#5c1d36",
                fontWeight: 700,
                marginBottom: "18px"
              }}
            >
              {renderStars(averageRating)}{" "}
              <span style={{ color: "#6d5650", fontWeight: 500 }}>
                ({productReviews.length}{" "}
                {language === "es"
                  ? productReviews.length === 1
                    ? "reseña"
                    : "reseñas"
                  : productReviews.length === 1
                  ? "review"
                  : "reviews"})
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: "10px",
                color: "#5d4545",
                marginBottom: "18px"
              }}
            >
              <p>
                <strong>{language === "es" ? "Marca" : "Brand"}:</strong>{" "}
                {product.brand || "-"}
              </p>

              <p>
                <strong>{language === "es" ? "Talla" : "Size"}:</strong>{" "}
                {product.size || "-"}
              </p>

              <p>
                <strong>{language === "es" ? "Categoría" : "Category"}:</strong>{" "}
                {product.category || "-"}
              </p>

              <p>
                <strong>{language === "es" ? "Estado" : "Condition"}:</strong>{" "}
                {product.condition || "-"}
              </p>

              {product.seller && (
                <p>
                  <strong>{language === "es" ? "Vendedor" : "Seller"}:</strong>{" "}
                  <Link
                    href={`/seller/${encodeURIComponent(product.seller)}`}
                    style={{
                      color: "#7a1f3d",
                      fontWeight: 700,
                      textDecoration: "underline"
                    }}
                  >
                    {product.seller}
                  </Link>
                </p>
              )}
            </div>

            <p
              style={{
                color: "#6d5650",
                lineHeight: 1.7,
                marginBottom: "22px"
              }}
            >
              {product.description ||
                (language === "es"
                  ? "Artículo en muy buen estado."
                  : "Item in very good condition.")}
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "22px"
              }}
            >
              <Link
                href="/checkout"
                className="primary-btn"
                onClick={() => addToCart(product)}
              >
                {language === "es" ? "Comprar ahora" : "Buy now"}
              </Link>

              <button
                type="button"
                className="pill pill-dark"
                onClick={() => addToCart(product)}
              >
                {language === "es" ? "Agregar al carrito" : "Add to cart"}
              </button>

              <button
                type="button"
                className="pill"
                onClick={() => addToFavorites(product)}
              >
                {language === "es" ? "Guardar" : "Save"}
              </button>
            </div>

            <div
              style={{
                background: "#f8efe3",
                borderRadius: "18px",
                padding: "16px",
                color: "#6d5650",
                lineHeight: 1.6
              }}
            >
              {language === "es"
                ? "✔️ Compra segura • ✔️ Marketplace inclusivo • ✔️ Proceso simple para comprar y vender"
                : "✔️ Secure shopping • ✔️ Inclusive marketplace • ✔️ Simple process to buy and sell"}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginTop: "30px",
            alignItems: "start"
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
            <h3 style={{ color: "#5c1d36", marginBottom: "14px" }}>
              {language === "es" ? "Mensaje al vendedor" : "Message seller"}
            </h3>

            <textarea
              className="form-input textarea"
              placeholder={
                language === "es"
                  ? "Escribe tu mensaje..."
                  : "Write your message..."
              }
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />

            <button
              type="button"
              className="primary-btn"
              style={{ marginTop: "12px" }}
              onClick={handleSendMessage}
            >
              {language === "es" ? "Enviar mensaje" : "Send message"}
            </button>
          </div>

          <div
            style={{
              background: "#fcf7f1",
              border: "1px solid #eadbc8",
              borderRadius: "24px",
              padding: "24px"
            }}
          >
            <h3 style={{ color: "#5c1d36", marginBottom: "14px" }}>
              {language === "es" ? "Deja una reseña" : "Leave a review"}
            </h3>

            <div className="auth-form">
              <input
                type="text"
                className="form-input"
                placeholder={language === "es" ? "Tu nombre" : "Your name"}
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
              />

              <select
                className="form-input"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
              >
                <option value={5}>
                  {language === "es" ? "5 - Excelente" : "5 - Excellent"}
                </option>
                <option value={4}>
                  {language === "es" ? "4 - Muy bueno" : "4 - Very good"}
                </option>
                <option value={3}>
                  {language === "es" ? "3 - Bueno" : "3 - Good"}
                </option>
                <option value={2}>
                  {language === "es" ? "2 - Regular" : "2 - Fair"}
                </option>
                <option value={1}>
                  {language === "es" ? "1 - Malo" : "1 - Poor"}
                </option>
              </select>

              <textarea
                className="form-input textarea"
                placeholder={
                  language === "es" ? "Escribe tu comentario" : "Write your comment"
                }
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />

              <button
                type="button"
                className="primary-btn"
                onClick={handleAddReview}
              >
                {language === "es" ? "Publicar reseña" : "Post review"}
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#fcf7f1",
            border: "1px solid #eadbc8",
            borderRadius: "24px",
            padding: "24px",
            marginTop: "24px"
          }}
        >
          <h3 style={{ color: "#5c1d36", marginBottom: "18px" }}>
            {language === "es" ? "Reseñas" : "Reviews"}
          </h3>

          {productReviews.length === 0 ? (
            <p style={{ color: "#6d5650" }}>
              {language === "es"
                ? "Todavía no hay reseñas."
                : "No reviews yet."}
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "14px"
              }}
            >
              {productReviews.map((review: any) => (
                <div
                  key={review.id}
                  style={{
                    border: "1px solid #eadbc8",
                    borderRadius: "18px",
                    padding: "14px",
                    background: "#f8efe3"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "8px",
                      flexWrap: "wrap"
                    }}
                  >
                    <strong>{review.author}</strong>
                    <span style={{ color: "#5c1d36", fontWeight: 700 }}>
                      {renderStars(review.rating)}
                    </span>
                  </div>

                  <p style={{ color: "#5d4545", marginBottom: "8px" }}>
                    {review.comment}
                  </p>

                  <small style={{ color: "#8c6a5d" }}>
                    {new Date(review.date).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: "30px" }}>
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
              {language === "es" ? "También te puede gustar" : "You may also like"}
            </h2>

            <p style={{ color: "#6d5650" }}>
              {language === "es"
                ? "Más artículos de la misma categoría."
                : "More items from the same category."}
            </p>
          </div>

          {relatedProducts.length === 0 ? (
            <div className="empty-state-card">
              {language === "es"
                ? "No hay productos relacionados todavía."
                : "No related products yet."}
            </div>
          ) : (
            <div className="product-grid">
              {relatedProducts.map((item: any) => (
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
        </div>
      </section>
    </main>
  );
}