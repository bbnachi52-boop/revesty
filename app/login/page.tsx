"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useLanguage } from "../lib/useLanguage";

export default function LoginPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("revesty-user");
    if (!savedUser) {
      alert(language === "es" ? "Primero crea una cuenta" : "Please create an account first");
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if (form.email === parsedUser.email && form.password === parsedUser.password) {
      localStorage.setItem(
        "revesty-user-login",
        JSON.stringify({
          name: parsedUser.name,
          email: parsedUser.email,
          isLoggedIn: true
        })
      );
      router.push("/account");
    } else {
      alert(language === "es" ? "Correo o contraseña incorrectos" : "Incorrect email or password");
    }
  };

  return (
    <main>
      <Navbar />
      <section className="simple-page">
        <div className="auth-card">
          <h1 className="auth-title" style={{ marginBottom: "10px", color: "#5c1d36" }}>
            {t.loginTitle}
          </h1>
          <p className="auth-subtitle">{t.loginSubtitle}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              name="email"
              type="email"
              placeholder={t.email}
              onChange={handleChange}
              value={form.email}
              className="form-input"
            />

            <div style={{ position: "relative" }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={t.password}
                onChange={handleChange}
                value={form.password}
                className="form-input"
                style={{ paddingRight: "52px" }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#7a1f3d",
                  fontSize: "1rem"
                }}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            <button type="submit" className="primary-btn">{t.loginButton}</button>
          </form>

          <p className="auth-switch">
            {t.noAccount} <Link href="/signup" className="auth-link">{t.createAccount}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}