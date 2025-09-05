// Importer / استيراد
import { getActivity } from "@/lib/apiClient";
import ActivityDetailsClient from "@/components/ActivityDetailsClient";

export const dynamic = "force-dynamic";

export async function HoldPage({ params }) {
  const { id } = await params;
  const activity = await // API-kald
  getActivity(id);
  return <ActivityDetailsClient activity={activity} />;
}

export default async function HoldOverview({ params }) {
  const { id } = await params;
  const act = await getActivity(id);
  const users = Array.isArray(act?.users) ? act.users : [];

  // UI
  return (
    <section className="max-w-sm mx-auto px-4 pt-6">
      <h2 className="text-24 font-semibold mb-2">Kalender – Holdoversigt</h2>
      <p className="opacity-80 mb-4">
        Deltagere for: <span className="font-medium">{act?.name}</span>
      </p>

      {users.length === 0 ? (
        <p className="opacity-70">Ingen tilmeldinger endnu.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="rounded-xl bg-white border border-ink/10 px-4 py-3 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">
                  {u.firstname ? `${u.firstname} ${u.lastname}` : u.username}
                </div>
                <div className="text-sm opacity-70">
                  Alder: {u.age} • Rolle: {u.role}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
