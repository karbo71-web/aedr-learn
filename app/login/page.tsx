"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@aedr-learn.local");
  const [password, setPassword] = useState("Admin@12345");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/users",
    });

    if (res?.error) setError("Email ou mot de passe incorrect.");
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 420 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Connexion</h1>

      <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          Mot de passe
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <button
  type="submit"
  style={{
    padding: 10,
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid #999",
    background: "#eee",
  }}
>
  Se connecter
</button>

        {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      </form>
    </main>
  );
}
