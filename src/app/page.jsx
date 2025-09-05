"use client";
// Importer / استيراد

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoWordmark from "@/components/LogoWordmark";
import PrimaryButton from "@/components/PrimaryButton";
// Komponent / المكوّن الرئيسي

export default function WelcomePage() {
  const router = useRouter(); // Navigation / التنقّل
  const [revealBtn, setRevealBtn] = useState(false); // Tilstand / حالة

  // Effekt / تأثير جانبي
  useEffect(() => {
    const t = setTimeout(() => setRevealBtn(true), 1500);
    // UI
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex justify-center min-h-[100svh] overflow-hidden">
      {}
      <div className="relative w-full max-w-[411px] min-h-[100svh]">
        {}
        <img
          src="/splash-image.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purpleLight/25 via-white/10 to-purpleLight/30" />

        {}
        <LogoWordmark
          className="absolute left-1/2 -translate-x-2/2 -translate-y-1/2"
          style={{
            top: "55%",
            width: "min(200px, calc(100% - 32px))",
          }}
        />

        {}
        <div
          className={[
            "absolute left-1/2 -translate-x-1/2",
            "transition-all duration-500 ease-out",
            revealBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
          style={{ bottom: "max(14%, env(safe-area-inset-bottom))" }}
        >
          <PrimaryButton onClick={() => router.push("/activities")}>
            Kom i gang
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
