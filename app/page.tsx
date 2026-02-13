import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-green-700">AEDR Learn</h1>

        <p className="mt-2 text-gray-700">
          Plateforme de formation en ligne en français dédiée à la technologie,
          à l’humanitaire et à l’entrepreneuriat. Accès mixte : gratuit et premium.
        </p>

        {/* Boutons principaux */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/courses"
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Voir les cours
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-green-600 px-4 py-2 text-green-700 hover:bg-green-50"
          >
            Se connecter
          </Link>

          <Link
            href="/register"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Créer un compte
          </Link>
        </div>

        {/* Cartes catégories */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">💻 Tech</h2>
            <p className="mt-1 text-sm text-gray-600">
              Réseaux, dev, outils, data.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">🚑 Humanitaire</h2>
            <p className="mt-1 text-sm text-gray-600">
              MEAL, RRM, SCOPE, coordination.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">🚀 Entrepreneuriat</h2>
            <p className="mt-1 text-sm text-gray-600">
              Business, marketing, gestion.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
