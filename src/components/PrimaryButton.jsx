// Komponent / المكوّن الرئيسي
export default function PrimaryButton({ className = "", children, ...props }) {
  // UI
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center",
        "w-[249px] h-[54px] rounded-[10px]",
        "bg-purpleDark text-white border border-[#5E2E53]",
        "text-[16px] font-medium shadow-md hover:opacity-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purpleLight",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
