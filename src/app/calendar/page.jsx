"use client";
// Importer / استيراد

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import {
  getEnrollmentsByUser,
  getActivity,
  getActivitiesByInstructor,
  getEnrollmentsByActivity,
} from "@/lib/apiClient";
// Komponent / المكوّن الرئيسي

export default function CalendarPage() {
  const { user } = useUser();
  const [state, setState] = // Tilstand / حالة
    useState({ loading: true, error: "", items: [] });

  // Effekt / تأثير جانبي
  useEffect(() => {
    async function load() {
      if (!user) {
        setState({ loading: false, error: "", items: [] });
        return;
      }
      setState((s) => ({ ...s, loading: true, error: "" }));
      try {
        if (user.role === "instructor") {
          const acts = await getActivitiesByInstructor(user.id);
          const withCounts = await Promise.all(
            acts.map(async (a) => {
              const ens = await getEnrollmentsByActivity(a.id);
              return { ...a, count: ens.length };
            })
          );
          setState({ loading: false, error: "", items: withCounts });
        } else {
          const ens = await // API-kald
          getEnrollmentsByUser(user.id);
          const acts = await Promise.all(
            ens.map((e) => getActivity(e.activityId))
          );
          const merged = acts.map((a, i) => ({
            ...a,
            enrollmentId: ens[i].id,
          }));
          setState({ loading: false, error: "", items: merged });
        }
      } catch (e) {
        setState({
          loading: false,
          error: e.message || "Kunne ikke hente kalenderen.",
          items: [],
        });
      }
    }
    load();
  }, [user?.id, user?.role]);

  if (!user) {
    // UI
    return (
      <section className="mx-auto w-full max-w-[411px] min-h-[100svh] bg-[#5B235B] text-white">
        <h2 className="px-4 pt-6 text-24 font-semibold">Kalender</h2>
        <p className="opacity-80 mb-3">Log ind for at se din kalender.</p>
        <Link
          href="/login"
          className="inline-block rounded-xl bg-purpleDark text-white px-4 py-2"
        >
          Log ind
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[411px] min-h-[100svh] bg-[#5B235B] text-black">
      <h2 className="px-4 pt-6 text-24 font-semibold text-white">Kalender</h2>
      {state.error && (
        <div className="mb-3 rounded-xl bg-red-50 text-red-800 px-4 py-2">
          {state.error}
        </div>
      )}

      {state.loading && <p className="opacity-70">Indlæser…</p>}

      {!state.loading && !state.error && state.items.length === 0 && (
        <p className="opacity-70">Ingen tilmeldinger endnu.</p>
      )}

      {!state.loading && !state.error && state.items.length > 0 && (
        <ul className="space-y-3">
          {user.role === "instructor"
            ? state.items.map((a) => (
                <li
                  key={a.id}
                  className="rounded-2xl p-4 bg-white border border-ink/10"
                >
                  <div className="text-18 font-medium">{a.name}</div>
                  <div className="text-sm opacity-70 mb-2">
                    {a.weekday} • {a.time}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">
                      Tilmeldte: {a.count}
                    </span>
                    <Link
                      href={`/calendar/hold/${a.id}`}
                      className="rounded-xl bg-purpleDark text-white px-3 py-1 text-sm"
                    >
                      Hold-oversigt
                    </Link>
                  </div>
                </li>
              ))
            : state.items.map((a) => (
                <li
                  key={a.enrollmentId}
                  className="rounded-2xl p-4 bg-white border border-ink/10"
                >
                  <div className="text-18 font-medium">{a.name}</div>
                  <div className="text-sm opacity-70">
                    {a.weekday} • {a.time}
                  </div>
                </li>
              ))}
        </ul>
      )}
    </section>
  );
}
