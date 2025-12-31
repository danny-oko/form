"use client";
import React from "react";
import { useRouter } from "next/router";

const SecondaryButton = (onClick, type = "button", disabled = false) => {
  return (
    <button
      className="button bg-black cursor-pointer rounded-[6px] text-white w-[416px] h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
      onclick={onclick}
      type={type}
      disabled={disabled}
    >
      Continue
    </button>
  );
};

export default SecondaryButton;
