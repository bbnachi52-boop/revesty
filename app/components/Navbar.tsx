"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import { useLanguage } from "../lib/useLanguage";
import { useShop } from "../store/shopStore";
import { useMessages } from "../store/messageStore";

type NavbarProps = {
  search?: string;
  setSearch?: (value: string) => void;
};

export default function Navbar({ search = "", setSearch }: NavbarProps) {
  const { t, language, changeLanguage } = useLanguage();
  const { cart, favorites } = useShop();
  const { conversations } = useMessages();

  const [open, setOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("revesty-user-login");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.isLoggedIn) {
          setLoggedUser(parsed);
          return;
        }
      } catch {}
    }
    setLoggedUser(null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("revesty-user-login");
    window.location.href = "/";
  };

  const inboxCount = Array.isArray(conversations)
  ? (conversations as any[]).length
  : 0;

  return (
    <header className="navbar-wrapper">
      <div className="navbar">
        <div className="navbar-top-row">
          <BrandLogo />
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {setSearch && (
          <input
            type="text"
            className="search-input"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        <div className={`nav-actions ${open ? "nav-open" : ""}`}>
          <div style={{ display: "flex", gap: "6px" }}>
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

          <Link href="/" className="pill">
            🏠 {t.home}
          </Link>

          <Link href="/browse" className="pill">
            {t.browse}
          </Link>

          <Link href="/favorites" className="pill">
            ❤️ {favorites.length}
          </Link>

          <Link href="/cart" className="pill">
            🛒 {cart.length}
          </Link>

          <Link href="/my-listings" className="pill">
            {t.myListings}
          </Link>

          <Link href="/account" className="pill">
            {loggedUser?.name || t.account}
          </Link>

          <Link href="/inbox" className="pill">
            {t.inbox}
            {inboxCount > 0 ? ` (${inboxCount})` : ""}
          </Link>

          <Link href="/sell" className="pill pill-dark">
            {t.sell}
          </Link>

          {loggedUser?.isLoggedIn ? (
            <button type="button" className="pill" onClick={handleLogout}>
              {language === "es" ? "Cerrar sesión" : "Logout"}
            </button>
          ) : (
            <>
              <Link href="/login" className="pill">
                {t.login}
              </Link>

              <Link href="/signup" className="pill pill-dark">
                {t.signup}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}