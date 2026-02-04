"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@elitairs.com");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (busy) return;
    setBusy(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // debug
      console.log("login status:", res.status);
      const body = await res.json();
      console.log("login body:", body);

      if (!res.ok) {
        setError(body?.error || "Login failed");
        setBusy(false);
        return;
      }

      // short pause to let browser persist cookie
      await new Promise((r) => setTimeout(r, 120));
      router.replace("/admin");
    } catch (err) {
      console.error(err);
      setError("Network error — try again");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="bg-white/5 p-6 rounded w-80">
        <h2 className="text-xl mb-4 font-bold text-gold">Admin Login</h2>

        <label className="sr-only">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-black mb-3 p-2 rounded"
          placeholder="Email"
          required
          disabled={busy}
          autoComplete="username"
          autoFocus
        />

        <label className="sr-only">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-black mb-4 p-2 rounded"
          placeholder="Password"
          required
          disabled={busy}
          autoComplete="current-password"
        />

        {error && <div className="text-red-400 text-sm mb-3">{error}</div>}

        <button
          className="w-full py-2 bg-gold text-black rounded disabled:opacity-60"
          disabled={busy}
          type="submit"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
