"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RoleType = "PATIENT" | "PHARMACIEN" | "ADMIN";

type RoleGuardProps = {
  allowedRole: RoleType;
  children: ReactNode;
};

const getRedirectForRole = (role: string | null) => {
  if (role === "PATIENT") return "/patient";
  if (role === "PHARMACIEN") return "/pharmacien";
  if (role === "ADMIN") return "/admin";
  return "/auth/login";
};

export default function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")?.toUpperCase() ?? null;

    if (!token || !role) {
      router.replace("/auth/login");
      return;
    }

    if (role !== allowedRole) {
      router.replace(getRedirectForRole(role));
      return;
    }

    setReady(true);
  }, [allowedRole, router]);

  if (!ready) return null;

  return <>{children}</>;
}
