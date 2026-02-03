"use client";

import { DbLayoutSeleton } from "@/components/layouts/dashboard/DbLayoutSeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CustomerDashboard() {
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
