import { CONFIG } from "../config";
import type { LoginResponse } from "../types/auth";
import { getAccessToken } from "../utils/token";

export async function adminLogin(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${CONFIG.API_BASE_URL}/admin/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error("Failed to login");
  }
  return res.json();
}

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = getAccessToken();
  return fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Token ${token}` : "",
      ...(init.headers || {}),
    },
  });
}
