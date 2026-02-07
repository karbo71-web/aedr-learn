import Link from "next/link";
import { courses } from "../data/courses";

function Badge({ text }: { text: string }) {
  const isPremium = text === "Premium";
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium " +
        (isPremium
          ? "bg-amber-100 text-amber-800"
          : "bg-green-100 text-green-800")
      }
    >
      {text}
    </span>
  );
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-green-700">Catalogue des cours</h1>
        <p className="mt-2 text-gray-600">
          Cours Tech • Humanitaire • Entrepreneuriat — accès gratuit + premium.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <div key={c.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">{c.short}</p>
                </div>
                <Badge text={c.access} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span className="rounded-full bg-gray-100 px-2 py-1">
                  {c.category}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-1">
                  {c.level}
                </span>
              </div>

              <div className="mt-5">
                <Link
                  href={`/courses/${c.id}`}
                  className="inline-flex rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                >
                  Voir le cours
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
