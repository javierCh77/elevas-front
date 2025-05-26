"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function useAutoLogout(timeoutMs = 10 * 60 * 1000) {
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const logout = () => {
    // 🔒 Acá va tu lógica para cerrar sesión
    localStorage.removeItem("token"); // o sessionStorage si usás eso
    router.push("/login");
  };

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(logout, timeoutMs);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // arranca el timer al montar

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
