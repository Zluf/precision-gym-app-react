import { useMemo } from "react";
import { auth } from "../firebase";

// Helper to get user ID (guest or Firebase UID)
const getUserId = (): string => {
  const currentUser = auth.currentUser;
  if (!currentUser) return "";
  // Keep "guest" as identifier for guest users
  if (currentUser.displayName === "guest") return "guest";
  // Use Firebase UID for all other users
  return currentUser.uid;
};

// Helper to get auth token
const getAuthToken = async (): Promise<string> => {
  const currentUser = auth.currentUser;
  if (!currentUser) return "";
  try {
    return await currentUser.getIdToken();
  } catch (error) {
    console.error("Error getting auth token:", error);
    return "";
  }
};

// Helper to build authenticated URL
const buildAuthUrl = async (baseUrl: string): Promise<string> => {
  const token = await getAuthToken();
  if (!token) return baseUrl;
  // Add auth token as query parameter for Firebase REST API
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}auth=${token}`;
};

// Base Firebase URL
const BASE_URL = "https://precision-gym-default-rtdb.firebaseio.com";

// Build URL for user's routine path
const buildRoutineUrl = async (path: string): Promise<string> => {
  const uid = getUserId();
  const fullUrl = `${BASE_URL}/users/${uid}/${path}`;
  return buildAuthUrl(fullUrl);
};

// GET request
const fetchRoutine = async (path: string) => {
  const url = await buildRoutineUrl(path);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  return response.json();
};

// PUT request
const updateRoutine = async (path: string, data: unknown) => {
  const url = await buildRoutineUrl(path);

  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

// DELETE request
const deleteRoutine = async (path: string) => {
  const url = await buildRoutineUrl(path);
  return fetch(url, {
    method: "DELETE",
  });
};

// Stable API object - functions don't depend on React state
const firebaseApi = {
  fetchRoutine,
  updateRoutine,
  deleteRoutine,
  buildAuthUrl,
};

export const useFirebaseApi = () => {
  // Return stable reference - these functions don't depend on component state
  return useMemo(() => firebaseApi, []);
};
