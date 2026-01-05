"use client";

import { useState } from "react";
import Final from "./Final/page";
import First from "./First/page";
import Second from "./Second/page";
import Third from "./Third/page";

const Page = () => {
  const steps = [First, Second, Third, Final];

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
    date: "",
    img: "",
  });

  const CurrentStep = steps[step];

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="container w-full h-screen flex flex-col items-center justify-center bg-main">
      <CurrentStep
        formData={formData}
        setFormData={setFormData}
        step={step}
        totalSteps={steps.length}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </div>
  );
};

export default Page;
