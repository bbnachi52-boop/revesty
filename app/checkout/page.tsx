"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useShop } from "@/app/store/shopStore";
import { useLanguage } from "@/app/lib/useLanguage";

export default function CheckoutPage() {
  const { cart, removeFromCart, addToFavorites, clearCart } = useShop();
  const { language } = useLanguage();

  const [orderDone, setOrderDone] = useState(false);
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingCountry: "",
    billingAddress: "",
    billingCity: "",
    billingCountry: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + Number(item.price || 0), 0);
  }, [cart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveForLater = (item: any, index: number) => {
    addToFavorites(item);
    removeFromCart(index);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      form.fullName,
      form.email,
      form.phone,
      form.shippingAddress,
      form.shippingCity,
      form.shippingCountry,
      form.cardNumber,
      form.cardName,
      form.expiryDate,
      form.cvv
    ];

    if (useDifferentBilling) {
      requiredFields.push(
        form.billingAddress,
        form.billingCity,
        form.billingCountry
      );
    }

    const hasEmpty = requiredFields.some((value) => !String(value).trim());

    if (cart.length === 0) {
      alert(
        language === "es"
          ? "Tu carrito está vacío."
          : "Your cart is empty."
      );
      return;
    }

    if (hasEmpty) {
      alert(
        language === "es"
          ? "Completa todos los campos requeridos."
          : "Please complete all required fields."
      );
      return;
    }

    clearCart();
    setOrderDone(true);
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
            {language === "es" ? "Checkout" : "Checkout"}
          </h1>

          <p style={{ color: "#6d5650" }}>
            {language === "es"
              ? "Completa tu pedido con envío y pago."
              : "Complete your order with shipping and payment."}
          </p>
        </div>

        {orderDone ? (
          <div className="empty-state-card">
            <h2 style={{ color: "#5c1d36", marginBottom: "14px" }}>
              {language === "es" ? "Compra realizada 🎉" : "Purchase completed 🎉"}
            </h2>

            <p style={{ color: "#6d5650", marginBottom: "18px" }}>
              {language === "es"
                ? "Tu pedido fue registrado correctamente."
                : "Your order was submitted successfully."}
            </p>

            <Link href="/" className="primary-btn">
              {language === "es" ? "Volver al inicio" : "Back to home"}
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="empty-state-card">
            <p style={{ marginBottom: "16px" }}>
              {language === "es"
                ? "Tu carrito está vacío."
                : "Your cart is empty."}
            </p>

            <Link href="/browse" className="primary-btn">
              {language === "es" ? "Explorar artículos" : "Browse items"}
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: "30px",
              alignItems: "start"
            }}
          >
            <form
              onSubmit={handleCheckout}
              style={{
                background: "#fcf7f1",
                border: "1px solid #eadbc8",
                borderRadius: "24px",
                padding: "24px",
                display: "grid",
                gap: "28px"
              }}
            >
              <div>
                <h3 style={{ color: "#5c1d36", marginBottom: "16px" }}>
                  {language === "es" ? "Datos del cliente" : "Customer details"}
                </h3>

                <div className="auth-form">
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={language === "es" ? "Nombre completo" : "Full name"}
                  />

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={language === "es" ? "Correo electrónico" : "Email"}
                  />

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={language === "es" ? "Teléfono" : "Phone"}
                  />
                </div>
              </div>

              <div>
                <h3 style={{ color: "#5c1d36", marginBottom: "16px" }}>
                  {language === "es" ? "Dirección de envío" : "Shipping address"}
                </h3>

                <div className="auth-form">
                  <input
                    name="shippingAddress"
                    value={form.shippingAddress}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={language === "es" ? "Dirección" : "Address"}
                  />

                  <input
                    name="shippingCity"
                    value={form.shippingCity}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={language === "es" ? "Ciudad" : "City"}
                  />

                  <input
                    name="shippingCountry"
                    value={form.shippingCountry}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={language === "es" ? "País" : "Country"}
                  />
                </div>
              </div>

              <div
                style={{
                  background: "#f8efe3",
                  borderRadius: "18px",
                  padding: "16px"
                }}
              >
                <label
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    color: "#5d4545"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={useDifferentBilling}
                    onChange={() => setUseDifferentBilling(!useDifferentBilling)}
                  />
                  {language === "es"
                    ? "Usar una dirección de facturación diferente"
                    : "Use a different billing address"}
                </label>
              </div>

              {useDifferentBilling && (
                <div>
                  <h3 style={{ color: "#5c1d36", marginBottom: "16px" }}>
                    {language === "es"
                      ? "Dirección de facturación"
                      : "Billing address"}
                  </h3>

                  <div className="auth-form">
                    <input
                      name="billingAddress"
                      value={form.billingAddress}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={language === "es" ? "Dirección" : "Address"}
                    />

                    <input
                      name="billingCity"
                      value={form.billingCity}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={language === "es" ? "Ciudad" : "City"}
                    />

                    <input
                      name="billingCountry"
                      value={form.billingCountry}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={language === "es" ? "País" : "Country"}
                    />
                  </div>
                </div>
              )}

              <div>
                <h3 style={{ color: "#5c1d36", marginBottom: "16px" }}>
                  {language === "es" ? "Método de pago" : "Payment method"}
                </h3>

                <div className="auth-form">
                  <input
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={language === "es" ? "Número de tarjeta" : "Card number"}
                  />

                  <input
                    name="cardName"
                    value={form.cardName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={language === "es" ? "Nombre en la tarjeta" : "Name on card"}
                  />

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "14px"
                    }}
                  >
                    <input
                      name="expiryDate"
                      value={form.expiryDate}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={language === "es" ? "MM/AA" : "MM/YY"}
                    />

                    <input
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="primary-btn auth-btn">
                {language === "es" ? "Finalizar compra" : "Complete purchase"}
              </button>
            </form>

            <div
              style={{
                display: "grid",
                gap: "22px",
                position: "sticky",
                top: "24px"
              }}
            >
              <div
                style={{
                  padding: "22px",
                  border: "1px solid #eadbc8",
                  borderRadius: "24px",
                  background: "#fcf7f1"
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
                    display: "grid",
                    gap: "18px",
                    marginBottom: "18px"
                  }}
                >
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "74px 1fr",
                        gap: "12px",
                        alignItems: "center"
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "74px",
                          height: "74px",
                          objectFit: "contain",
                          borderRadius: "12px",
                          background: "#f8efe3",
                          padding: "6px"
                        }}
                      />

                      <div>
                        <div style={{ fontWeight: 600 }}>{item.title}</div>
                        <div style={{ color: "#6d5650", fontSize: "0.95rem" }}>
                          {item.brand}
                        </div>
                        <div style={{ color: "#5c1d36", fontWeight: 700 }}>
                          ${item.price}
                        </div>

                        <div
                          style={{
                            marginTop: "8px",
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap"
                          }}
                        >
                          <button
                            type="button"
                            className="pill"
                            onClick={() => removeFromCart(index)}
                          >
                            {language === "es" ? "Eliminar" : "Remove"}
                          </button>

                          <button
                            type="button"
                            className="pill"
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
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#6d5650",
                    marginBottom: "10px"
                  }}
                >
                  <span>{language === "es" ? "Artículos" : "Items"}</span>
                  <strong>{cart.length}</strong>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#6d5650"
                  }}
                >
                  <span>{language === "es" ? "Total" : "Total"}</span>
                  <strong style={{ color: "#5c1d36" }}>${total}</strong>
                </div>
              </div>

              <div
                style={{
                  background: "#f8efe3",
                  borderRadius: "24px",
                  padding: "18px",
                  color: "#6d5650",
                  lineHeight: 1.6
                }}
              >
                {language === "es"
                  ? "✔️ Compra segura • ✔️ Formulario completo • ✔️ Revisión antes de confirmar"
                  : "✔️ Secure purchase • ✔️ Full form • ✔️ Review before confirming"}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}