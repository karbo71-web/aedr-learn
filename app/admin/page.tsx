import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800 }}>Admin</h1>
      <p style={{ marginTop: 8, opacity: 0.85 }}>
        Section admin désactivée temporairement (Auth/Users non activés).
      </p>

      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
        <Link href="/courses">→ Aller aux cours</Link>
        <Link href="/">→ Accueil</Link>
      </div>
    </main>
  );
}
