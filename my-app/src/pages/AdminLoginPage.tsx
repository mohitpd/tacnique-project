import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { admimLogin } from "../api/authApi";
import { setAccessToken } from "../utils/token";

export function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await admimLogin(username, password);
      setAccessToken(response.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("LOGIN FAILED: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>ADMIN LOGIN</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
