import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function NewChatForm({ isOpen, onClose }) {
  const [chatName, setChatName] = useState("");
  const [buttonName, setButtonName] = useState("CREATE");

  const createChat = async (event) => {
    setButtonName("Chat maken...");
    event.preventDefault();
    console.log(chatName);
    const token = sessionStorage.getItem("updToken");
    console.log(token);
    if (!token) {
      alert("Gebruiker is niet geverifieerd.");
      setButtonName("CREËREN");
      return;
    }

    const response = await fetch("http://34.31.251.108:5000/initializeChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chat_name: chatName }),
    });

    if (response.ok) {
      onClose();
      window.location.reload();
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to initialize chat");
      setButtonName("CREËREN");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-80">
          <Dialog.Title className="text-xl font-bold">Nieuwe Chat</Dialog.Title>
          <form className="mt-4" onSubmit={createChat}>
            <label className="block mb-2">
              Chatnaam
              <input
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                placeholder="Geef uw chat een naam"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-customblue text-white p-2 rounded mt-4"
            >
              {buttonName}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
