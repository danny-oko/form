"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../Components/PrimaryButton";
import BackBtn from "../Components/BackBtn";
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
    } catch (err) {
      setError("failed to retrieve data from local storage");
    }
  }, [setFormData]);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // dataURL string
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    setError("");

    // ✅ date input (normal)
    if (name === "date") {
      setFormData((prev) => {
        const next = { ...prev, date: value };
        localStorage.setItem("sign_up_data", JSON.stringify(next));
        return next;
      });
      return;
    }

    // ✅ image input (file -> base64 -> localStorage)
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
      } catch (err) {
        setError("Could not read the image file.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const step3 = {
      date: formData.date?.trim(),
      img: formData.img,
    };

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
    <div className="w-w-default h-h-default bg-white rounded-lg flex flex-col items-center p-[32px]">
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
          className="w-full flex flex-col gap-3 mt-[28px] w-full h-[420px] justify-evenly"
        >
          <div className="each flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold">
              Date <span className="text-red">*</span>
            </label>
            <input
              type="date"
              className="border border-border rounded-lg w-full h-[44px] p-[8px]"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="each flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold">
              Image <span className="text-red">*</span>
            </label>

            <input
              type="file"
              accept="image/*"
              className="border border-border rounded-lg w-[418px] h-[180px]"
              name="img"
              onChange={handleChange}
            />

            {/* {formData.img && (
            <img
              src={formData.img}
              alt="preview"
              className="w-24 h-24 object-cover rounded w-[418px] h-[180px] object-contain"
            />
          )} */}
          </div>

          {error && <p className="text-red text-sm">{error}</p>}
          <div className="buttons flex gap-2">
            <BackBtn />

            <PrimaryButton type="submit">
              Continue {step + 1} / {totalSteps - 1}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
