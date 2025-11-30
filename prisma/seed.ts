// prisma/seed.ts
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@elitairs.com";
  const password = process.env.ADMIN_PASSWORD || "ElitairsAdmin@123";
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    await prisma.admin.create({ data: { email, password: hashed } });
    console.log("Admin created:", email);
  } else {
    console.log("Admin exists:", email);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
