"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products as initialProducts } from "./products";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [cartIds, setCartIds] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("revesty-products");
      const savedCart = localStorage.getItem("revesty-cart");
      const savedFavorites = localStorage.getItem("revesty-favorites");
      const savedMyListings = localStorage.getItem("revesty-myListings");

      let loadedProducts = initialProducts;

      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        if (Array.isArray(parsedProducts)) {
          loadedProducts = parsedProducts;
        }
      } else if (savedMyListings) {
        const parsedListings = JSON.parse(savedMyListings);
        if (Array.isArray(parsedListings)) {
          loadedProducts = [
            ...parsedListings.map((item) => ({
              ...item,
              isUserListing: true
            })),
            ...initialProducts
          ];
        }
      }

      setProducts(loadedProducts);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          if (parsedCart.length > 0 && typeof parsedCart[0] === "object") {
            setCartIds(parsedCart.map((item) => item.id).filter(Boolean));
          } else {
            setCartIds(parsedCart.filter(Boolean));
          }
        }
      }

      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);

        if (Array.isArray(parsedFavorites)) {
          if (parsedFavorites.length > 0 && typeof parsedFavorites[0] === "object") {
            setFavoriteIds(parsedFavorites.map((item) => item.id).filter(Boolean));
          } else {
            setFavoriteIds(parsedFavorites.filter(Boolean));
          }
        }
      }

      localStorage.removeItem("revesty-myListings");
    } catch (error) {
      setProducts(initialProducts);
      setCartIds([]);
      setFavoriteIds([]);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("revesty-products", JSON.stringify(products));
  }, [products, hasLoaded]);

  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("revesty-cart", JSON.stringify(cartIds));
  }, [cartIds, hasLoaded]);

  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("revesty-favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds, hasLoaded]);

  const cart = useMemo(() => {
    return cartIds
      .map((id) => products.find((item) => item.id === id))
      .filter(Boolean);
  }, [cartIds, products]);

  const favorites = useMemo(() => {
    return favoriteIds
      .map((id) => products.find((item) => item.id === id))
      .filter(Boolean);
  }, [favoriteIds, products]);

  const myListings = useMemo(() => {
    return products.filter((item) => item.isUserListing);
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      isUserListing: true
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const addListing = (product) => {
    return addProduct(product);
  };

  const updateListing = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item
      )
    );
  };

  const deleteListing = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCartIds((prev) => prev.filter((itemId) => itemId !== id));
    setFavoriteIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const addToCart = (product) => {
    if (!product?.id) return;
    setCartIds((prev) => [...prev, product.id]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartIds((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCartIds([]);
  };

  const addToFavorites = (product) => {
    if (!product?.id) return;

    setFavoriteIds((prev) => {
      if (prev.includes(product.id)) return prev;
      return [...prev, product.id];
    });
  };

  const removeFromFavorites = (indexToRemove) => {
    setFavoriteIds((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const value = useMemo(() => {
    return {
      products,
      cart,
      favorites,
      myListings,
      addProduct,
      addListing,
      updateListing,
      deleteListing,
      addToCart,
      removeFromCart,
      clearCart,
      addToFavorites,
      removeFromFavorites
    };
  }, [products, cart, favorites, myListings]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
}