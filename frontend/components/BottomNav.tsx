"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavRole = "patient" | "pharmacien";

const patientLinks = [
  { href: "/patient", label: "Accueil",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={a?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?0:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
  },
  { href: "/patient/medicaments", label: "Médicaments",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?2.2:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15m-6.75-12c.251.023.501.05.75.082M19.8 15l-1.5 1.5M18.3 16.5H5.7" /></svg>
  },
  { href: "/patient/panier", label: "Panier",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={a?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?0:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
  },
  { href: "/patient/notifications", label: "Alertes",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={a?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?0:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
  },
  { href: "/parametres", label: "Profil",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={a?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?0:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
  },
];

const pharmacistLinks = [
  { href: "/pharmacien", label: "Accueil",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={a?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?0:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
  },
  { href: "/pharmacien/stock", label: "Stock",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={a?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?0:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
  },
  { href: "/pharmacien/notifications", label: "Alertes",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={a?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?0:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
  },
  { href: "/pharmacien/profil", label: "Pharmacie",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={a?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?0:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
  },
  { href: "/parametres", label: "Profil",
    icon: (a: boolean) => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={a?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a?0:1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
  },
];

export default function BottomNav({ role }: { role: NavRole }) {
  const pathname = usePathname();
  const links = role === "patient" ? patientLinks : pharmacistLinks;
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] z-50 shadow-[0_-2px_12px_rgba(14,165,233,0.08)]">
      <div className="max-w-lg mx-auto flex justify-around items-center px-2 py-2">
        {links.map((link) => {
          const active = link.href === `/${role}` ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-150 ${active ? "text-[#0EA5E9]" : "text-[#94A3B8] hover:text-[#64748B]"}`}>
              <div className={`transition-transform ${active ? "scale-110" : ""}`}>
                {link.icon(active)}
              </div>
              <span className={`text-[10px] font-bold mt-0.5 ${active ? "text-[#0EA5E9]" : "text-[#94A3B8]"}`}>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
