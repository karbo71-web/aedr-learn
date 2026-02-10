"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        padding: 10,
        fontWeight: 700,
        cursor: "pointer",
        border: "1px solid #999",
        background: "#eee",
      }}
    >
      Se déconnecter
    </button>
  );
}
