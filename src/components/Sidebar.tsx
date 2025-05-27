"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, LogOut, ChevronLeft, ChevronRight, Factory, Waypoints, ContactRound, Handshake, CalendarDays, FileStack, ChartLine, BookUser, MessageSquareQuote, Speech, PersonStanding,} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface SidebarLink {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openServicios, setOpenServicios] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const links: SidebarLink[] = [
    { label: "Inicio", icon: <Home size={20} />, href: "/dashboard" },
    { label: "Administracion", icon: <Waypoints size={20} />, href: "/dashboard/administracion" },
    { label: "Empresas", icon: <Factory size={20} />, href: "/dashboard/empresas" },
    { label: "Empleados", icon: <PersonStanding size={20} />, href: "/dashboard/empleados" },
    { label: "Reclutamiento", icon: <ContactRound size={20} />, href: "/dashboard/reclutamiento" },
    { label: "Calendario", icon: <CalendarDays size={20} />, href: "/dashboard/calendario" },
    { label: "Documentacion", icon: <FileStack size={20} />, href: "/dashboard/documentacion" },
    { label: "Indicadores", icon: <ChartLine size={20} />, href: "/dashboard/indicadores" },
    { label: "Clientes", icon: <BookUser size={20} />, href: "/dashboard/clientes" },
    { label: "Comunicaciones", icon: <Speech size={20} />, href: "/dashboard/comunicaciones" },
    { label: "Chat", icon: <MessageSquareQuote size={20} />, href: "/dashboard/chat" },
  ];

  return (
    <>
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className={`${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-20 flex flex-col justify-between h-screen ${collapsed ? "w-13" : "w-52"} bg-[#322616] text-white border-r transition-all duration-300 ease-in-out overflow-y-auto`}>
        <div className="flex-grow">
          <div className="flex items-center justify-between p-3 border-b border-[#f8f8ee]">
            {!collapsed && <h2 className="text-lg font-semibold">Panel</h2>}
            <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block text-white focus:outline-none cursor-pointer bg-[#9b8444] p-1 rounded-3xl">
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          <nav className="flex flex-col p-2 space-y-2 text-xs">
            {links.map(({ label, icon, href }) => (
              <button
                key={label}
                onClick={() => router.push(href)}
                className={`flex items-center gap-3 w-full text-left text-white rounded-md p-2 cursor-pointer focus:outline-none ${pathname === href ? 'bg-[#9b8444] text-white' : 'hover:bg-[#9b8444]/40 hover:text-white'}`}
              >
                {icon}
                {!collapsed && <span>{label}</span>}
              </button>
            ))}

            <div>
              <button
                onClick={() => setOpenServicios(!openServicios)}
                className={`flex items-center justify-between w-full text-left text-white rounded-md p-2 cursor-pointer focus:outline-none ${pathname.startsWith('/dashboard/servicios') ? 'bg-[#9b8444]' : 'hover:bg-[#9b8444]/40'}`}
              >
                <div className="flex items-center gap-3">
                  <Handshake size={20} />
                  {!collapsed && <span>Servicios</span>}
                </div>
                {!collapsed && <ChevronRight className={`transition-transform ${openServicios ? 'rotate-90' : ''}`} size={16} />}
              </button>

              <div className={clsx("ml-8 overflow-hidden transition-all duration-300 ease-in-out", {
                "max-h-0": !openServicios,
                "max-h-96": openServicios && !collapsed,
                "mt-1": openServicios && !collapsed,
              })}>
                <div className="flex flex-col space-y-1 text-sm ">
                  <button onClick={() => { setOpenServicios(false); router.push("/dashboard/servicios/evaluaciones"); }} className="hover:text-[#9b8444] text-left py-2 cursor-pointer">Evaluaciones</button>
                  <button onClick={() => { setOpenServicios(false); router.push("/dashboard/servicios/encuestas"); }} className="hover:text-[#9b8444] text-left py-2 cursor-pointer">Encuestas de clima</button>
                  <button onClick={() => { setOpenServicios(false); router.push("/dashboard/servicios/capacitaciones"); }} className="hover:text-[#9b8444] text-left py-2 cursor-pointer">Capacitaciones</button>
                  <button onClick={() => { setOpenServicios(false); router.push("/dashboard/servicios/diagnosticos"); }} className="hover:text-[#9b8444] text-left py-2 cursor-pointer">Diagnósticos</button>
                  <button onClick={() => { setOpenServicios(false); router.push("/dashboard/servicios/coaching"); }} className="hover:text-[#9b8444] text-left py-2 cursor-pointer">Coaching / Mentoring</button>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-[#f8f8ee]">
          <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left text-white rounded-md p-2 cursor-pointer focus:outline-none hover:bg-[#9b8444] hover:text-white">
            <LogOut size={20} />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </div>
    </>
  );
}
