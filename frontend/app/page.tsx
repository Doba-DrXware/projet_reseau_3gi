"use client"; // Obligatoire pour utiliser localStorage et les interactionscote client

import Link from "next/link";
import Image from "next/image";

export default function PortailPage() {
  
  // La fonction de connexion a ete deplacee a l'interieur du composant pour etre propre
  const handleLoginTest = async (data: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const resultat = await response.json();
        // Stockage du token recupere depuis Spring Boot
        localStorage.setItem("token", resultat.token);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFC] relative overflow-hidden">

      {/* Fond bleu ciel haut */}
      <div className="absolute top-0 left-0 right-0 h-[58vh] bg-gradient-to-b from-[#0EA5E9] to-[#38BDF8] z-0" />

      {/* Cercles deco */}
      <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-white/10 z-0" />
      <div className="absolute top-[30px] right-[20px] w-28 h-28 rounded-full bg-white/10 z-0" />
      <div className="absolute top-[200px] left-[-30px] w-40 h-40 rounded-full bg-[#0284C7]/20 z-0" />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col flex-1">

        {/* Selecteur de langue */}
        <div className="flex justify-end px-6 pt-6">
          <div className="flex gap-1 bg-white/20 rounded-full px-2 py-1">
            <button className="text-white text-xs font-bold px-3 py-1 rounded-full bg-white/30">🇫🇷 FR</button>
            <button className="text-white/60 text-xs px-3 py-1 rounded-full hover:bg-white/20 transition">🇬🇧 EN</button>
          </div>
        </div>

        {/* Logo + Branding */}
        <div className="flex flex-col items-center mt-12 mb-4 px-6">
          <div className="w-32 h-32 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white/80 mb-5">
            <Image
              src="/logo.png"
              alt="PROXYMEDOC"
              width={110}
              height={110}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-white text-3xl font-black tracking-wide text-center drop-shadow">
            PROXYMEDOC
          </h1>
          <p className="text-sky-100 text-sm mt-1.5 font-medium tracking-widest uppercase">
            Pharmacie de Proximite
          </p>
          <p className="text-sky-200/80 text-xs mt-1">Yaounde · Douala · Cameroun</p>
        </div>

        {/* Carte blanche arrondie */}
        <div className="bg-[#F8FAFC] rounded-t-[2.5rem] flex-1 mt-6 px-6 pt-8 pb-10 flex flex-col gap-5">

          {/* Accroche */}
          <div className="text-center mb-2">
            <p className="text-[#0F172A] font-bold text-lg">Votre pharmacie en ligne</p>
            <p className="text-[#64748B] text-sm mt-1 leading-relaxed">
              Trouvez vos medicaments, reservez et gerez vos ordonnances en quelques secondes.
            </p>
          </div>

          {/* Fonctionnalites rapides */}
          <div className="grid grid-cols-3 gap-3 mb-2">
            {[
              { icon: "💊", label: "Medicaments" },
              { icon: "🏥", label: "Pharmacies" },
              { icon: "📋", label: "Ordonnances" },
            ].map((f) => (
              <div key={f.label} className="bg-white rounded-2xl p-3 flex flex-col items-center gap-2 shadow-sm border border-[#E2E8F0]">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-[#0F172A] text-[10px] font-semibold text-center">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
          <Link
            href="/auth/login"
            className="w-full text-center bg-[#0EA5E9] hover:bg-[#0284C7] active:bg-[#0369A1] text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-base tracking-wide"
          >
            Se connecter
          </Link>

          <Link
            href="/auth/register"
            className="w-full text-center bg-white border-2 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#E0F2FE] font-bold py-4 rounded-2xl shadow-sm transition-all text-base"
          >
            Creer un compte
          </Link>

          <p className="text-center text-[#94A3B8] text-xs mt-2">
            © 2025 PROXYMEDOC — Projet de fin d'annee ING1
          </p>
        </div>
      </div>
    </main>
  );
}