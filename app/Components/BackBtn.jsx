"use client";
import React from "react";

const BackBtn = ({ onBack, disabled }) => {
  return (
    <button
      type="button"
      onClick={onBack}
      disabled={disabled}
      className="px-4 py-2 w-[128px] rounded-md border border-gray-300 text-sm disabled:opacity-50"
    >
      Back
    </button>
  );
};

export default BackBtn;
