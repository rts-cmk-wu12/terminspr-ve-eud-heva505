// Importer / استيراد
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }) {
  const store = await cookies();
  const raw = store.get("ld_user")?.value;

  if (raw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(raw));
      const token = parsed?.user?.token;
      const validUntil = parsed?.validUntil ?? null; // الكوكي يخزن validUntil على الجذر
      const notExpired = !validUntil || Number(validUntil) > Date.now();

      if (token && notExpired) {
        const next =
          typeof searchParams?.next === "string" &&
          searchParams.next.startsWith("/")
            ? searchParams.next
            : "/calendar";
        redirect(next);
      }
    } catch {}
  }

  return <LoginClient />;
}
