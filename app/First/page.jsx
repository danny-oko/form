"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "@/app/components/PrimaryButton";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

const Page = ({
  formData = {},
  setFormData,
  nextStep,
  prevStep,
  step = 0,
  totalSteps = 4,
}) => {
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("sign_up_data");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      console.log(parsed);
      setFormData((prev) => ({
        ...(prev || {}),
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        userName: parsed.userName || "",
      }));
    } catch (err) {
      console.log("failed to parse sign up data:", err);
    }
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "firstName" || name === "lastName") && /\d/.test(value)) {
      setError("Inputs are not allowed digits");
      return;
    }

    setError("");

    setFormData((prev) => {
      const next = { ...(prev || {}), [name]: value };
      localStorage.setItem("sign_up_data", JSON.stringify(next));
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const step1 = {
      firstName: (formData?.firstName || "").trim(),
      lastName: (formData?.lastName || "").trim(),
      userName: (formData?.userName || "").trim(),
    };

    if (!step1.firstName || !step1.lastName || !step1.userName) {
      setError("all fields are required");
      return;
    }

    const prev = JSON.parse(localStorage.getItem("sign_up_data") || "{}");
    const merged = { ...prev, ...step1 };
    localStorage.setItem("sign_up_data", JSON.stringify(merged));

    console.log(step1);
    console.log(merged);

    nextStep();
  };

  return (
    <motion.div
      className="w-w-default h-h-default bg-white rounded-lg flex flex-col justify-between items-center p-[32px]"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
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
          className="w-full flex flex-col gap-3 mt-[28px]"
        >
          <div className="container h-[420px] flex flex-col justify-between ">
            <div className="forms-container flex flex-col gap-2">
              <div className="each flex flex-col gap-1">
                <label className="flex gap-1 text-sm font-semibold">
                  First Name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  className="border border-border rounded-lg w-full h-[44px] p-[8px]"
                  placeholder="First Name"
                  name="firstName"
                  value={formData?.firstName || ""}
                  onChange={handleChange}
                />
                {error && <p className="text-red text-sm">{error}</p>}
              </div>
              <div className="each flex flex-col gap-1">
                <label className="flex gap-1 text-sm font-semibold">
                  Last Name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  className="border border-border rounded-lg w-full h-[44px] p-[8px]"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData?.lastName || ""}
                  onChange={handleChange}
                />
                {error && <p className="text-red text-sm">{error}</p>}
              </div>
              <div className="each flex flex-col gap-1">
                <label className="flex gap-1 text-sm font-semibold">
                  User Name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  className="border border-border rounded-lg w-full h-[44px] p-[8px]"
                  placeholder="User Name"
                  name="userName"
                  value={formData?.userName || ""}
                  onChange={handleChange}
                />
                {error && <p className="text-red text-sm">{error}</p>}
              </div>
            </div>
            <div>
              <PrimaryButton type="submit">
                Continue {step + 1} / {totalSteps - 1}
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Page;
