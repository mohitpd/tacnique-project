import type { JSX } from "react";
import { getAccessToken } from "../utils/token";
import { Navigate } from "react-router-dom";

export function AdminRoute({ children }: { children: JSX.Element }) {
  return getAccessToken() ? children : <Navigate to="/admin/login" />;
}
