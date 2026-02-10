export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MePage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800 }}>Profil</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        La page /me est désactivée temporairement (module Users/Auth non activé).
      </p>
      <p style={{ marginTop: 8 }}>
        Retourne à l’accueil et utilise les cours.
      </p>
    </main>
  );
}
