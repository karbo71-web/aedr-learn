import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: { lessonId?: string } };

export default async function LearnLessonPage({ params }: PageProps) {
  // Pas de lessons pour le moment => on renvoie 404 proprement
  if (!params?.lessonId) notFound();
  notFound();
}
