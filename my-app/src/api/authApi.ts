import { CONFIG } from "../config";

export async function admimLogin(
  username: string,
  password: string,
): Promise<{ token: string }> {
  const res = await fetch(`${CONFIG.API_BASE_URL}/admin/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error("Login failed");
  }
  return res.json();
}
