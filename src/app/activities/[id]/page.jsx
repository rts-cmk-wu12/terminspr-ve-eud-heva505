// Importer / استيراد
import ActivityDetailsClient from "@/components/ActivityDetailsClient";

import { getActivity } from "@/lib/apiClient";

export const dynamic = "force-dynamic";

export default async function ActivityDetailsPage({ params }) {
  const { id } = await params;
  const activity = await // API-kald
  getActivity(id);
  return <ActivityDetailsClient activity={activity} />;
}
