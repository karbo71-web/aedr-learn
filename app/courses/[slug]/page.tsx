import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: { slug?: string } };

export default async function CoursePage({ params }: PageProps) {
  const slug = params?.slug;
  if (!slug) notFound();

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800 }}>Cours : {slug}</h1>
      <p style={{ marginTop: 8, opacity: 0.85 }}>
        Mode safe activé (DB/Prisma désactivés temporairement pour stabiliser le
        build).
      </p>
      <p style={{ marginTop: 8, opacity: 0.85 }}>
        Après déploiement, on réactive l’affichage des modules/leçons.
      </p>
    </main>
  );
}
