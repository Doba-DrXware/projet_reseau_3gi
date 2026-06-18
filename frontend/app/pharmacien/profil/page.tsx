"use client";

import { useState } from "react";
import Link from "next/link";

/* Inspiré maquette "Informations sur la pharmacie" Figma */

export default function PharmacieProfilPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Pharmacie Centrale",
    address: "Avenue Kennedy, Centre-ville",
    city: "Yaoundé",
    phone: "699 000 001",
    email: "centrale@pharma.cm",
    lat: "3.8667",
    lng: "11.5167",
    hoursWeek: "08:00 - 20:00",
    hoursSat: "08:00 - 18:00",
    hoursSun: "Fermé",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Field = ({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-[#0F172A]">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-gradient-to-b from-[#0284C7] to-[#38BDF8] px-6 pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <Link href="/pharmacien" className="flex items-center gap-2 text-sky-100 text-sm mb-5 w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </Link>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-xl">🏥</div>
          <div>
            <h1 className="text-white text-2xl font-black">Ma Pharmacie</h1>
            <p className="text-sky-100 text-sm">Informations publiques</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="px-5 pt-5 pb-32 flex flex-col gap-5 max-w-lg mx-auto">

        {/* Informations générales */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.16 3.56l.47-.81a1 1 0 011.74 0l.47.81 .9.18a1 1 0 01.55 1.7l-.64.62.15.9a1 1 0 01-1.45 1.05l-.8-.42-.8.42a1 1 0 01-1.45-1.05l.15-.9-.64-.62a1 1 0 01.55-1.7l.9-.18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12s4.03 8.25 9 8.25z" /></svg>
            </div>
            <h2 className="font-black text-[#0F172A] text-sm">Informations générales</h2>
          </div>
          <div className="flex flex-col gap-4">
            <Field label="Nom commercial" value={form.name} onChange={(v) => setForm({...form, name: v})} />
            <Field label="Adresse (rue)" value={form.address} onChange={(v) => setForm({...form, address: v})} />
            <Field label="Ville" value={form.city} onChange={(v) => setForm({...form, city: v})} placeholder="Yaoundé" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Téléphone" value={form.phone} onChange={(v) => setForm({...form, phone: v})} type="tel" />
              <Field label="Email" value={form.email} onChange={(v) => setForm({...form, email: v})} type="email" />
            </div>
          </div>
        </div>

        {/* Horaires */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#15803D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="font-black text-[#0F172A] text-sm">Horaires d&apos;ouverture</h2>
          </div>
          <div className="flex flex-col gap-4">
            <Field label="Lundi — Vendredi" value={form.hoursWeek} onChange={(v) => setForm({...form, hoursWeek: v})} placeholder="08:00 - 20:00" />
            <Field label="Samedi" value={form.hoursSat} onChange={(v) => setForm({...form, hoursSat: v})} placeholder="08:00 - 18:00" />
            <Field label="Dimanche" value={form.hoursSun} onChange={(v) => setForm({...form, hoursSun: v})} placeholder="Fermé" />
          </div>
        </div>

        {/* Localisation GPS */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0 text-sm">📍</div>
            <h2 className="font-black text-[#0F172A] text-sm">Coordonnées GPS</h2>
          </div>
          <p className="text-[#64748B] text-xs mb-3 leading-relaxed">Précisez vos coordonnées pour que les patients puissent calculer leur distance.</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Latitude" value={form.lat} onChange={(v) => setForm({...form, lat: v})} type="number" placeholder="3.8667" />
            <Field label="Longitude" value={form.lng} onChange={(v) => setForm({...form, lng: v})} type="number" placeholder="11.5167" />
          </div>
        </div>

        {saved && (
          <div className="bg-[#DCFCE7] border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[#15803D] text-sm font-semibold">Modifications enregistrées !</p>
          </div>
        )}
      </form>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-5 py-4 shadow-[0_-4px_20px_rgba(14,165,233,0.1)]">
        <button onClick={handleSave} className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold py-4 rounded-2xl shadow-lg transition">
          Enregistrer les modifications ✓
        </button>
      </div>
    </main>
  );
}
