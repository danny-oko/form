"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BackBtn = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 rounded-md border border-gray-300 text-sm"
    >
      Back
    </button>
  );
};

export default BackBtn;
