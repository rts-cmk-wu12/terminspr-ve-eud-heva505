
export const sameWeekday = (a, b) => String(a).toLowerCase() === String(b).toLowerCase();
export const meetsAge = (userAge, minAge) => (minAge == null) || (Number(userAge) >= Number(minAge));
export const alreadyEnrolled = (enrollments, userId, activityId) =>
  enrollments.some(e => Number(e.userId) === Number(userId) && Number(e.activityId) === Number(activityId));
