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
  const languageData: any = useLanguage();
  const shopData: any = useShop();
  const messageData: any = useMessages();

  const t = languageData?.t || {};
  const language = languageData?.language || "en";
  const changeLanguage = languageData?.changeLanguage;

  const cart = Array.isArray(shopData?.cart) ? shopData.cart : [];
  const favorites = Array.isArray(shopData?.favorites) ? shopData.favorites : [];
  const conversations = Array.isArray(messageData?.conversations)
    ? messageData.conversations
    : [];

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

  const inboxCount = conversations.length;

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
            placeholder={t.searchPlaceholder || "Search items..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        <div className={`nav-actions ${open ? "nav-open" : ""}`}>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={language === "en" ? "pill pill-dark" : "pill"}
              onClick={() => (changeLanguage as any)("en")}
            >
              EN
            </button>

            <button
              type="button"
              className={language === "es" ? "pill pill-dark" : "pill"}
              onClick={() => (changeLanguage as any)("es")}
            >
              ES
            </button>
          </div>

          <Link href="/" className="pill">
            🏠 {t.home || "Home"}
          </Link>

          <Link href="/browse" className="pill">
            {t.browse || "Browse"}
          </Link>

          <Link href="/favorites" className="pill">
            ❤️ {favorites.length}
          </Link>

          <Link href="/cart" className="pill">
            🛒 {cart.length}
          </Link>

          <Link href="/my-listings" className="pill">
            {t.myListings || "My Listings"}
          </Link>

          <Link href="/account" className="pill">
            {loggedUser?.name || t.account || "Account"}
          </Link>

          <Link href="/inbox" className="pill">
            {t.inbox || "Inbox"}
            {inboxCount > 0 ? ` (${inboxCount})` : ""}
          </Link>

          <Link href="/sell" className="pill pill-dark">
            {t.sell || "Sell"}
          </Link>

          {loggedUser?.isLoggedIn ? (
            <button type="button" className="pill" onClick={handleLogout}>
              {language === "es" ? "Cerrar sesión" : "Logout"}
            </button>
          ) : (
            <>
              <Link href="/login" className="pill">
                {t.login || "Login"}
              </Link>

              <Link href="/signup" className="pill pill-dark">
                {t.signup || "Sign Up"}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}