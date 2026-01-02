"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "@/app/Components/PrimaryButton";
const page = (formData, setFormData, steps, nextStep) => {
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("sign_up_data" || "{}");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setFormData((parsed) => ({
        ...prev,
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        userName: parsed.userName || "",
      }));
    } catch (err) {
      console.log("Failed to return data:", err);
    }
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || (name === "lastName" && /\.d/.test(value))) {
      setError("Numbers are not allowed");
    }
    setError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
    localStorage.setItem("sign_up_data", JSON.stringify(next));
    console.log(next);
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="w-w-default h-h-default bg-white rounded-lg flex flex-col justify-between items-center p-[32px]">
      {/* headline */}
      <div className="container w-full h-[385px] flex flex-col justify-between">
        <section className="top-container w-[416px] ">
          <aside className="heading flex flex-col gap-1">
            <img src="/logo.png" alt="" width={60} height={60} />
            <h1 className="text-title text-3xl font-semibold">Join Us! 😎</h1>
            <p className="text-muted text-lg font-normal">
              Please provide all current information accurately.
            </p>
          </aside>
        </section>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="w-full h-auto flex flex-col justify-start justify-start gap-3"
        >
          {/*First name*/}
          <div className="each flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold">
              First Name <p className="text-red">*</p>
            </label>
            <input
              type="text"
              className="border border-border rounded-lg w-full h-[44px] p-[8px]"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          {/* Last Name */}
          <div className="each flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold">
              Last Name <p className="text-red">*</p>
            </label>
            <input
              type="text"
              className="border border-border rounded-lg w-full h-[44px] p-[8px]"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          {/* User Name */}
          <div className="each flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold">
              User Name <p className="text-red">*</p>
            </label>
            <input
              type="text"
              className="border border-border rounded-lg w-full h-[44px] p-[8px]"
              placeholder="User Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      {/*button*/}
      <PrimaryButton />
    </div>
  );
};

export default page;
