import React, { useState, useEffect } from "react";

const ChatBubble: React.FC<{ backgroundImageUrl?: string }> = ({
  backgroundImageUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<
    { sender: string; text: string; timestamp: string }[]
  >([]);
  const [input, setInput] = useState("");

  // Handle screen resize to hide chat bubble on small screens
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 600);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleChatIcon = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(false);
  };

  const handleMenuSelection = (option: string) => {
    setIsMenuOpen(false);
    if (option === "admin") {
      setIsOpen(true);
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Hello! How can I assist you today?",
          timestamp,
        },
      ]);
    } else if (option === "fanpage") {
      window.open("https://www.facebook.com/yourfanpage", "_blank"); // Replace with your fanpage URL
    } else if (option === "zalo") {
      window.open("https://zalo.me/yourzalo", "_blank"); // Replace with your Zalo URL
    } else if (option === "instagram") {
      window.open("https://www.instagram.com/yourinstagram", "_blank"); // Replace with your Instagram URL
    } else if (option === "telegram") {
      window.open("https://t.me/yourtelegram", "_blank"); // Replace with your Telegram URL
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMessage = { sender: "user", text: input, timestamp };
    setMessages((prev) => [...prev, userMessage]);

    const botReply = {
      sender: "bot",
      text: "Thank you for reaching out, we will respond as soon as possible!",
      timestamp,
    };
    setTimeout(() => {
      setMessages((prev) => [...prev, botReply]);
    }, 500);

    setInput("");
  };

  if (!isVisible) return null;

  return (
    <div>
      {/* Chat Bubble Icon */}
      {(!isOpen || !isMenuOpen) && (
        <div
          onClick={handleToggleChatIcon}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#007bff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
            animation: "pulse 2s infinite",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          💬
        </div>
      )}

      {/* Chat Menu */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 200,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
            overflow: "hidden",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              padding: "10px 0",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {/* Admin */}
            <button
              onClick={() => handleMenuSelection("admin")}
              style={{
                padding: "10px 16px",
                textAlign: "left",
                backgroundColor: "transparent",
                border: "none",
                color: "#333",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <i
                className="fas fa-user-shield"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              ></i>
              <div style={{ fontWeight: "bold" }}>Admin</div>
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleMenuSelection("fanpage")}
              style={{
                padding: "10px 16px",
                textAlign: "left",
                backgroundColor: "transparent",
                border: "none",
                color: "#333",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <i
                className="fab fa-facebook"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#1877f2",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              ></i>
              <div style={{ fontWeight: "bold" }}>Facebook</div>
            </button>

            {/* Zalo */}
            <button
              onClick={() => handleMenuSelection("zalo")}
              style={{
                padding: "10px 16px",
                textAlign: "left",
                backgroundColor: "transparent",
                border: "none",
                color: "#333",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <i
                className="fas fa-comment"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#0068ff",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              ></i>
              <div style={{ fontWeight: "bold" }}>Zalo</div>
            </button>

            {/* Instagram */}
            <button
              onClick={() => handleMenuSelection("instagram")}
              style={{
                padding: "10px 16px",
                textAlign: "left",
                backgroundColor: "transparent",
                border: "none",
                color: "#333",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <i
                className="fab fa-instagram"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              ></i>
              <div style={{ fontWeight: "bold" }}>Instagram</div>
            </button>

            {/* Telegram */}
            <button
              onClick={() => handleMenuSelection("telegram")}
              style={{
                padding: "10px 16px",
                textAlign: "left",
                backgroundColor: "transparent",
                border: "none",
                color: "#333",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <i
                className="fab fa-telegram-plane"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#0088cc",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              ></i>
              <div style={{ fontWeight: "bold" }}>Telegram</div>
            </button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            width: "100%",
            maxWidth: 400,
            height: "80%",
            maxHeight: 600,
            borderRadius: "12px 12px 0 0",
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "slideUp 0.3s ease",
            backgroundImage: backgroundImageUrl
              ? `url(${backgroundImageUrl})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
              color: "#fff",
              padding: "12px 20px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span>Chat Support</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 18,
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "rotate(90deg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "rotate(0deg)")
              }
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              backgroundColor: backgroundImageUrl
                ? "rgba(255, 255, 255, 0.9)"
                : "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  alignItems: "flex-end",
                  gap: "8px",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor:
                      msg.sender === "user" ? "#007bff" : "#e0e0e0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontSize: "0.9rem",
                    flexShrink: 0,
                  }}
                >
                  {msg.sender === "user" ? "U" : "B"}
                </div>

                {/* Message Bubble */}
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "10px 14px",
                    borderRadius:
                      msg.sender === "user"
                        ? "16px 16px 0 16px"
                        : "16px 16px 16px 0",
                    backgroundColor: msg.sender === "user" ? "#007bff" : "#fff",
                    color: msg.sender === "user" ? "#fff" : "#333",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    wordWrap: "break-word",
                    position: "relative",
                  }}
                >
                  {msg.text}
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color:
                        msg.sender === "user"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "#999",
                      marginTop: "4px",
                      textAlign: "right",
                    }}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              padding: "12px 20px",
              borderTop: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              gap: "10px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: "20px",
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: "0.9rem",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#007bff")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: "10px 20px",
                borderRadius: "20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                transition: "background-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.95)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Inline CSS for Animations */}
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
            }
          }

          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChatBubble;
