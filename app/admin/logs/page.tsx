"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type LogRow = {
  id: string;
  createdAt: string;
  action?: string | null;
  userId?: string | null;
  meta?: any;
};

export default function AdminLogsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogRow[]>([]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/admin/logs", { cache: "no-store" });

        if (res.status === 401 || res.status === 403) {
          router.replace("/login");
          return;
        }

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error ?? "Erreur");

        if (alive) setLogs(data?.logs ?? []);
      } catch (e: any) {
        if (alive) setError(e?.message ?? String(e));
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [router]);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Audit logs</h1>

      {loading && <p style={{ opacity: 0.8, marginTop: 12 }}>Chargement…</p>}

      {error && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <b>Erreur:</b> {error}
        </div>
      )}

      {!loading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Date</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Action</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>User</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id}>
                <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                  {new Date(l.createdAt).toLocaleString()}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{l.action ?? "-"}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{l.userId ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
