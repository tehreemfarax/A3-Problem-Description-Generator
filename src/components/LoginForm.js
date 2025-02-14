"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function LoginForm({ isOpen, onClose, onSignUpOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignupOpen = () => {
    onClose();
    onSignUpOpen();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://34.31.251.108:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Save token to localStorage
        sessionStorage.setItem("updToken", token);

        setSuccessMessage("Login successful!");
        // alert("Login successful!");
        onClose();
        window.location.reload();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
          <Dialog.Title className="text-xl font-bold">Log In</Dialog.Title>
          <form className="mt-4" onSubmit={handleLogin}>
            <label className="block mb-2">
              Email
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your email"
              />
            </label>
            <label className="block mb-4">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your password"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-customblue text-white p-2 rounded font-bold"
            >
              Log In
            </button>
          </form>
          {errorMessage && (
            <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-4 text-green-500 text-sm">{successMessage}</p>
          )}
          <div className="flex justify-between p-4 pb-0 pt-2">
            <span>Don't have an account? </span>
            <button
              onClick={handleSignupOpen}
              className="bg-white text-customblue font-bold"
            >
              SIGN UP
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
