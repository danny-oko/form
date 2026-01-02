"use client";
import React from "react";

const PrimaryButton = ({
  type = "button",
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-black text-white w-[416px] h-[44px] rounded-[6px] disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
