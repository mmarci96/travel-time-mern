import React, { useState } from "react";
import Button from "./Button";
import ToggleForms from "../auth/ToggleForms"

const LoginAlert = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center mx-auto my-16">
      <p>
        You must be logged in to access this page!
      </p>
        <Button
        children={"Sign in"}
        onClick={togglePopup}
        color="cyan"
        />

      {/* Popup overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50 "
          onClick={togglePopup} // Close popup when clicking outside
        >
          {/* Popup window */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 relative overflow-y-scroll"
            style={{
              width: "min(640px, 66.67vw)",
              height: "72vh",
              maxWidth: "640px",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              onClick={togglePopup}
              className="absolute top-4 right-4 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Create account or sign in!</h2>
            < ToggleForms />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginAlert;

