"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { useLanguage } from "@/app/lib/useLanguage";
import { useShop } from "@/app/store/shopStore";

export default function AccountPage() {
  const { language } = useLanguage();
  const { myListings, favorites, cart } = useShop();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photo: "",
    bio: "",
    city: "",
    country: ""
  });

  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("revesty-profile");
      const savedLogin = localStorage.getItem("revesty-user-login");

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile((prev) => ({
          ...prev,
          ...parsed
        }));
      }

      if (savedLogin) {
        const parsedLogin = JSON.parse(savedLogin);
        setProfile((prev) => ({
          ...prev,
          name: parsedLogin?.name || prev.name,
          email: parsedLogin?.email || prev.email
        }));
      }
    } catch (error) {
      console.error("Error loading profile", error);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("revesty-profile", JSON.stringify(profile));
    setSavedMessage(
      language === "es" ? "Guardado con éxito" : "Saved successfully"
    );

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  const stats = useMemo(() => {
    return {
      listings: Array.isArray(myListings) ? myListings.length : 0,
      favorites: Array.isArray(favorites) ? favorites.length : 0,
      cart: Array.isArray(cart) ? cart.length : 0
    };
  }, [myListings, favorites, cart]);

  return (
    <main>
      <Navbar />

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "36px 24px 60px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "24px",
          alignItems: "start"
        }}
      >
        <div className="auth-card" style={{ maxWidth: "100%", textAlign: "left" }}>
          <h1 style={{ color: "#5c1d36", marginBottom: "10px" }}>
            {language === "es" ? "Mi cuenta" : "My Account"}
          </h1>

          <p className="auth-subtitle">
            {language === "es"
              ? "Administra tu perfil personal y tu información de vendedora."
              : "Manage your personal profile and seller information."}
          </p>

          <form className="auth-form" onSubmit={handleSave}>
            <input
              className="form-input"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder={language === "es" ? "Nombre" : "Name"}
            />

            <input
              className="form-input"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder={language === "es" ? "Correo electrónico" : "Email"}
            />

            <input
              className="form-input"
              name="photo"
              value={profile.photo}
              onChange={handleChange}
              placeholder={
                language === "es" ? "URL de foto de perfil" : "Profile photo URL"
              }
            />

            <textarea
              className="form-input textarea"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder={language === "es" ? "Biografía" : "Bio"}
            />

            <input
              className="form-input"
              name="city"
              value={profile.city}
              onChange={handleChange}
              placeholder={language === "es" ? "Ciudad" : "City"}
            />

            <input
              className="form-input"
              name="country"
              value={profile.country}
              onChange={handleChange}
              placeholder={language === "es" ? "País" : "Country"}
            />

            <button type="submit" className="primary-btn auth-btn">
              {language === "es" ? "Guardar cambios" : "Save changes"}
            </button>

            {savedMessage && (
              <p style={{ color: "#5c1d36", marginTop: 12, fontWeight: 600 }}>
                {savedMessage}
              </p>
            )}
          </form>
        </div>

        <div className="summary-card">
          <h3 style={{ color: "#5c1d36", marginBottom: "16px" }}>
            {language === "es" ? "Tu resumen" : "Your summary"}
          </h3>

          <div style={{ display: "grid", gap: "14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#6d5650"
              }}
            >
              <span>
                {language === "es" ? "Artículos publicados" : "Published items"}
              </span>
              <strong>{stats.listings}</strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#6d5650"
              }}
            >
              <span>{language === "es" ? "Favoritos" : "Favorite items"}</span>
              <strong>{stats.favorites}</strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#6d5650"
              }}
            >
              <span>
                {language === "es" ? "Artículos en carrito" : "Cart items"}
              </span>
              <strong>{stats.cart}</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}