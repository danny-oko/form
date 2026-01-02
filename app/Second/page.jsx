"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "@/app/Components/PrimaryButton";
import BackBtn from "@/app/Components/BackBtn";

const Page = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  step,
  totalSteps,
}) => {
  const [error, setError] = useState({
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("sign_up_data");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setFormData((prev) => ({
        ...prev,
        email: parsed.email || "",
        tel: parsed.tel || "",
        password: parsed.password || "",
        confirmPassword: parsed.confirmPassword || "",
      }));
    } catch (err) {
      console.log("failed to parse sign up data:", err);
    }
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("invalid email format ");
      return;
    }
    if (name === "tel" && !/^\+?\d{8}$/.test(value)) {
      setError("invalid phone number format");
      return;
    }

    setError("");
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      localStorage.setItem("sign_up_data", JSON.stringify(next));
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const step2 = {
      email: formData.email.trim(),
      tel: formData.tel.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

    if (
      !step2.email ||
      !step2.tel ||
      !step2.password ||
      !step2.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (step2.password !== step2.confirmPassword) {
      setError("passwords do not match");
      return;
    }

    const prev = JSON.parse(localStorage.getItem("sign_up_data") || "{}");
    const merged = { ...prev, ...step2 };
    localStorage.setItem("sign_up_data", JSON.stringify(merged));

    nextStep();
  };

  return (
    <div className="w-w-default h-h-default bg-white rounded-lg flex flex-col justify-between items-center p-[32px]">
      <div className="container w-full h-[385px] flex flex-col justify-between">
        <section className="top-container w-[416px]">
          <aside className="heading flex flex-col gap-1">
            <img src="/logo.png" alt="" width={60} height={60} />
            <h1 className="text-title text-3xl font-semibold">Join Us! 😎</h1>
            <p className="text-muted text-lg font-normal">
              Please provide all current information accurately.
            </p>
          </aside>
        </section>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-3 mt-[28px] "
        >
          <div className="each flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold">
              Email <span className="text-red">*</span>
            </label>
            <input
              type="text"
              className="border border-border rounded-lg w-full h-[44px] p-[8px]"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {error && <p className="text-red text-sm">{error}</p>}
          </div>

          <div className="each flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold">
              Phone Number <span className="text-red">*</span>
            </label>
            <input
              type="text"
              className="border border-border rounded-lg w-full h-[44px] p-[8px]"
              placeholder="Phone Number"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
            />
            {error && <p className="text-red text-sm">{error}</p>}
          </div>
          <div className="each flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold">
              Password<span className="text-red">*</span>
            </label>
            <input
              type="password"
              className="border border-border rounded-lg w-full h-[44px] p-[8px]"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {error && <p className="text-red text-sm">{error}</p>}
          </div>
          <div className="each flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold">
              Password<span className="text-red">*</span>
            </label>
            <input
              type="password"
              className="border border-border rounded-lg w-full h-[44px] p-[8px]"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {error && <p className="text-red text-sm">{error}</p>}
          </div>

          <div className="flex gap-2">
            <BackBtn />
            <PrimaryButton type="submit">
              Continue {step + 1} / {totalSteps}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
