"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { useLanguage } from "@/app/lib/useLanguage";
import { useMessages } from "@/app/store/messageStore";

export default function InboxPage() {
  const languageData: any = useLanguage();
  const messagesStore: any = useMessages();

  const language = languageData?.language || "en";

  const conversations = Array.isArray(messagesStore?.conversations)
    ? messagesStore.conversations
    : [];

  const sendReply =
    typeof messagesStore?.sendReply === "function"
      ? messagesStore.sendReply
      : () => {};

  const [replyText, setReplyText] = useState<Record<number, string>>({});

  const handleReply = (conversationId: number) => {
    const text = replyText[conversationId]?.trim();
    if (!text) return;

    sendReply(conversationId, text);

    setReplyText((prev) => ({
      ...prev,
      [conversationId]: ""
    }));
  };

  return (
    <main>
      <Navbar />

      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 20px"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "2.2rem",
            color: "#5c1d36"
          }}
        >
          Inbox
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#7a6a6a",
            marginBottom: "30px"
          }}
        >
          {language === "es"
            ? "Tus conversaciones con vendedores."
            : "Your conversations with sellers."}
        </p>

        {conversations.length === 0 ? (
          <div className="empty-state-card">
            {language === "es"
              ? "No tienes mensajes todavía."
              : "You have no messages yet."}
          </div>
        ) : (
          conversations.map((conversation: any, index: number) => (
            <div
              key={conversation.id || index}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "20px",
                marginBottom: "25px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
              }}
            >
              <h3 style={{ marginBottom: "10px", color: "#5c1d36" }}>
                {conversation.productTitle || "Product"}
              </h3>

              <p style={{ color: "#999", marginBottom: "15px" }}>
                {language === "es"
                  ? "Conversación activa"
                  : "Active conversation"}
              </p>

              {/* MENSAJES */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "15px"
                }}
              >
                {(conversation.messages || []).map(
                  (msg: any, i: number) => (
                    <div
                      key={msg.id || i}
                      style={{
                        alignSelf:
                          msg.sender === "user" ? "flex-end" : "flex-start",
                        background:
                          msg.sender === "user"
                            ? "#5c1d36"
                            : "#f1e6dc",
                        color:
                          msg.sender === "user"
                            ? "#fff"
                            : "#3a2a2a",
                        padding: "10px 14px",
                        borderRadius: "16px",
                        maxWidth: "70%"
                      }}
                    >
                      <div style={{ fontSize: "12px", opacity: 0.8 }}>
                        {msg.sender === "user"
                          ? language === "es"
                            ? "Tú"
                            : "You"
                          : language === "es"
                          ? "Vendedor"
                          : "Seller"}
                      </div>

                      <div>{msg.text}</div>
                    </div>
                  )
                )}
              </div>

              {/* INPUT */}
              <div
                style={{
                  display: "flex",
                  gap: "10px"
                }}
              >
                <input
                  type="text"
                  value={replyText[conversation.id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [conversation.id]: e.target.value
                    }))
                  }
                  placeholder={
                    language === "es"
                      ? "Escribe tu mensaje..."
                      : "Reply here..."
                  }
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #ddd"
                  }}
                />

                <button
                  onClick={() => handleReply(conversation.id)}
                  style={{
                    background: "#5c1d36",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  {language === "es" ? "Enviar" : "Send"}
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}