"use client";
import logo from "../images/imgg/logo.webp";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const loggedIn = sessionStorage.getItem("updToken") ? true : false;

  const handleLogOut = () => {
    sessionStorage.removeItem("updToken");
    window.location.reload();
  };

  return (
    <header className="">
      {!mobileMenuOpen && (
        <nav
          aria-label="Global"
          className="bg-black sticky top-0 z-50 w-full border-b-2 border-b-customyellow mx-auto flex max-w-7xl items-center justify-between lg:px-8 p-2"
        >
          <div className="flex flex-1">
            <a href="/" className="flex flex-row align-middle">
              <span className="sr-only">Your Company</span>
              <img alt="logo" src={logo} className="w-10" />
              <div className="text-left ml-3 my-auto">
                <h1 className="text-customyellow text-xl ">Join The Spark *</h1>
              </div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 text-sm/6 text-white">
            <a href="problem">Common Practices</a>
            <a href="contact-us">Contact Us</a>
            <a href="about-us">About Us</a>
          </div>
          {!loggedIn && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-sm/6 font-extrabold text-customyellow"
              >
                LOG IN
              </button>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="text-sm/6 font-bold text-white bg-customyellow pl-2 pr-2 rounded-md ml-5"
              >
                SIGN UP
              </button>
            </div>
          )}
          {loggedIn && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <button
                onClick={() => handleLogOut()}
                className="text-sm/6 font-bold text-white bg-customyellow pl-2 pr-2 rounded-md ml-5"
              >
                LOG OUT
              </button>
            </div>
          )}
        </nav>
      )}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="flex flex-row p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="h-14 w-auto" />
              <div className="text-left ml-3">
                <h1 className="font-extrabold text-customyellow text-xl">
                  Upd
                </h1>
                <h2 className="font-bold">Join the Spark *</h2>
              </div>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="problem"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Common Practices
                </a>
                <a
                  href="contact-us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Contact Us
                </a>
                <a
                  href="about-us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  About Us
                </a>
              </div>
              {!loggedIn && (
                <div className="py-6">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="text-lg font-extrabold text-white bg-customyellow w-full p-3 rounded-lg"
                  >
                    LOG IN
                  </button>
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="text-lg font-extrabold text-customyellow bg-white w-full p-3 rounded-lg"
                  >
                    SIGN UP
                  </button>
                </div>
              )}
              {loggedIn && (
                <div className="py-6">
                  {" "}
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="text-lg font-extrabold text-customyellow bg-white w-full p-3 rounded-lg"
                  >
                    LOG OUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignUpOpen={() => setIsSignupOpen(true)}
      />
      <SignupForm
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onLoginOpen={() => setIsLoginOpen(true)}
      />
    </header>
  );
}
