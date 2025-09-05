"use client";
// Importer / استيراد

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { enroll, leaveEnrollment, getEnrollmentsByUser } from "@/lib/apiClient";
import { useUser } from "@/context/UserContext";

function normalizeAssetUrl(u) {
  if (!u) return "";
  try {
    const url = new URL(u);
    const base = new URL(
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:4000"
    );
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      url.protocol = base.protocol;
      url.host = base.host;
    }
    return url.toString();
  } catch {
    return u;
  }
}

function ageRange(minAge, maxAge) {
  if (minAge != null && maxAge != null) return `${minAge}-${maxAge} år`;
  if (minAge != null) return `${minAge}+ år`;
  if (maxAge != null) return `≤ ${maxAge} år`;
  return "Aldersgruppe";
}
// Komponent / المكوّن الرئيسي

export default function ActivityDetailsClient({ activity }) {
  const router = useRouter(); // Navigation / التنقّل
  const { user } = useUser();
  const isLoggedIn = Boolean(user?.id);

  const [myEnrollments, setMyEnrollments] = // Tilstand / حالة
    useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const img = // Memo / حفظ محاسبات
    useMemo(
      () => normalizeAssetUrl(activity?.asset?.url || activity?.image || ""),
      [activity]
    );

  const enrolledCount = Array.isArray(activity?.users)
    ? activity.users.length
    : 0;
  const max = Number(activity?.maxParticipants ?? 0);
  const seatsLeft = max > 0 ? Math.max(0, max - enrolledCount) : null;

  // Effekt / تأثير جانبي
  useEffect(() => {
    let alive = true;
    async function load() {
      if (!isLoggedIn) return;
      try {
        const rows = await // API-kald
        getEnrollmentsByUser(user.id);
        if (alive) setMyEnrollments(rows);
      } catch {
        if (alive) setMyEnrollments([]);
      }
    }
    load();
    // UI
    return () => {
      alive = false;
    };
  }, [isLoggedIn, user?.id]);

  const isEnrolled = useMemo(() => {
    if (!isLoggedIn) return false;
    return myEnrollments.some(
      (e) => Number(e.activityId) === Number(activity?.id)
    );
  }, [myEnrollments, isLoggedIn, activity?.id]);

  useEffect(() => {
    if (!isLoggedIn || !activity?.id) return;
    try {
      const pending = localStorage.getItem("ld_pending_enroll");
      if (pending && String(pending) === String(activity.id) && !isEnrolled) {
        (async () => {
          try {
            setLoading(true);
            await enroll(user.id, activity.id);
            localStorage.removeItem("ld_pending_enroll");
            const rows = await getEnrollmentsByUser(user.id);
            setMyEnrollments(rows);
            router.refresh?.();
          } catch (e) {
            console.error("Auto-enroll failed:", e);
          } finally {
            setLoading(false);
          }
        })();
      }
    } catch {}
  }, [isLoggedIn, activity?.id]); // نعتمد فقط على الدخول ومعرّف النشاط

  async function handleEnroll() {
    if (!isLoggedIn) {
      try {
        localStorage.setItem("ld_pending_enroll", String(activity.id));
      } catch {}
      const next = encodeURIComponent(`/activities/${activity.id}`);
      router.push(`/login?next=${next}`);
      return;
    }

    if (isEnrolled) {
      setMsg("Du er allerede tilmeldt dette hold.");
      return;
    }

    const age = Number(user?.age ?? NaN);
    const min = activity?.minAge ?? -Infinity;
    const maxAge = activity?.maxAge ?? Infinity;
    if (!Number.isNaN(age) && (age < min || age > maxAge)) {
      setMsg("Du er ikke inden for aldersgrænsen for dette hold.");
      return;
    }

    try {
      setLoading(true);
      await enroll(user.id, activity.id);
      setMsg("Du er nu tilmeldt.");
      const rows = await getEnrollmentsByUser(user.id);
      setMyEnrollments(rows);
      router.refresh?.();
    } catch (e) {
      setMsg(e?.message || "Kunne ikke tilmelde.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLeave() {
    if (!isLoggedIn) {
      const next = encodeURIComponent(`/activities/${activity.id}`);
      router.push(`/login?next=${next}`);
      return;
    }
    try {
      setLoading(true);
      await leaveEnrollment(`${user.id}:${activity.id}`);
      setMsg("Du har forladt holdet.");
      const rows = await getEnrollmentsByUser(user.id);
      setMyEnrollments(rows);
      try {
        const pending = localStorage.getItem("ld_pending_enroll");
        if (pending && String(pending) === String(activity.id)) {
          localStorage.removeItem("ld_pending_enroll");
        }
      } catch {}
      router.refresh?.();
    } catch (e) {
      setMsg(e?.message || "Kunne ikke forlade holdet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[411px] min-h-[100svh] bg-[#5B235B] text-white">
      {}
      <div className="relative w-full">
        <img
          src={img || "/activities/placeholder.jpg"}
          alt={activity?.name || "Aktivitet"}
          className="w-full h-[420px] object-cover"
          loading="eager"
        />

        {}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6">
          <button
            onClick={isEnrolled ? handleLeave : handleEnroll}
            disabled={loading}
            className="px-10 py-3 rounded-2xl shadow-[0_6px_12px_rgba(0,0,0,0.25)] bg-[#6D2A6D] hover:bg-[#7b2f7b] text-white text-[14px] font-medium disabled:opacity-60"
          >
            {loading ? "..." : isEnrolled ? "Forlad" : "Tilmeld"}
          </button>
        </div>
      </div>

      {}
      <section
        className="
          mt-0 w-full rounded-none bg-[#4B1E4B]
          pb-[calc(96px+env(safe-area-inset-bottom))]
          min-h-[calc(100svh-420px)]
        "
      >
        <div className="p-4">
          <h1 className="text-[18px] font-semibold">{activity?.name}</h1>
          <p className="text-[13px] opacity-90 mt-1">
            {ageRange(activity?.minAge, activity?.maxAge)}
          </p>

          <div className="text-[13px] opacity-90 mt-3">
            {activity?.weekday && (
              <span className="capitalize">{activity.weekday}</span>
            )}
            {activity?.time && <span> • {activity.time}</span>}
          </div>

          <ul className="mt-3 space-y-1 text-[13px] opacity-90">
            {typeof seatsLeft === "number" && (
              <li>
                <span className="opacity-80">Pladser:</span> {enrolledCount}/
                {max} {seatsLeft === 0 ? "(fuldt)" : `(ledig: ${seatsLeft})`}
              </li>
            )}
            {activity?.instructorId != null && (
              <li>
                <span className="opacity-80">Instruktør-ID:</span>{" "}
                {activity.instructorId}
              </li>
            )}
          </ul>

          {activity?.description && (
            <p className="mt-3 text-[13px] leading-[1.5] opacity-95 whitespace-pre-wrap">
              {activity.description}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
