"use client";
// Importer / استيراد

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getActivities } from "@/lib/apiClient";
import ActivityCard from "@/components/ActivityCard";
// Komponent / المكوّن الرئيسي

export default function SearchPage() {
  const [q, setQ] = useState(""); // Tilstand / حالة
  const [all, setAll] = useState(null); // null = loading

  // Effekt / تأثير جانبي
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const items = await // API-kald
        getActivities();
        if (alive) setAll(items);
      } catch {
        if (alive) setAll([]);
      }
    })();
    // UI
    return () => {
      alive = false;
    };
  }, []);

  const results = // Memo / حفظ محاسبات
    useMemo(() => {
      if (!Array.isArray(all)) return [];
      const s = q.trim().toLowerCase();
      if (!s) return all;
      return all.filter((a) => (a.name || "").toLowerCase().includes(s));
    }, [all, q]);

  return (
    <section className="mx-auto w-full max-w-[411px] min-h-[100svh] bg-[#5B235B]">
      <h2 className="px-4 pt-6 text-24 font-semibold text-white">Søg</h2>

      <div className="relative px-4 mt-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Søg efter aktiviteter…"
          className="w-full rounded-2xl border border-white/20 bg-white text-[#1b1b1d] placeholder-black/40 px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-white/40"
        />
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-black/50"
        >
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79L20 21.5 21.5 20l-6-6zm-6 0A4.5 4.5 0 119.5 5a4.5 4.5 0 010 9z"
          />
        </svg>
      </div>

      <div className="px-4 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))]">
        {all === null && (
          <p className="rounded-2xl bg-white/10 text-white/80 px-4 py-3">
            Henter…
          </p>
        )}

        {Array.isArray(all) && results.length === 0 && q.trim().length > 0 && (
          <p className="rounded-2xl bg-white/10 text-white/90 px-4 py-3">
            Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget
            andet.
          </p>
        )}

        {Array.isArray(all) && results.length > 0 && (
          <ul className="space-y-4">
            {results.map((a) => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
