"use client";
import React from "react";

const BackBtn = ({ type = "button", onClick, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 w-[128px] rounded-md border border-gray-300 text-sm disabled:opacity-50 cursor-pointer"
    >
      Back
    </button>
  );
};

export default BackBtn;
