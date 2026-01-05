"use client";

export default function UploadButton({ label = "Add image", ...props }) {
  return (
    <button
      type="button"
      className="w-full h-[200px] border border-dashed border-border rounded-[8px] bg-main flex flex-col items-center justify-center gap-2 text-sm text-muted hover:bg-white transition"
      {...props}
    >
      <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-lg">
        ⊕
      </span>
      {label}
    </button>
  );
}
