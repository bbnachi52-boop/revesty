"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../lib/useLanguage";
import { useShop } from "../store/shopStore";

export default function AccountPage() {
  const { t, language } = useLanguage();
  const { myListings, favorites, cart } = useShop();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginData = localStorage.getItem("revesty-user-login");
    const savedProfile = localStorage.getItem("revesty-profile");

    if (loginData) {
      const parsedLogin = JSON.parse(loginData);
      setIsLoggedIn(Boolean(parsedLogin.isLoggedIn));
      setName(parsedLogin.name || "");
      setEmail(parsedLogin.email || "");
    }

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setBio(profile.bio || "");
      setCity(profile.city || "");
      setCountry(profile.country || "");
      setProfilePhoto(profile.profilePhoto || "");
    }
  }, []);

  const handleSave = (e: any) => {
    e.preventDefault();

    const profile = {
      name,
      email,
      bio,
      city,
      country,
      profilePhoto
    };

    localStorage.setItem("revesty-profile", JSON.stringify(profile));
    setSavedMessage(t.saved);

    setTimeout(() => {
      setSavedMessage("");
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("revesty-user-login");
    window.location.href = "/";
  };

  return (
    <main>
      <Navbar />

      <section className="simple-page">
        <div className="page-actions">
          <Link href="/" className="pill">{t.back}</Link>
        </div>

        <div className="page-header">
          <h1>{t.profileTitle}</h1>
          <p>{t.profileSubtitle}</p>
        </div>

        {!isLoggedIn ? (
          <div className="empty-state-card">
            <p style={{ marginBottom: "16px" }}>
              {language === "es" ? "No has iniciado sesión todavía." : "You are not logged in yet."}
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/login" className="primary-btn">{t.login}</Link>
              <Link href="/signup" className="secondary-btn">{t.signup}</Link>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "24px",
              alignItems: "start"
            }}
          >
            <div className="auth-card" style={{ textAlign: "left", maxWidth: "100%" }}>
              <form className="auth-form" onSubmit={handleSave}>
                <label className="form-label">
                  {t.name}
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label className="form-label">
                  {t.email}
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <label className="form-label">
                  {t.profilePhoto}
                  <input
                    type="text"
                    className="form-input"
                    value={profilePhoto}
                    onChange={(e) => setProfilePhoto(e.target.value)}
                    placeholder="https://..."
                  />
                </label>

                {profilePhoto && (
                  <div style={{ marginTop: 10 }}>
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      style={{
                        width: "110px",
                        height: "110px",
                        borderRadius: "999px",
                        objectFit: "cover",
                        border: "1px solid #eadbc8"
                      }}
                    />
                  </div>
                )}

                <label className="form-label">
                  {t.bio}
                  <textarea
                    className="form-input textarea"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </label>

                <label className="form-label">
                  {t.cityLabel}
                  <input
                    type="text"
                    className="form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>

                <label className="form-label">
                  {t.countryLabel}
                  <input
                    type="text"
                    className="form-input"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </label>

                <button type="submit" className="primary-btn auth-btn">{t.save}</button>

                <button
                  type="button"
                  className="pill"
                  onClick={handleLogout}
                  style={{ marginTop: "12px" }}
                >
                  {language === "es" ? "Cerrar sesión" : "Logout"}
                </button>

                {savedMessage && (
                  <p style={{ color: "#5c1d36", marginTop: 12, fontWeight: 600 }}>
                    {savedMessage}
                  </p>
                )}
              </form>
            </div>

            <div className="summary-card">
              <h3 style={{ marginBottom: 16 }}>{t.stats}</h3>

              <div style={{ display: "grid", gap: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#6d5650" }}>
                  <span>{t.publishedItems}</span>
                  <strong>{myListings.length}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "#6d5650" }}>
                  <span>{t.favoriteItems}</span>
                  <strong>{favorites.length}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "#6d5650" }}>
                  <span>{t.cartItems}</span>
                  <strong>{cart.length}</strong>
                </div>
              </div>

              <Link href="/my-listings" className="secondary-btn" style={{ marginTop: 20 }}>
                {t.myListings}
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}