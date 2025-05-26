"use client";

import { ReactNode } from "react";
import { useAutoLogout } from "@/hooks/useAutoLogout";

export default function ClientLayout({ children }: { children: ReactNode }) {
  useAutoLogout(); // 20 min por defecto
  return <>{children}</>;
}
