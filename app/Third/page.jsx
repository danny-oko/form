"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "@/app/components/PrimaryButton";
import BackBtn from "@/app/components/BackBtn";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

const Page = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  totalSteps,
  step,
}) => {
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("sign_up_data");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setFormData((prev) => ({
        ...prev,
        date: parsed.date || "",
        img: parsed.img || "",
      }));
    } catch {
      setError("failed to retrieve data from local storage");
    }
  }, [setFormData]);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    setError("");

    if (name === "date") {
      setFormData((prev) => {
        const next = { ...prev, date: value };
        localStorage.setItem("sign_up_data", JSON.stringify(next));
        return next;
      });
      return;
    }

    if (name === "img") {
      const file = files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file.");
        return;
      }

      try {
        const base64 = await fileToBase64(file);
        setFormData((prev) => {
          const next = { ...prev, img: base64 };
          localStorage.setItem("sign_up_data", JSON.stringify(next));
          return next;
        });
      } catch {
        setError("Could not read the image file.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const step3 = { date: formData.date?.trim(), img: formData.img };

    if (!step3.date || !step3.img) {
      setError("You must fill all inputs");
      return;
    }

    const prev = JSON.parse(localStorage.getItem("sign_up_data") || "{}");
    const merged = { ...prev, ...step3 };
    localStorage.setItem("sign_up_data", JSON.stringify(merged));
    nextStep();
  };

  return (
    <motion.div
      className="w-w-default h-h-default bg-white rounded-lg flex flex-col items-center p-[32px]"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container">
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
          <div className="handler flex flex-col justify-between h-[420px]">
            <div className="forms-container flex flex-col gap-2">
              <div className="each flex flex-col gap-1">
                <label className="flex gap-1 text-sm font-semibold">
                  Date <span className="text-red">*</span>
                </label>
                <input
                  type="date"
                  className="border border-border rounded-lg w-full h-[44px] p-[8px]"
                  name="date"
                  value={formData?.date || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="each flex flex-col gap-1">
                <label className="flex gap-1 text-sm font-semibold">
                  Profile image <span className="text-red">*</span>
                </label>

                {/* hide the real input */}
                <input
                  id="img"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="img"
                  onChange={handleChange}
                />

                {/* clickable box */}
                <label
                  htmlFor="img"
                  className={[
                    "relative w-full h-[180px] rounded-lg border border-border",
                    "bg-[#F6F6F6] flex items-center justify-center cursor-pointer",
                    "overflow-hidden",
                    "hover:bg-[#F2F2F2] transition",
                  ].join(" ")}
                >
                  {/* preview */}
                  {formData.img ? (
                    <>
                      <img
                        src={formData.img}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />

                      {/* small edit icon top-right */}
                      <span className="absolute top-2 right-2 w-8 h-8 rounded-md bg-black/70 flex items-center justify-center">
                        {/* tiny pencil icon (no libs) */}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 20H21"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted">
                      <span className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.5 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M21 15l-5-5L5 21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>

                      <p className="text-sm font-medium text-title">
                        Add image
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {error && <p className="text-red text-sm">{error}</p>}
            </div>

            <div className="buttons flex gap-2">
              <BackBtn type="button" onClick={prevStep} />
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
