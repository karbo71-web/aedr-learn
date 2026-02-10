import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CoursesPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800 }}>Cours</h1>
      <p style={{ marginTop: 8, opacity: 0.85 }}>
        Liste des cours (mode safe). La partie base de données sera réactivée
        après stabilisation du build.
      </p>

      <div style={{ marginTop: 18 }}>
        <Link href="/">← Accueil</Link>
      </div>
    </main>
  );
}
