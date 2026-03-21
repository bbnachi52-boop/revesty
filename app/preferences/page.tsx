"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../lib/useLanguage";

export default function PreferencesPage() {
  const { language, changeLanguage, t } = useLanguage() as any;

  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedPrefs = localStorage.getItem("revesty-preferences");

    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setNotifications(Boolean(prefs.notifications));
      setMarketingEmails(Boolean(prefs.marketingEmails));
      setPrivateProfile(Boolean(prefs.privateProfile));
    }
  }, []);

  const handleSave = (e: any) => {
    e.preventDefault();

    const prefs = {
      language,
      notifications,
      marketingEmails,
      privateProfile
    };

    localStorage.setItem("revesty-preferences", JSON.stringify(prefs));
    setSavedMessage((t as any) .saved);

    setTimeout(() => {
      setSavedMessage("");
    }, 2000);
  };

  return (
    <main>
      <Navbar />

      <section className="simple-page">
        <div className="page-actions">
          <Link href="/" className="pill">
            {(t as any) .back}
          </Link>
        </div>

        <div className="page-header">
          <h1>{(t as any) .preferencesTitle}</h1>
          <p>{(t as any) .preferencesSubtitle}</p>
        </div>

        <div className="auth-card" style={{ maxWidth: "760px", textAlign: "left" }}>
          <form className="auth-form" onSubmit={handleSave}>
            <div>
              <label className="form-label">{(t as any) .languageSetting}</label>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
                <button
                  type="button"
                  className={language === "en" ? "pill pill-dark" : "pill"}
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>

                <button
                  type="button"
                  className={language === "es" ? "pill pill-dark" : "pill"}
                  onClick={() => changeLanguage("es")}
                >
                  ES
                </button>
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                border: "1px solid #eadbc8",
                borderRadius: "18px",
                background: "#f8efe3"
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <div>
                  <strong>{t.notifications}</strong>
                  <p style={{ marginTop: "6px", color: "#6d5650" }}>
                    {(t as any) .notificationsDescription}
                  </p>
                </div>
              </label>
            </div>

            <div
              style={{
                padding: "16px",
                border: "1px solid #eadbc8",
                borderRadius: "18px",
                background: "#f8efe3"
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <input
                  type="checkbox"
                  checked={marketingEmails}
                  onChange={(e) => setMarketingEmails(e.target.checked)}
                />
                <div>
                  <strong>{(t as any) .marketingEmails}</strong>
                  <p style={{ marginTop: "6px", color: "#6d5650" }}>
                    {(t as any) .marketingDescription}
                  </p>
                </div>
              </label>
            </div>

            <div
              style={{
                padding: "16px",
                border: "1px solid #eadbc8",
                borderRadius: "18px",
                background: "#f8efe3"
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <input
                  type="checkbox"
                  checked={privateProfile}
                  onChange={(e) => setPrivateProfile(e.target.checked)}
                />
                <div>
                  <strong>{(t as any) .privateProfile}</strong>
                  <p style={{ marginTop: "6px", color: "#6d5650" }}>
                    {(t as any) .privateProfileDescription}
                  </p>
                </div>
              </label>
            </div>

            <button type="submit" className="primary-btn auth-btn">
              {(t as any) .save}
            </button>

            {savedMessage && (
              <p style={{ color: "#5c1d36", marginTop: 12, fontWeight: 600 }}>
                {savedMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}