import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <span className="font-bold text-green-700">AEDR Learn</span>

        <nav className="flex gap-4 text-sm">
          <Link href="/" className="hover:text-green-700">Accueil</Link>
          <Link href="/courses" className="hover:text-green-700">Cours</Link>
          <Link href="/login" className="hover:text-green-700">Connexion</Link>
        </nav>
      </div>
    </header>
  );
}

