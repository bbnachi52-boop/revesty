"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("revesty-reviews");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviews(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        setReviews([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("revesty-reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = ({ productId, productTitle, rating, author, comment }) => {
    const newReview = {
      id: Date.now() + Math.random(),
      productId,
      productTitle,
      rating,
      author,
      comment,
      date: new Date().toISOString()
    };

    setReviews((prev) => [newReview, ...prev]);
  };

  const getReviewsByProduct = (productId) => {
    return reviews.filter((review) => review.productId === productId);
  };

  const getAverageRating = (productId) => {
    const productReviews = reviews.filter((review) => review.productId === productId);

    if (productReviews.length === 0) return 0;

    const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return total / productReviews.length;
  };

  const value = useMemo(() => {
    return {
      reviews,
      addReview,
      getReviewsByProduct,
      getAverageRating
    };
  }, [reviews]);

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error("useReviews must be used inside ReviewProvider");
  }

  return context;
}