import React, { useState, useEffect } from 'react';

const ChatBubble: React.FC<{ backgroundImageUrl?: string }> = ({ backgroundImageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  // Handle screen resize to hide chat bubble on small screens
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 600);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Hello! How can I assist you today?' },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botReply = { sender: 'bot', text: 'Thank you for reaching out, we will respond as soon as possible!' };
    setMessages((prev) => [...prev, botReply]);

    setInput('');
  };

  if (!isVisible) return null;

  return (
    <div>
      {!isOpen && (
        <div
          onClick={handleToggleChat}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: '#007bff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          💬
        </div>
      )}

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '100%',
            maxWidth: 400,
            height: '80%',
            border: '1px solid #ccc',
            borderRadius: '8px 8px 0 0',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 16px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            Chat Support
            <button
              onClick={handleToggleChat}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: 16,
              overflowY: 'auto',
              backgroundColor: '#f9f9f9',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '10px 14px',
                    borderRadius: 16,
                    backgroundColor: msg.sender === 'user' ? '#007bff' : '#e0e0e0',
                    color: msg.sender === 'user' ? '#fff' : '#000',
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: 'flex',
              padding: '10px 16px',
              borderTop: '1px solid #ccc',
              backgroundColor: '#fff',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 20,
                border: '1px solid #ccc',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                marginLeft: 10,
                padding: '10px 20px',
                borderRadius: 20,
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;