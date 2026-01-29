"use client";

import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-600 cursor-pointer"
    >
      <LogOut className="h-4 w-4" /> Logout
    </div>
  );
}
