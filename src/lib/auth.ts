// src/lib/auth.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
log: [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET || "";

if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  console.warn("Missing JWT_SECRET in environment!");
}

/** Signs a JWT for an admin */
export function signAdminToken(id: string, email: string) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET not configured");
  return jwt.sign({ sub: id, email }, JWT_SECRET, { expiresIn: "7d" });
}

/** Verifies token, returns payload or null */
export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string; email: string; iat?: number; exp?: number };
  } catch (err) {
    return null;
  }
}

/**
 * verifyAdminCredentials(email, password)
 * - returns the admin object (without password) on success
 * - returns null if credentials invalid
 * - throws if DB error
 */
export async function verifyAdminCredentials(email: string, password: string) {
  if (!email || !password) return null;

  // adapt model name if your Prisma model is different
  const admin = await prisma.admin.findUnique({ where: { email } }); // prisma model should be "admin" if model name is Admin
  if (!admin) return null;

  const hashed = admin.password; // ensure your seeding stored hashed password
  if (!hashed) return null;

  const ok = await bcrypt.compare(password, hashed);
  if (!ok) return null;

  // return a safe admin object (remove password)
  const { password: _p, ...safe } = admin as any;
  return safe as { id: string; email: string; createdAt?: Date };
}

/** Utility used to hash a password (for seeding/change password flows) */
export async function hashPassword(plain: string) {
  const saltRounds = 10;
  return bcrypt.hash(plain, saltRounds);
}
export const verifyToken = verifyAdminToken;
export const signToken = signAdminToken;

// default export (optional convenience)
export default {
  verifyAdminToken,
  verifyToken,
  signAdminToken,
  signToken,
};