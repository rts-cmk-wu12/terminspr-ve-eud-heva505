const BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:4000"
).replace(/\/$/, "");

async function hit(url, init = {}) {
  const res = await // API-kald / نداء API
  fetch(url, { cache: "no-store", ...init });
  if (!res.ok) {
    let msg = `HTTP ${res.status} ${res.statusText} @ ${url}`;
    try {
      const j = await res.json();
      if (j && j.error) msg = j.error;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

function getTokenFromCookie() {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )ld_user=([^;]+)/);
  if (!m) return null;
  try {
    const { user } = JSON.parse(decodeURIComponent(m[1]));
    return user?.token || null;
  } catch {
    return null;
  }
}

export async function login(username, password) {
  const body = new URLSearchParams({ username, password });
  const auth = await hit(`${BASE}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const { userId, token, role, validUntil } = auth;
  const userData = await hit(`${BASE}/api/v1/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const user = {
    id: userData.id,
    username: userData.username,
    role: userData.role || role,
    age: userData.age ?? null,
    firstname: userData.firstname || "",
    lastname: userData.lastname || "",
    token,
    validUntil,
  };
  return { user };
}

export async function getActivities() {
  return hit(`${BASE}/api/v1/activities`);
}

export async function getActivity(id) {
  return hit(`${BASE}/api/v1/activities/${id}`);
}

export async function getEnrollmentsByUser(userId) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Login kræves.");
  const user = await hit(`${BASE}/api/v1/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const acts = Array.isArray(user.activities) ? user.activities : [];
  return acts.map((a) => ({
    id: `${userId}:${a.id}`,
    userId: Number(userId),
    activityId: a.id,
  }));
}

export async function enroll(userId, activityId) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Login kræves.");
  await hit(`${BASE}/api/v1/users/${userId}/activities/${activityId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return { ok: true };
}

export async function leaveEnrollment(enrollmentId) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Login kræves.");
  const [userId, activityId] = String(enrollmentId).split(":");
  await hit(`${BASE}/api/v1/users/${userId}/activities/${activityId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return { ok: true };
}

export async function getActivitiesByInstructor(instructorId) {
  const all = await getActivities();
  return all.filter((a) => Number(a.instructorId) === Number(instructorId));
}

export async function getEnrollmentsByActivity(activityId) {
  const a = await getActivity(activityId);
  const users = Array.isArray(a.users) ? a.users : [];
  return users.map((u) => ({
    id: `${u.id}:${activityId}`,
    userId: u.id,
    activityId: Number(activityId),
  }));
}

export async function getUsersByIds(ids) {
  const uniq = Array.from(new Set(ids.map(Number)));
  return uniq.map((id) => ({
    id,
    username: `User ${id}`,
    age: null,
    role: "default",
  }));
}
