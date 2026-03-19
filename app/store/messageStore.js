"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const MessageContext = createContext(null);

export function MessageProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("revesty-conversations");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setConversations(parsed);
        }
      }
    } catch (error) {
      setConversations([]);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("revesty-conversations", JSON.stringify(conversations));
  }, [conversations, hasLoaded]);

  const createConversation = (product) => {
    if (!product) return;

    setConversations((prev) => {
      const existing = prev.find((c) => c.productId === product.id);
      if (existing) return prev;

      const newConversation = {
        id: Date.now(),
        productId: product.id,
        productTitle: product.title || "Product",
        messages: [
          {
            id: Date.now(),
            text: "Hi, is this still available?",
            sender: "user",
            date: new Date().toISOString()
          }
        ]
      };

      return [newConversation, ...prev];
    });
  };

  const sendMessage = (product, text) => {
    if (!product || !text?.trim()) return;

    setConversations((prev) => {
      const existing = prev.find((c) => c.productId === product.id);

      if (existing) {
        return prev.map((conv) =>
          conv.productId === product.id
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    id: Date.now(),
                    text,
                    sender: "user",
                    date: new Date().toISOString()
                  }
                ]
              }
            : conv
        );
      }

      const newConversation = {
        id: Date.now(),
        productId: product.id,
        productTitle: product.title || "Product",
        messages: [
          {
            id: Date.now(),
            text,
            sender: "user",
            date: new Date().toISOString()
          }
        ]
      };

      return [newConversation, ...prev];
    });
  };

  const sendReply = (conversationId, text) => {
    if (!text?.trim()) return;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: Date.now(),
                  text,
                  sender: "user",
                  date: new Date().toISOString()
                }
              ]
            }
          : conv
      )
    );
  };

  const value = useMemo(() => {
    return {
      conversations,
      createConversation,
      sendMessage,
      sendReply
    };
  }, [conversations]);

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessages must be used inside MessageProvider");
  }

  return context;
}