"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useLanguage } from "../lib/useLanguage";

export default function SignupPage() {
  const router = useRouter();
  const { t, language } = useLanguage() as any;
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert(language === "es" ? "Completa todos los campos" : "Please complete all fields");
      return;
    }

    const userData = {
      name: form.name,
      email: form.email,
      password: form.password
    };

    localStorage.setItem("revesty-user", JSON.stringify(userData));
    localStorage.setItem(
      "revesty-user-login",
      JSON.stringify({
        name: form.name,
        email: form.email,
        isLoggedIn: true
      })
    );

    router.push("/account");
  };

  return (
    <main>
      <Navbar />
      <section className="simple-page">
        <div className="auth-card">
          <h1 className="auth-title" style={{ marginBottom: "10px", color: "#5c1d36" }}>
            {(t as any) .signupTitle}
          </h1>
          <p className="auth-subtitle">{(t as any) .signupSubtitle}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              name="name"
              type="text"
              placeholder={(t as any) .name}
              onChange={handleChange}
              value={form.name}
              className="form-input"
            />

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

            <button type="submit" className="primary-btn">{(t as any) .signupButton}</button>
          </form>

          <p className="auth-switch">
            {(t as any) .haveAccount} <Link href="/login" className="auth-link">{(t as any) .signIn}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}