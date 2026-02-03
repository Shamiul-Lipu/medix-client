"use client";

import { DbLayoutSeleton } from "@/components/layouts/dashboard/DbLayoutSeleton";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/seller/inventory");
  }, [router]);
  return (
    <div>
      <DbLayoutSeleton />
    </div>
  );
}
