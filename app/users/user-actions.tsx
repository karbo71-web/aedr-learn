"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type UserRow = {
  id: string;
  email: string;
  name: string | null;
  role: string;
};

type Action = "PROMOTE" | "DEMOTE" | "DELETE";

export default function UserActions({ users }: { users: UserRow[] }) {
  const router = useRouter();

  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  function showToast(type: "ok" | "err", msg: string) {
    setToast({ type, msg });
    window.setTimeout(() => setToast(null), 2200);
  }

  function label(action: Action) {
    if (action === "PROMOTE") return "Promouvoir en ADMIN";
    if (action === "DEMOTE") return "Rétrograder en USER";
    return "Supprimer le compte";
  }

  function dangerText(action: Action, email: string) {
    if (action === "DELETE") return `⚠️ Supprimer définitivement: ${email} ?`;
    if (action === "DEMOTE") return `Confirmer la rétrogradation de ${email} ?`;
    return `Confirmer la promotion de ${email} ?`;
  }

  async function act(action: Action, u: UserRow) {
    if (busyId) return;

    const ok = confirm(dangerText(action, u.email));
    if (!ok) return;

    setBusyId(u.id);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, userId: u.id }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showToast("err", data?.error ?? "Erreur");
        setBusyId(null);
        return;
      }

      showToast("ok", "Action appliquée ✅");
      router.refresh();
    } catch {
      showToast("err", "Erreur réseau");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div style={{ marginTop: 16 }}>
      {toast ? (
        <div
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            padding: "10px 12px",
            border: "1px solid #999",
            background: "#fff",
            fontWeight: 700,
            zIndex: 9999,
            maxWidth: 320,
          }}
        >
          {toast.type === "ok" ? "✅ " : "⛔ "}
          {toast.msg}
        </div>
      ) : null}

      <ul style={{ lineHeight: 2 }}>
        {users.map((u) => {
          const isBusy = busyId === u.id;

          return (
            <li key={u.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ flex: 1 }}>
                <b>{u.email}</b> — {u.role}
                {u.name ? ` — ${u.name}` : ""}
              </span>

              <span style={{ display: "inline-flex", gap: 8 }}>
                {u.role === "USER" && (
                  <>
                    <button
                      type="button"
                      onClick={() => act("PROMOTE", u)}
                      disabled={isBusy}
                      style={{
                        cursor: isBusy ? "not-allowed" : "pointer",
                        opacity: isBusy ? 0.6 : 1,
                        padding: "6px 10px",
                        border: "1px solid #999",
                        background: "#eee",
                        fontWeight: 700,
                      }}
                      title={label("PROMOTE")}
                    >
                      {isBusy ? "..." : "Promouvoir"}
                    </button>

                    <button
                      type="button"
                      onClick={() => act("DELETE", u)}
                      disabled={isBusy}
                      style={{
                        cursor: isBusy ? "not-allowed" : "pointer",
                        opacity: isBusy ? 0.6 : 1,
                        padding: "6px 10px",
                        border: "1px solid #999",
                        background: "#fff",
                        fontWeight: 700,
                      }}
                      title={label("DELETE")}
                    >
                      {isBusy ? "..." : "Supprimer"}
                    </button>
                  </>
                )}

                {u.role === "ADMIN" && (
                  <button
                    type="button"
                    onClick={() => act("DEMOTE", u)}
                    disabled={isBusy}
                    style={{
                      cursor: isBusy ? "not-allowed" : "pointer",
                      opacity: isBusy ? 0.6 : 1,
                      padding: "6px 10px",
                      border: "1px solid #999",
                      background: "#eee",
                      fontWeight: 700,
                    }}
                    title={label("DEMOTE")}
                  >
                    {isBusy ? "..." : "Rétrograder"}
                  </button>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
