// components/Button.jsx
import React from "react";

const Button = ({ type = "button", onClick, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="button bg-black cursor-pointer rounded-[6px] text-white w-[416px] h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* {children} */}
      Continue 1 / 3
    </button>
  );
};

export default Button;
