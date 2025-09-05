"use client";
// Komponent / المكوّن الرئيسي
export default function ErrorActivities({ error }) {
  // UI
  return (
    <section className="max-w-sm mx-auto px-4 pt-6">
      <h2 className="text-24 font-semibold mb-3">Activities</h2>
      <div className="rounded-xl bg-red-50 text-red-800 px-4 py-3">
        {String(error?.message || error)}
      </div>
    </section>
  );
}
