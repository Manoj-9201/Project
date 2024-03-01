// import React, { useState } from "react";
// import "../pages/Chatbot.css";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     const inputMessage = e.target.message.value;
//     if (inputMessage.trim() !== "") {
//       // Process user message or send it to your chatbot backend
//       // and get the response
//       const request = await fetch("http://localhost:5001/question", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: inputMessage }),
//       });

//       const response = await request.json();
//       const answer = response.answer;

//       setMessages([
//         ...messages,
//         { content: inputMessage, sender: "user" },
//         { content: answer, sender: "bot" },
//       ]);
//       e.target.reset();
//     }
//   };

//   return (
//     <div className={`chatbot ${isOpen ? "open" : ""}`}>
//       <div className="chat-header" onClick={handleToggle}>
//         <h3>Chatbot</h3>
//         <div className="toggle-icon">
//           {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
//         </div>
//       </div>
//       <div className="chat-messages">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`message ${message.sender === "user" ? "user" : "bot"}`}
//           >
//             {message.content}
//           </div>
//         ))}
//       </div>
//       <form className="chat-form" onSubmit={handleSendMessage}>
//         <input type="text" name="message" placeholder="Type your message" />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useEffect, useState } from "react";
import "../pages/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState([]);
  const [options, setOptions] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    startChatSession();
  }, []);
  const startChatSession = async () => {
    const request = await fetch("http://localhost:5001/start", {
      method: "POST",
    });
    const response = await request.json();
    console.log(response);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const inputMessage = e.target.message.value;
    const message = inputMessage.trim();
    if (message !== "") {
      if (messages.length === 0) {
        await startChatSession();
      }
    }
    // const inputMessage = e.target.message.value;
    // if (inputMessage.trim() !== "") {
    const request = await fetch("http://localhost:5001/continue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: message }),
    });

    const response = await request.json();
    const botResponse = convertResponseToString(response.response.response);
    const botOptions = response.response.options;
    console.log(response);
    console.log(botResponse);
    console.log(botOptions);
    setMessages([
      ...messages,
      { content: message, sender: "user" },
      { content: botResponse, sender: "bot" },
    ]);
    setInputMessage("");
    setOptions(botOptions);
  };
  const convertResponseToString = (response) => {
    if (typeof response === "object") {
      // Convert objects and arrays to JSON strings
      return JSON.stringify(response);
    } else {
      // Return other types as is (e.g., strings, numbers)
      return response.toString();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleOptionSelect = async (option) => {
    const request = await fetch("http://localhost:5001/continue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: option }),
    });

    const response = await request.json();
    const botResponse = convertResponseToString(response.response);

    setMessages((messages) => [
      ...messages,
      { content: option, sender: "user" },
      { content: botResponse, sender: "bot" },
    ]);
    setOptions(botResponse);
  };

  return (
    <div className={`chatbot ${isOpen ? "open" : ""}`}>
      <div className="chat-header" onClick={handleToggle}>
        <h3>Chatbot</h3>
        <div className="toggle-icon">
          {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {Array.isArray(options) && options.length > 0 && (
        <div className="options">
          {options.map((option) => (
            <button key={option.id} onClick={() => handleOptionSelect(option)}>
              {option.title}
            </button>
          ))}
        </div>
      )}

      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          name="message"
          placeholder="Type your message"
          value={inputMessage}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
