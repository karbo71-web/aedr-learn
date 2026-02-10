console.log("START test-logs");

import { prisma } from "./lib/prisma";

async function main() {
  console.log("BEFORE QUERY");
  const logs = await prisma.adminAuditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  console.log("AUDIT LOGS:", logs);
}

main()
  .catch((e) => console.error("ERROR:", e))
  .finally(async () => {
    console.log("DISCONNECT");
    await prisma.$disconnect();
  });
