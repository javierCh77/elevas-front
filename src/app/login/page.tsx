"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import api from "../../lib/api";

export default function LoginPage() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Validando credenciales..."
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.status >= 200 && response.status < 300) {
        const { access_token } = response.data;
        localStorage.setItem("token", access_token);

        setStatusMessage("Validando credenciales...");
        setTimeout(
          () => setStatusMessage("Redireccionando al sistema..."),
          1000
        );
        setTimeout(() => {
          router.push("/dashboard");
          setLoading(false);
        }, 2000);
      } else {
        setError("Error desconocido al iniciar sesión.");
        setLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        const code = error.response.status;
        if (code === 401) setError("Credenciales inválidas.");
        else if (code === 404) setError("Usuario no encontrado.");
        else setError(error.response.data.message || `Error ${code}`);
      } else if (error.request) {
        setError("No se pudo conectar al servidor.");
      } else {
        setError("Error inesperado: " + error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-[#f8f8ee]">
      {/* Imagen institucional */}
      <div className="relative hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/movie.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      </div>

      {/* Formulario */}
      <div className="flex flex-col justify-center md:min-h-screen   ">
        <div className="w-full max-w-md mx-auto p-8 ">
          <div className="flex justify-center  ">
            <Image src="/images/elevas.png" alt="Logo" width={200} height={100} />
          </div>
         
          {/* Título animado */}
          <div className="text-center p-4 text-[#9b8444] font-semibold text-lg tracking-wide">
            <Typewriter
              words={["Sitema de gestion Talento Humano"]}
              loop={1}
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
         

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#6c5435]">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                aria-label="Correo electrónico"
                aria-required="true"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={` w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  error ? "border-red-300" : "focus:ring-[#9b8444]"
                }`}
                placeholder="mail@example.com"
              />
              <User className="absolute left-3 top-8 h-5 w-5 text-[#9b8444]" />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1 text-[#6c5435]"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                aria-label="Contraseña"
                aria-required="true"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    error ? "border-red-300" : "focus:ring-[#9b8444]"
                }`}
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-8 h-5 w-5 text-[#9b8444]" />
            </div>

            {/* Recordarme */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#6c5435]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#b1a14f] "
                />
                Recordarme
              </label>
              <Link
                href="/forgot-password"
                className="text-[#6c5435] hover:underline hover:text-[#b1a14f]"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de login */}
            <button
              type="submit"
              className="h-11 w-full py-2 px-4 bg-[#9b8444] hover:bg-[#82683b] text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#322616] cursor-pointer flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span className="text-sm">{statusMessage}</span>
                </>
              ) : (
                <span className="text-sm">Ingresar</span>
              )}
            </button>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </form>

          {/* Footer */}
          <div className="mt-2 text-center text-xs text-[#82683b]">
            <div className="flex flex-row gap-1  justify-center">
              <p>&copy; {currentYear}</p>
              <p className="text-[#6c5435] cursor-pointer font-bold"> Alba </p>
              <p>Development</p>
            </div>

            <p>Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
