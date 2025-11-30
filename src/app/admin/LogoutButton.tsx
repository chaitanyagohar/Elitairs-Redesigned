"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    router.replace("/admin/login");
  }

  return (
    <button onClick={logout} className="bg-red-600 px-3 py-1 rounded text-white">
      Logout
    </button>
  );
}
