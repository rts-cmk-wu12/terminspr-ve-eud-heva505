"use client";
// Importer / استيراد
import { useEffect, useState } from "react";
import ActivityCard from "@/components/ActivityCard";
import { getActivities } from "@/lib/apiClient";
// Komponent / المكوّن الرئيسي

export default function ActivitiesPage() {
  const [activities, setActivities] = useState(null); // Tilstand / حالة
  const [error, setError] = useState("");

  // Effekt / تأثير جانبي
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const items = await // API-kald /
        getActivities();
        if (alive) setActivities(items);
      } catch (e) {
        if (alive) {
          setActivities([]);
          setError(e?.message || "Kunne ikke hente aktiviteter.");
        }
      }
    })();

    // UI
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-[411px] min-h-[100svh] bg-purpleDark">
      <h2 className="px-4 pt-6 text-24 font-semibold text-white">
        Aktiviteter
      </h2>

      {error && (
        <p className="mt-4 mx-4 rounded-xl bg-white/10 text-white px-4 py-3">
          {error}
        </p>
      )}

      <ul className="space-y-4 px-4 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))]">
        {activities === null && (
          <li className="rounded-2xl bg-white/10 p-4 text-white/80">Henter…</li>
        )}

        {Array.isArray(activities) && activities.length === 0 && !error && (
          <li className="rounded-2xl bg-white/10 p-4 text-white/80">
            Ingen aktiviteter fundet.
          </li>
        )}

        {Array.isArray(activities) &&
          activities.length > 0 &&
          activities.map((a) => <ActivityCard key={a.id} activity={a} />)}
      </ul>
    </section>
  );
}
