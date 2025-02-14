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
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch("http://34.31.251.108:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        // alert("User registered Successfully")
        onClose(); // Close the modal
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
              {/* First Name */}
              <div className="w-1/2 px-2">
                <label className="block">
                  First Name
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
              {/* Last Name */}
              <div className="w-1/2 px-2">
                <label className="block">
                  Last Name
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
              {/* Email */}
              <div className="w-1/2 px-2 mt-4">
                <label className="block">
                  Email
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
              {/* Password */}
              <div className="w-1/2 px-2 mt-4">
                <label className="block">
                  Password
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
              {/* Phone Number */}
              <div className="w-1/2 px-2 mt-4">
                <label className="block">
                  Phone Number
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
              {/* Country */}
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
            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-customblue text-white p-2 rounded font-bold"
              >
                Sign Up
              </button>
            </div>
          </form>
          {errorMessage && (
            <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-4 text-green-500 text-sm">{successMessage}</p>
          )}
          <div className="flex justify-between p-12 pb-0 pt-2">
            <span>Already have an account? </span>
            <button
              onClick={handleLoginOpen}
              className="bg-white text-customblue font-bold"
            >
              LOG IN
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
