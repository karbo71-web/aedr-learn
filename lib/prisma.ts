// lib/prisma.ts
// Version "safe" pour éviter les erreurs de types Prisma quand @prisma/client est mal typé.
// On utilise require() -> TypeScript ne vérifie plus les exports de @prisma/client.

declare const globalThis: any;

const PrismaPkg = require("@prisma/client") as any;
const PrismaClientCtor = PrismaPkg?.PrismaClient;

if (!PrismaClientCtor) {
  throw new Error(
    "PrismaClient introuvable dans @prisma/client. Réinstalle @prisma/client et prisma."
  );
}

export const prisma =
  globalThis.__prisma__ ?? new PrismaClientCtor({ log: ["error", "warn"] });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma__ = prisma;
}
