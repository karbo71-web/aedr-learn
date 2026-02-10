import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function UsersPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Utilisateurs</h1>
      <p style={{ marginTop: 8, opacity: 0.85 }}>
        Cette page est désactivée temporairement (module Users/Auth non activé).
      </p>

      <div style={{ marginTop: 16 }}>
        <Link href="/courses">→ Aller aux cours</Link>
      </div>
    </main>
  );
}
