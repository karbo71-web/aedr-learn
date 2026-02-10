/* prisma/seed.ts */
const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();

  // Exemple minimal : crée un admin si besoin (adaptable)
  // await prisma.user.upsert({
  //   where: { email: "admin@aedr.org" },
  //   update: { role: "ADMIN" },
  //   create: { email: "admin@aedr.org", password: "admin123", role: "ADMIN", name: "Admin" },
  // });

  await prisma.$disconnect();
}

main().catch(async (e: any) => {
  console.error(e);
  try {
    const prisma = new PrismaClient();
    await prisma.$disconnect();
  } catch {}
  process.exit(1);
});
