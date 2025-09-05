// src/lib/api.mock.js
// Delay بسيط ليحاكي الشبكة
const wait = (ms = 300) => new Promise(r => setTimeout(r, ms));
// Users (موك)
const users = [
 { id: 1, username: "instructor1", password: "1234", age: 24, role: "instructor" },
 { id: 2, username: "instructor2", password: "1234", age: 32, role: "instructor" },
 { id: 5, username: "user1",       password: "1234", age: 14, role: "default"   },
 { id: 7, username: "user3",       password: "1234", age: 21, role: "default"   },
 { id: 9, username: "user5",       password: "1234", age: 52, role: "default"   },
];
// ✅ تعريف واحد فقط للأنشطة
const activities = [
 {
   id: 1,
   name: "Junior Fitness Dance",
   weekday: "Tuesday",
   time: "18:00",
   minAge: 10,
   maxAge: 12,
   instructorId: 1,
   description: "Energetic fitness dance for kids.",
   image: "/activities/junior-fitness.png",
 },
 {
   id: 2,
   name: "Latin Dance",
   weekday: "Monday",
   time: "19:00",
   minAge: 18,
   maxAge: 60,
   instructorId: 2,
   description: "Latin dance for adults, partner optional.",
   image: "/activities/latin-dance.png",
 },
 {
   id: 3,
   name: "Hip Hop Teens",
   weekday: "Thursday",
   time: "17:00",
   minAge: 13,
   maxAge: 17,
   instructorId: 1,
   description: "Energetic hip hop for teens.",
   // بدون صورة → SmartImage بيولّد placeholder تلقائياً
 },
 {
   id: 4,
   name: "K-Pop Kids",
   weekday: "Wednesday",
   time: "16:00",
   minAge: 10,
   maxAge: 12,
   instructorId: 2,
   description: "K-Pop choreo for kids.",
   // بدون صورة
 },
];
// Enrollments (موك)
let enrollments = [{ id: 1, userId: 7, activityId: 3 }];
// ===== API-like functions =====
export async function getActivities(q) {
 await wait();
 if (!q) return activities;
 const s = q.toLowerCase();
 return activities.filter(a =>
   (a.name?.toLowerCase().includes(s)) ||
   (a.weekday?.toLowerCase().includes(s))
 );
}
export async function getActivitiesByInstructor(instructorId) {
 await wait();
 return activities.filter(a => Number(a.instructorId) === Number(instructorId));
}
export async function getEnrollmentsByActivity(activityId) {
 await wait();
 return enrollments.filter(e => Number(e.activityId) === Number(activityId));
}
export async function getUsersByIds(ids = []) {
 await wait();
 const set = new Set(ids.map(Number));
 return users.filter(u => set.has(Number(u.id)));
}
export async function getActivity(id) {
 await wait();
 const a = activities.find(x => String(x.id) === String(id));
 if (!a) throw new Error("Not found");
 return a;
}
export async function login(username, password) {
 await wait();
 const user = users.find(u => u.username === username && u.password === password);
 if (!user) throw new Error("Forkert brugernavn eller adgangskode.");
 return { user, token: null };
}
export async function getEnrollmentsByUser(userId) {
 await wait();
 return enrollments.filter(e => e.userId === Number(userId));
}
export async function enroll(userId, activityId) {
 await wait();
 const exists = enrollments.some(e => e.userId === Number(userId) && e.activityId === Number(activityId));
 if (exists) throw new Error("Allerede tilmeldt.");
 const id = Math.max(0, ...enrollments.map(e => e.id)) + 1;
 const rec = { id, userId: Number(userId), activityId: Number(activityId) };
 enrollments.push(rec);
 return rec;
}
export async function leaveEnrollment(enrollmentId) {
 await wait();
 enrollments = enrollments.filter(e => e.id !== Number(enrollmentId));
 return { ok: true };
}