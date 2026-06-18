import Link from "next/link";
import { MOCK_PHARMACIES, MOCK_MEDICATIONS, MOCK_USER } from "@/lib/mock-data";

/* ── Inspiré maquette "Accueil de l'espace patient" Figma ── */

const services = [
  { href: "/patient/medicaments", label: "Médicaments", desc: "Trouver & comparer", emoji: "💊", bg: "bg-[#E0F2FE]", text: "text-[#0284C7]" },
  { href: "/patient/medicaments?tab=pharmacies", label: "Pharmacies", desc: "À proximité", emoji: "🏥", bg: "bg-[#DCFCE7]", text: "text-[#15803D]" },
  { href: "/patient/ordonnance", label: "Ordonnance", desc: "Scanner & envoyer", emoji: "📋", bg: "bg-[#F3E8FF]", text: "text-[#7C3AED]" },
  { href: "/patient/panier", label: "Mon Panier", desc: "Mes réservations", emoji: "🛒", bg: "bg-[#FEF3C7]", text: "text-[#B45309]" },
];

export default function PatientDashboardPage() {
  const dutyPharmacies = MOCK_PHARMACIES.filter((p) => p.onDuty);
  const featuredMeds = MOCK_MEDICATIONS.filter((m) => m.inStock).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* ── HEADER bleu ciel (fidèle à la maquette Figma) ── */}
      <div className="bg-gradient-to-b from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] px-6 pt-14 pb-24 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-60 h-60 rounded-full bg-white/10" />
        <div className="absolute bottom-[10px] left-[-20px] w-36 h-36 rounded-full bg-[#0284C7]/30" />
        <div className="absolute top-[20px] right-[70px] w-14 h-14 rounded-full bg-white/10" />

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-sky-100 text-sm font-medium">Bonjour 👋</p>
            <h1 className="text-white text-2xl font-black mt-0.5">{MOCK_USER.firstName}</h1>
            <div className="flex items-center gap-1.5 mt-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-sky-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-sky-200 text-xs">{MOCK_USER.location}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-xl">👤</div>
        </div>

        {/* Barre de recherche dans le header */}
        <Link href="/patient/medicaments"
          className="relative z-10 mt-5 flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-[#94A3B8] text-sm">Rechercher un médicament...</span>
        </Link>
      </div>

      {/* ── CONTENU (overlap sur header) ── */}
      <div className="px-5 -mt-10 pb-6 flex flex-col gap-6 relative z-10">

        {/* Services 2×2 */}
        <div className="grid grid-cols-2 gap-3">
          {services.map((s) => (
            <Link key={s.href} href={s.href}
              className="bg-white rounded-3xl p-4 shadow-md hover:shadow-lg active:scale-95 transition-all flex flex-col gap-3 border border-[#F1F5F9]"
            >
              <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center text-2xl`}>{s.emoji}</div>
              <div>
                <p className={`font-black text-sm ${s.text}`}>{s.label}</p>
                <p className="text-[#94A3B8] text-xs mt-0.5">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pharmacies de garde */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-black text-[#0F172A] text-base">Pharmacies de garde</h2>
            <Link href="/patient/medicaments?tab=pharmacies" className="text-[#0EA5E9] text-xs font-semibold">Voir tout →</Link>
          </div>
          <div className="flex flex-col gap-3">
            {dutyPharmacies.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl p-4 shadow-md flex items-center gap-4 border border-[#F1F5F9]">
                <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0F172A] text-sm truncate">{p.name}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{p.city} • {p.distance}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-2 py-0.5 rounded-full">De garde</span>
                  <span className="text-[#94A3B8] text-[10px]">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Médicaments disponibles */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-black text-[#0F172A] text-base">Disponibles près de vous</h2>
            <Link href="/patient/medicaments" className="text-[#0EA5E9] text-xs font-semibold">Voir tout →</Link>
          </div>
          <div className="flex flex-col gap-3">
            {featuredMeds.map((m) => (
              <Link key={m.id} href={`/patient/medicaments/${m.id}`}
                className="bg-white rounded-3xl p-4 shadow-md flex items-center gap-4 active:scale-98 transition-all border border-[#F1F5F9]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 text-2xl">💊</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0F172A] text-sm leading-tight truncate">{m.name}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{m.form}</p>
                  <p className="text-[#94A3B8] text-xs">{m.pharmacy} • {m.distance}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-black text-[#0EA5E9] text-sm">{m.price.toLocaleString()} <span className="text-xs">F</span></span>
                  <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-2 py-0.5 rounded-full">En stock</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bannière ordonnance */}
        <Link href="/patient/ordonnance"
          className="bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-3xl p-5 shadow-lg flex items-center gap-4 active:scale-98 transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl flex-shrink-0">📋</div>
          <div className="flex-1">
            <p className="text-white font-black text-base">Scanner une ordonnance</p>
            <p className="text-purple-200 text-xs mt-0.5">Importez votre prescription et trouvez vos médicaments</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
