"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.error ?? "Erreur");
        setLoading(false);
        return;
      }

      setMsg("Compte créé ✅ Redirection vers la connexion...");
      setTimeout(() => router.push("/login"), 700);
    } catch {
      setMsg("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 520 }}>
      <h1 style={{ fontSize: 26, fontWeight: 900 }}>Créer un compte</h1>

      <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: karbo_h@yahoo.fr"
            required
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          Nom (optionnel)
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: Habibou Karbo"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="min 8 caractères"
            required
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            border: "1px solid #999",
            background: "#eee",
            fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>

        {msg ? (
          <div style={{ border: "1px solid #ddd", padding: 10 }}>
            {msg}
          </div>
        ) : null}

        <div>
          Déjà un compte ? <a href="/login">Se connecter</a>
        </div>
      </form>
    </main>
  );
}
