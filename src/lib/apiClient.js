// Importer / استيراد
import * as api from "./api";

export const getActivities = (...args) =>
  api // API-kald / نداء API
    .getActivities(...args);
export const getActivity = (...args) => api.getActivity(...args);
export const login = (...args) => api.login(...args);
export const getEnrollmentsByUser = (...args) =>
  api.getEnrollmentsByUser(...args);
export const enroll = (...args) => api.enroll(...args);
export const leaveEnrollment = (...args) => api.leaveEnrollment(...args);
export const getActivitiesByInstructor = (...a) =>
  api.getActivitiesByInstructor(...a);
export const getEnrollmentsByActivity = (...a) =>
  api.getEnrollmentsByActivity(...a);
export const getUsersByIds = (...a) => api.getUsersByIds(...a);
