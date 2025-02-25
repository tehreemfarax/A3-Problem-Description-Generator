"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function SignupForm({ isOpen, onClose, onLoginOpen }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    country: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLoginOpen = () => {
    onClose();
    onLoginOpen();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://vcoach.upd.nl/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        onClose();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An unexpected error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-96">
          <Dialog.Title className="text-xl font-bold">Sign Up</Dialog.Title>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2">
                <label className="block">
                  Voornaam
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="John"
                  />
                </label>
              </div>
              <div className="w-1/2 px-2">
                <label className="block">
                  Achternaam
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Doe"
                  />
                </label>
              </div>
              <div className="w-1/2 px-2 mt-4">
                <label className="block">
                  E-mail
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="johndoe@gmail.com"
                  />
                </label>
              </div>
              <div className="w-1/2 px-2 mt-4">
                <label className="block">
                  Wachtwoord
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="12345678"
                  />
                </label>
              </div>
              <div className="w-1/2 px-2 mt-4">
                <label className="block">
                  Telefoonnummer
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="+310000000000"
                  />
                </label>
              </div>
              <div className="w-1/2 px-2 mt-4">
                <label className="block">
                  Country
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="ABC"
                  />
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-customblue text-white p-2 rounded font-bold"
              >
                Aanmelden
              </button>
            </div>
          </form>
          {errorMessage && (
            <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-4 text-green-500 text-sm">{successMessage}</p>
          )}
          <div className="flex justify-between p-8 pb-0 pt-4">
            <span>Heeft u al een account? </span>
            <button
              onClick={handleLoginOpen}
              className="bg-white text-customblue font-bold"
            >
              INLOGGEN
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
