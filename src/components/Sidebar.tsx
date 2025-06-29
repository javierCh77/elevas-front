"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Factory,
  CalendarDays,
  ChartLine,
  ChevronDown,
  PersonStanding,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface SidebarLink {
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: SidebarLink[];
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openEncuestas, setOpenEncuestas] = useState(false);
  const [openServicios, setOpenServicios] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const links: SidebarLink[] = [
    { label: "Inicio", icon: <Home size={20} />, href: "/dashboard" },
    { label: "Candidatos", icon: <Factory size={20} />, href: "/dashboard/candidatos" },
    { label: "Empresas", icon: <Factory size={20} />, href: "/dashboard/empresas" },
    { label: "Empleados", icon: <PersonStanding size={20} />, href: "/dashboard/empleados" },
    { label: "Calendario", icon: <CalendarDays size={20} />, href: "/dashboard/calendario" },
    {
      label: "Indicadores Encuestas",
      icon: <ChartLine size={20} />,
      children: [
        {
          label: "Experiencia del colaborador",
          href: "/dashboard/encuestas/experiencia-colaborador",
          icon: null,
        },
        //  {
        //   label: "Onboarding",
        //   href: "/dashboard/encuestas/onboarding",
        //   icon: null,
        // },
      ],
    },
    // {
    //   label: "Servicios",
    //   icon: <Handshake size={20} />,
    //   children: [
    //     {
    //       label: "Listado de servicios",
    //       href: "/dashboard/servicios/listado",
    //       icon: null,
    //     },
    //   ],
    // },
  ];

  const renderLinks = (items: SidebarLink[]) =>
    items.map(({ label, icon, href, children }) => {
      const isActive = href && pathname === href;
      const isSubMenuOpen =
        label === "Indicadores Encuestas" ? openEncuestas :
        label === "Servicios" ? openServicios : false;

      return (
        <div key={label}>
          {href ? (
            <button
              onClick={() => router.push(href)}
              className={clsx(
                "flex items-center gap-3 w-full text-left rounded-md p-2 text-white cursor-pointer",
                isActive ? "bg-[#9b8444]" : "hover:bg-[#9b8444]/40"
              )}
            >
              {icon}
              {!collapsed && <span>{label}</span>}
            </button>
          ) : (
            <button
              onClick={() => {
                if (label === "Indicadores Encuestas") setOpenEncuestas(!openEncuestas);
                if (label === "Servicios") setOpenServicios(!openServicios);
              }}
              className={clsx(
                "flex items-center justify-between w-full text-left rounded-md p-2 text-white cursor-pointer",
                pathname.startsWith("/dashboard/encuesta") && label === "Indicadores Encuestas" ||
                pathname.startsWith("/dashboard/servicios") && label === "Servicios"
                  ? "bg-[#9b8444]"
                  : "hover:bg-[#9b8444]/40"
              )}
            >
              <div className="flex items-center gap-3">
                {icon}
                {!collapsed && <span>{label}</span>}
              </div>
              {!collapsed && (
                <ChevronDown
                  size={16}
                  className={clsx("transition-transform", {
                    "rotate-180": isSubMenuOpen,
                  })}
                />
              )}
            </button>
          )}

          {children && !collapsed && (
            <div
              className={clsx("ml-8 overflow-hidden transition-all duration-300", {
                "max-h-0": !isSubMenuOpen,
                "max-h-96 mt-1": isSubMenuOpen,
              })}
            >
              <div className="flex flex-col space-y-1 text-sm">
                {children.map((child) => (
                  <button
                    key={child.label}
                    onClick={() => {
                      if (label === "Indicadores Encuestas") setOpenEncuestas(false);
                      if (label === "Servicios") setOpenServicios(false);
                      router.push(child.href!);
                    }}
                    className="hover:text-[#9b8444] text-left py-2 cursor-pointer"
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    });

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-20 flex flex-col justify-between h-screen ${
          collapsed ? "w-13" : "w-52"
        } bg-[#322616] text-white border-r transition-all duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="flex-grow">
          <div className="flex items-center justify-between p-3 border-b border-[#f8f8ee]">
            {!collapsed && <h2 className="text-lg font-semibold">Panel</h2>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-white focus:outline-none cursor-pointer bg-[#9b8444] p-1 rounded-3xl"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          <nav className="flex flex-col p-2 space-y-2 text-xs">
            {renderLinks(links)}
          </nav>
        </div>

        <div className="p-4 border-t border-[#f8f8ee]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left text-white rounded-md p-2 cursor-pointer focus:outline-none hover:bg-[#9b8444]"
          >
            <LogOut size={20} />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </div>
    </>
  );
}
