export async function GET() {
  const base = (
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:4000"
  ).replace(/\/$/, "");
  const urls = [`${base}/activities`, `${base}/api/activities`];
  const out = [];
  for (const u of urls) {
    try {
      const r = await // API-kald
      fetch(u, { cache: "no-store" });
      out.push({
        url: u,
        ok: r.ok,
        status: r.status,
        statusText: r.statusText,
      });
    } catch (e) {
      out.push({ url: u, ok: false, error: String(e) });
    }
  }
  return Response.json({ base, results: out });
}
