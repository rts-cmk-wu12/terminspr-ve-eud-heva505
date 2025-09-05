"use client";
// Importer / استيراد

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, enroll } from "@/lib/apiClient"; // أضفنا enroll
// Komponent / المكوّن الرئيسي

export default function LoginClient() {
  const router = useRouter(); // Navigation / التنقّل
  const [username, setUsername] = useState(""); // Tilstand / حالة
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    if (!username || !password) {
      setMsg("Udfyld brugernavn og adgangskode.");
      return;
    }

    try {
      setLoading(true);

      const res = await login(username, password);
      const user = res?.user || res;
      const token = res?.token || user?.token || "";

      const payload = {
        user: { ...user, token },
        remember: !!remember,
        validUntil: remember ? Date.now() + 30 * 24 * 60 * 60 * 1000 : null,
      };
      const encoded = encodeURIComponent(JSON.stringify(payload));
      const cookie = [
        `ld_user=${encoded}`,
        "path=/",
        remember ? `expires=${new Date(payload.validUntil).toUTCString()}` : "",
        "SameSite=Lax",
      ]
        .filter(Boolean)
        .join("; ");
      document.cookie = cookie;

      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "/calendar";

      try {
        const pending = localStorage.getItem("ld_pending_enroll");
        if (pending) {
          await // API-kald
          enroll(user.id, Number(pending));
          localStorage.removeItem("ld_pending_enroll");
        }
      } catch (err) {
        console.error("Auto-enroll failed:", err);
      }

      router.replace(next);
    } catch (err) {
      setMsg("Forkert brugernavn eller adgangskode.");
    } finally {
      setLoading(false);
    }
  }

  // UI
  return (
    <div className="relative mx-auto w-full max-w-[411px] min-h-[100svh] overflow-hidden bg-[#EED6EE] text-[#1b1b1d]">
      {}
      <img
        src="/splash-image.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <img
        src="/Rectangle.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 w-[120%] max-w-none select-none"
      />

      {}
      <div className="relative z-10 grid min-h-[100svh] place-items-center px-6">
        <form onSubmit={onSubmit} className="w-full max-w-[320px]">
          <h1 className="mb-5 text-3xl font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            Log ind
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              autoComplete="username"
              placeholder="brugernavn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-white/40 bg-white/95 px-4 py-3 text-[15px] placeholder-black/50 outline-none focus:ring-2 focus:ring-white/60"
            />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="adgangskode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/40 bg-white/95 px-4 py-3 text-[15px] placeholder-black/50 outline-none focus:ring-2 focus:ring-white/60"
            />

            <label className="flex items-center gap-2 text-sm text-white/90">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-[#6D2A6D]"
              />
              Husk mig (cookies)
            </label>

            {msg && (
              <p className="rounded-xl bg-white/90 px-3 py-2 text-sm text-[#6b1f6b]">
                {msg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#5B235B] px-5 py-3 text-center text-white shadow-[0_6px_12px_rgba(0,0,0,0.25)] hover:bg-[#6D2A6D] disabled:opacity-60"
            >
              {loading ? "Logger ind…" : "Log ind"}
            </button>
          </div>
        </form>
      </div>

      {}
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-transparent to-[#e9cfe9]" />
    </div>
  );
}
