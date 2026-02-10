import { prisma } from './lib/prisma'

async function main() {
  const result = await prisma.$queryRaw`SELECT 1`
  console.log('Prisma singleton OK:', result)
}

main()
