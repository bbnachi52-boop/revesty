"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useMessages } from "@/app/store/messageStore";
import { useLanguage } from "@/app/lib/useLanguage";

export default function InboxPage() {
  const messagesStore = useMessages();
  const { language } = useLanguage();

  const conversations = Array.isArray(messagesStore?.conversations)
    ? messagesStore.conversations
    : [];

  const sendReply =
    typeof messagesStore?.sendReply === "function"
      ? messagesStore.sendReply
      : null;

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [text, setText] = useState("");

  const selectedConversation = useMemo(() => {
    if (selectedId === null) return conversations[0] || null;
    return conversations.find((conv: any) => conv.id === selectedId) || null;
  }, [conversations, selectedId]);

  const handleSend = () => {
    if (!text.trim() || !selectedConversation || !sendReply) return;
    sendReply(selectedConversation.id, text);
    setText("");
  };

  return (
    <main>
      <Navbar />

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "36px 24px 60px"
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px"
          }}
        >
          <h1
            style={{
              color: "#5c1d36",
              fontSize: "2.4rem",
              marginBottom: "10px"
            }}
          >
            {language === "es" ? "Inbox" : "Inbox"}
          </h1>

          <p style={{ color: "#6d5650" }}>
            {language === "es"
              ? "Tus conversaciones con vendedores."
              : "Your conversations with sellers."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: "20px",
            alignItems: "stretch"
          }}
        >
          <div
            style={{
              background: "#fcf7f1",
              border: "1px solid #eadbc8",
              borderRadius: "24px",
              padding: "16px",
              minHeight: "70vh",
              overflowY: "auto"
            }}
          >
            <h3 style={{ marginBottom: "16px", color: "#5c1d36" }}>
              {language === "es" ? "Mensajes" : "Messages"}
            </h3>

            {conversations.length === 0 ? (
              <p style={{ color: "#6d5650" }}>
                {language === "es"
                  ? "No tienes mensajes todavía."
                  : "No messages yet."}
              </p>
            ) : (
              conversations.map((conv: any) => {
                const lastMessage =
                  Array.isArray(conv.messages) && conv.messages.length > 0
                    ? conv.messages[conv.messages.length - 1]
                    : null;

                const isSelected =
                  (selectedConversation && selectedConversation.id === conv.id) ||
                  (!selectedConversation && conversations[0]?.id === conv.id);

                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => setSelectedId(conv.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "14px",
                      borderRadius: "16px",
                      cursor: "pointer",
                      background: isSelected ? "#f8efe3" : "transparent",
                      border: isSelected
                        ? "1px solid #e2cdb8"
                        : "1px solid transparent",
                      marginBottom: "10px"
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        color: "#2f1e1e"
                      }}
                    >
                      {conv.productTitle ||
                        (language === "es" ? "Producto" : "Product")}
                    </strong>

                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#6d5650",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {lastMessage?.text ||
                        (language === "es"
                          ? "Sin mensajes"
                          : "No messages")}
                    </p>
                  </button>
                );
              })
            )}
          </div>

          <div
            style={{
              background: "#fcf7f1",
              border: "1px solid #eadbc8",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              minHeight: "70vh",
              overflow: "hidden"
            }}
          >
            {selectedConversation ? (
              <>
                <div
                  style={{
                    padding: "18px 20px",
                    borderBottom: "1px solid #eadbc8",
                    background: "#fcf7f1"
                  }}
                >
                  <strong style={{ color: "#5c1d36", fontSize: "1.05rem" }}>
                    {selectedConversation.productTitle ||
                      (language === "es" ? "Conversación" : "Conversation")}
                  </strong>

                  {selectedConversation.productId && (
                    <div style={{ marginTop: "8px" }}>
                      <Link
                        href={`/product/${selectedConversation.productId}`}
                        className="pill"
                      >
                        {language === "es" ? "Ver producto" : "View product"}
                      </Link>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    flex: 1,
                    padding: "18px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    background: "#fffaf5"
                  }}
                >
                  {Array.isArray(selectedConversation.messages) &&
                  selectedConversation.messages.length > 0 ? (
                    selectedConversation.messages.map((msg: any, index: number) => {
                      const isUser =
                        msg.sender === "user" ||
                        msg.role === "user" ||
                        msg.from === "user" ||
                        msg.author === "user";

                      return (
                        <div
                          key={msg.id || index}
                          style={{
                            alignSelf: isUser ? "flex-end" : "flex-start",
                            background: isUser ? "#5c1d36" : "#f8efe3",
                            color: isUser ? "white" : "#2f1e1e",
                            padding: "12px 16px",
                            borderRadius: "18px",
                            maxWidth: "72%",
                            lineHeight: 1.5
                          }}
                        >
                          {msg.text}
                        </div>
                      );
                    })
                  ) : (
                    <p style={{ color: "#6d5650" }}>
                      {language === "es"
                        ? "Todavía no hay mensajes en esta conversación."
                        : "There are no messages in this conversation yet."}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    padding: "14px",
                    borderTop: "1px solid #eadbc8",
                    display: "flex",
                    gap: "10px",
                    background: "#fcf7f1"
                  }}
                >
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={
                      language === "es"
                        ? "Escribe un mensaje..."
                        : "Write a message..."
                    }
                    className="form-input"
                  />

                  <button
                    type="button"
                    className="primary-btn"
                    onClick={handleSend}
                  >
                    {language === "es" ? "Enviar" : "Send"}
                  </button>
                </div>
              </>
            ) : (
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  color: "#6d5650",
                  padding: "24px"
                }}
              >
                {language === "es"
                  ? "Selecciona una conversación."
                  : "Select a conversation."}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}