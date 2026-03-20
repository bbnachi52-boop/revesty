"use client";

import { useMemo, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { useLanguage } from "@/app/lib/useLanguage";
import { useShop } from "@/app/store/shopStore";

export default function CheckoutPage() {
  const { language } = useLanguage();
  const { cart, clearCart } = useShop();

  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: ""
  });

  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  const [billing, setBilling] = useState({
    fullName: "",
    address: "",
    city: "",
    country: ""
  });

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = useMemo(() => {
    return cart.reduce(
      (acc: number, item: any) => acc + Number(item.price || 0),
      0
    );
  }, [cart]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBilling((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert(
        language === "es"
          ? "Tu carrito está vacío."
          : "Your cart is empty."
      );
      return;
    }

    if (
      !shipping.fullName ||
      !shipping.email ||
      !shipping.address ||
      !shipping.city ||
      !shipping.country ||
      !payment.cardName ||
      !payment.cardNumber ||
      !payment.expiryDate ||
      !payment.cvv
    ) {
      alert(
        language === "es"
          ? "Completa todos los campos obligatorios."
          : "Please complete all required fields."
      );
      return;
    }

    if (
      useDifferentBilling &&
      (!billing.fullName ||
        !billing.address ||
        !billing.city ||
        !billing.country)
    ) {
      alert(
        language === "es"
          ? "Completa la dirección de facturación."
          : "Please complete the billing address."
      );
      return;
    }

    setOrderPlaced(true);
    clearCart();
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
              ? "Completa envío, facturación y pago."
              : "Complete shipping, billing, and payment details."}
          </p>
        </div>

        {orderPlaced ? (
          <div className="empty-state-card">
            <h2 style={{ color: "#5c1d36", marginBottom: "12px" }}>
              {language === "es"
                ? "¡Compra realizada con éxito!"
                : "Order placed successfully!"}
            </h2>

            <p style={{ color: "#6d5650" }}>
              {language === "es"
                ? "Tu pedido fue registrado correctamente."
                : "Your order has been placed successfully."}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.9fr",
              gap: "28px",
              alignItems: "start"
            }}
          >
            <form
              className="auth-card"
              style={{ maxWidth: "100%", textAlign: "left" }}
              onSubmit={handlePlaceOrder}
            >
              <div className="auth-form">
                <div className="summary-card">
                  <h3 style={{ color: "#5c1d36", marginBottom: "14px" }}>
                    {language === "es"
                      ? "Dirección de envío"
                      : "Shipping address"}
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gap: "14px"
                    }}
                  >
                    <input
                      className="form-input"
                      name="fullName"
                      value={shipping.fullName}
                      onChange={handleShippingChange}
                      placeholder={
                        language === "es" ? "Nombre completo" : "Full name"
                      }
                    />

                    <input
                      className="form-input"
                      name="email"
                      value={shipping.email}
                      onChange={handleShippingChange}
                      placeholder={
                        language === "es"
                          ? "Correo electrónico"
                          : "Email"
                      }
                    />

                    <input
                      className="form-input"
                      name="address"
                      value={shipping.address}
                      onChange={handleShippingChange}
                      placeholder={
                        language === "es" ? "Dirección" : "Address"
                      }
                    />

                    <input
                      className="form-input"
                      name="city"
                      value={shipping.city}
                      onChange={handleShippingChange}
                      placeholder={language === "es" ? "Ciudad" : "City"}
                    />

                    <input
                      className="form-input"
                      name="country"
                      value={shipping.country}
                      onChange={handleShippingChange}
                      placeholder={language === "es" ? "País" : "Country"}
                    />
                  </div>
                </div>

                <div className="summary-card">
                  <h3 style={{ color: "#5c1d36", marginBottom: "14px" }}>
                    {language === "es"
                      ? "Dirección de facturación"
                      : "Billing address"}
                  </h3>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "14px",
                      color: "#6d5650"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={useDifferentBilling}
                      onChange={() =>
                        setUseDifferentBilling((prev) => !prev)
                      }
                    />
                    <span>
                      {language === "es"
                        ? "Usar una dirección distinta a la de envío"
                        : "Use a different address from shipping"}
                    </span>
                  </label>

                  {!useDifferentBilling ? (
                    <div
                      style={{
                        background: "#f8efe3",
                        borderRadius: "16px",
                        padding: "14px",
                        color: "#6d5650",
                        lineHeight: 1.6
                      }}
                    >
                      {language === "es"
                        ? "La dirección de facturación será igual a la dirección de envío."
                        : "Billing address will be the same as shipping address."}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gap: "14px"
                      }}
                    >
                      <input
                        className="form-input"
                        name="fullName"
                        value={billing.fullName}
                        onChange={handleBillingChange}
                        placeholder={
                          language === "es" ? "Nombre completo" : "Full name"
                        }
                      />

                      <input
                        className="form-input"
                        name="address"
                        value={billing.address}
                        onChange={handleBillingChange}
                        placeholder={
                          language === "es" ? "Dirección" : "Address"
                        }
                      />

                      <input
                        className="form-input"
                        name="city"
                        value={billing.city}
                        onChange={handleBillingChange}
                        placeholder={language === "es" ? "Ciudad" : "City"}
                      />

                      <input
                        className="form-input"
                        name="country"
                        value={billing.country}
                        onChange={handleBillingChange}
                        placeholder={language === "es" ? "País" : "Country"}
                      />
                    </div>
                  )}
                </div>

                <div className="summary-card">
                  <h3 style={{ color: "#5c1d36", marginBottom: "14px" }}>
                    {language === "es" ? "Método de pago" : "Payment method"}
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gap: "14px"
                    }}
                  >
                    <input
                      className="form-input"
                      name="cardName"
                      value={payment.cardName}
                      onChange={handlePaymentChange}
                      placeholder={
                        language === "es"
                          ? "Nombre en la tarjeta"
                          : "Name on card"
                      }
                    />

                    <input
                      className="form-input"
                      name="cardNumber"
                      value={payment.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder={
                        language === "es"
                          ? "Número de tarjeta"
                          : "Card number"
                      }
                    />

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "14px"
                      }}
                    >
                      <input
                        className="form-input"
                        name="expiryDate"
                        value={payment.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder={
                          language === "es"
                            ? "Fecha de vencimiento"
                            : "Expiry date"
                        }
                      />

                      <input
                        className="form-input"
                        name="cvv"
                        value={payment.cvv}
                        onChange={handlePaymentChange}
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="primary-btn auth-btn">
                  {language === "es" ? "Finalizar compra" : "Place order"}
                </button>
              </div>
            </form>

            <div className="summary-card">
              <h3 style={{ color: "#5c1d36", marginBottom: "16px" }}>
                {language === "es" ? "Resumen del pedido" : "Order summary"}
              </h3>

              <div style={{ display: "grid", gap: "12px", marginBottom: "18px" }}>
                {cart.map((item: any, index: number) => (
                  <div
                    key={`${item.id}-${index}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      color: "#6d5650"
                    }}
                  >
                    <span>{item.title}</span>
                    <strong style={{ color: "#2f1e1e" }}>${item.price}</strong>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "14px",
                  borderTop: "1px solid #eadbc8"
                }}
              >
                <span style={{ color: "#6d5650" }}>
                  {language === "es" ? "Total" : "Total"}
                </span>
                <strong style={{ color: "#5c1d36" }}>${total}</strong>
              </div>

              <div
                style={{
                  background: "#f8efe3",
                  borderRadius: "18px",
                  padding: "14px",
                  marginTop: "18px",
                  color: "#6d5650",
                  lineHeight: 1.6
                }}
              >
                {language === "es"
                  ? "✔️ Dirección de envío • ✔️ Facturación igual o distinta • ✔️ Pago simulado"
                  : "✔️ Shipping address • ✔️ Same or different billing • ✔️ Simulated payment"}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}