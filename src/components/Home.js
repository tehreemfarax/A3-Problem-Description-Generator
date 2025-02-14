import React, { useState, useEffect, useRef } from "react";
import NewChatForm from "./NewChatPopUp";
import { Dialog, DialogPanel } from "@headlessui/react";
import { ChatSharp, DeleteForeverOutlined } from "@mui/icons-material";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [newChatPopUp, setNewChatPopUp] = useState(false);
  const [chatBarOpen, setChatBarOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(0);
  const chatContainerRef = useRef(null); // Ref for the chat container

  const assistants = {
    Default: 0,
    "Problem Description": 1,
    "Current State": 2,
    Goal: 3,
    "Root Causes": 4,
    Countermeasures: 5,
    "Implementation Plan": 6,
    Control: 7,
    Sustain: 8,
  };

  // Function to scroll the chat container to the bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom whenever messages change or activeChat changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  const handleAssistantChange = async (event) => {
    const selectedAssistantValue = event.target.value;
    console.log(selectedAssistantValue);
    setSelectedAssistant(selectedAssistantValue);

    if (!activeChat) return;

    const activeChatName = chats.find((chat) => chat.id === activeChat)?.name;

    try {
      const token = sessionStorage.getItem("updToken");
      const response = await fetch("http://34.31.251.108:5000/get-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chat_name: activeChatName,
          thread_number: selectedAssistantValue,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      const fetchedMessages = data.user_message;

      // Process the messages to alternate between bot and user messages
      const processedMessages = fetchedMessages.reverse().map((message, index) => ({
        sender: index % 2 === 0 ? "user" : "bot",
        text: message,
      }));

      setMessages((prev) => ({
        ...prev,
        [activeChat]: processedMessages,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (activeChat) {
      handleAssistantChange({ target: { value: selectedAssistant } });
    }
  }, [activeChat]);

  const handleTemplate = async () => {
    const activeChatName = chats.find((chat) => chat.id === activeChat)?.name;
    
    if (!activeChatName) {
      console.error("No active chat selected.");
      return;
    }
  
    try {
      const token = sessionStorage.getItem("updToken");
      const response = await fetch("http://34.31.251.108:5000/download-chat-csv", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_name: activeChatName }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch CSV: ${errorText}`);
      }
  
      // Convert response to Blob and create a download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeChatName}_data.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };
  

  const fetchChats = async () => {
    try {
      const token = sessionStorage.getItem("updToken");
      const response = await fetch("http://34.31.251.108:5000/getChats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chats");
      }
      const data = await response.json();
      setChats(
        data.chats.map((chat, index) => ({
          id: index + 1, // Assign an ID if not provided
          name: chat.chat_name,
          step: 0, // Default step value
          thread_id: chat.thread_id, // Store thread_id if needed
        }))
      );
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const sendMessage = async () => {
    if (!currentMessage.trim() || !activeChat) return;

    const userMessage = { sender: "user", text: currentMessage };
    const botPlaceholderMessage = { sender: "bot", text: "Loading..." };

    setMessages((prev) => ({
      ...prev,
      [activeChat]: [
        ...(prev[activeChat] || []),
        userMessage,
        botPlaceholderMessage,
      ],
    }));

    const activeChatName = chats.find((chat) => chat.id === activeChat)?.name;

    try {
      console.log(activeChatName);
      const response = await fetch("http://34.31.251.108:5000/gpt-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("updToken")}`,
        },
        body: JSON.stringify({
          prompt: currentMessage,
          chat_name: activeChatName,
          thread_number: selectedAssistant,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to fetch bot response");

      const data = await response.json();

      setMessages((prev) => {
        const updatedMessages = [...(prev[activeChat] || [])];
        updatedMessages.pop(); // Remove the placeholder message
        updatedMessages.push({ sender: "bot", text: data.assistant_response }); // Add actual response
        return { ...prev, [activeChat]: updatedMessages };
      });
    } catch (error) {
      console.error("Error fetching bot response:", error);

      setMessages((prev) => {
        const updatedMessages = [...(prev[activeChat] || [])];
        updatedMessages.pop(); // Remove the placeholder message
        updatedMessages.push({
          sender: "bot",
          text: "Failed to get a response. Please try again.",
        });
        return { ...prev, [activeChat]: updatedMessages };
      });
    }

    setCurrentMessage(""); // Clear input field
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Dialog
        open={chatBarOpen}
        onClose={() => setChatBarOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogPanel className="fixed inset-y-0 left-0 w-2/3 bg-gray-800 text-white p-4 pt-20 z-10">
          <div className="flex flex-col h-full">
            <button
              onClick={() => setNewChatPopUp(true)}
              className="w-full py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-500"
            >
              New Chat
            </button>
            <div className="flex-1 mt-4 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setActiveChat(chat.id);
                    setChatBarOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 cursor-pointer border-b-2 border-b-gray-400 ${
                    activeChat === chat.id
                      ? "bg-gray-700"
                      : "hover:bg-gray-700 hover:bg-opacity-75"
                  }`}
                >
                  <span>{chat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      <div className="hidden lg:flex w-1/4 bg-gray-800 text-white flex-col">
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => setNewChatPopUp(true)}
            className="w-full py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-500"
          >
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-center justify-between p-4 cursor-pointer ${
                activeChat === chat.id
                  ? "bg-gray-700"
                  : "hover:bg-gray-700 hover:bg-opacity-75"
              }`}
            >
              <span>{chat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white flex flex-col">
        <div className="flex justify-between p-4 border-b border-gray-300 bg-gray-100">
          <ChatSharp
            className="text-customblue lg:hidden"
            onClick={() => setChatBarOpen(true)}
          />
          {activeChat ? (
            <h2>{chats.find((chat) => chat.id === activeChat)?.name} </h2>
          ) : (
            <h2>Select a chat or start a new one</h2>
          )}
          <select
            id="assistantDropdown"
            value={selectedAssistant}
            onChange={handleAssistantChange}
            className="border-b-2 border-black px-4 max-w-xl bg-transparent"
          >
            {Object.entries(assistants).map(([assistant, ass_no]) => (
              <option key={ass_no} value={ass_no}>
                {assistant.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div
          ref={chatContainerRef} // Attach the ref to the chat container
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {activeChat ? (
            (messages[activeChat] || []).map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white text-right"
                      : "bg-gray-200 text-gray-800 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-10">
              No chat selected
            </div>
          )}
        </div>
        {activeChat && (
          <div className="p-4 border-t border-gray-300 bg-gray-100">
            <div className="flex">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Send
              </button>
            </div>
            <button className="bg-lime-600 w-40 p-2 m-2 mb-0 text-white font-bold float-left" onClick={handleTemplate}>Generate Template</button>
          </div>
        )}
      </div>

      <NewChatForm
        isOpen={newChatPopUp}
        onClose={() => setNewChatPopUp(false)}
      />
    </div>
  );
};

export default Home;