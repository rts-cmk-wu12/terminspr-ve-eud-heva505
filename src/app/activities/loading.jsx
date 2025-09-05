// Komponent / المكوّن الرئيسي
export default function LoadingActivities() {
  // UI
  return (
    <section className="max-w-sm mx-auto px-4 pt-6">
      <h2 className="text-24 font-semibold mb-4">Activities</h2>
      <ul className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="rounded-2xl p-4 bg-white border border-ink/10">
            <div className="h-5 w-1/2 bg-ink/10 rounded mb-2" />
            <div className="h-4 w-1/3 bg-ink/10 rounded" />
          </li>
        ))}
      </ul>
    </section>
  );
}
