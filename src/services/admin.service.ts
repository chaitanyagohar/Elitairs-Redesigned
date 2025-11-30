// src/services/admin.service.ts
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function createAdminIfNotExists(email: string, plainPassword: string) {
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) return existing;
  const hashed = await bcrypt.hash(plainPassword, 10);
  const admin = await prisma.admin.create({ data: { email, password: hashed } });
  return admin;
}
