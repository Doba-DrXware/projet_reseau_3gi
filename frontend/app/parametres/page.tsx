"use client";

import { useState } from "react";
import Link from "next/link";

/* Inspiré maquette "Paramètres" et "Profil" Figma */

export default function ParametresPage() {
  const [lang, setLang] = useState("fr");
  const [notifStock, setNotifStock] = useState(true);
  const [notifResa, setNotifResa] = useState(true);
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [pwd, setPwd] = useState({ current: "", newPwd: "", confirm: "" });
  const [saved, setSaved] = useState("");

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button type="button" onClick={onChange} className={`w-12 h-6 rounded-full transition-all ${value ? "bg-[#0EA5E9]" : "bg-[#E2E8F0]"} relative`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? "left-7" : "left-1"}`} />
    </button>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0284C7] to-[#38BDF8] px-6 pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <div className="flex items-center gap-3 relative z-10">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-3xl">👤</div>
          <div>
            <h1 className="text-white text-2xl font-black">Ibrahim Dupont</h1>
            <p className="text-sky-100 text-sm">ibrahim@email.com • Patient</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-24 flex flex-col gap-5 max-w-lg mx-auto">

        {/* Sécurité */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 text-sm">🔒</div>
            <h2 className="font-black text-[#0F172A] text-sm">Sécurité</h2>
          </div>

          <button onClick={() => setShowPwdForm(!showPwdForm)}
            className="w-full flex items-center justify-between py-3 border-b border-[#F1F5F9] last:border-0">
            <span className="text-sm font-semibold text-[#0F172A]">Modifier le mot de passe</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 text-[#94A3B8] transition-transform ${showPwdForm ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>

          {showPwdForm && (
            <form onSubmit={(e) => { e.preventDefault(); setSaved("pwd"); setTimeout(() => setSaved(""), 2000); setShowPwdForm(false); setPwd({ current: "", newPwd: "", confirm: "" }); }}
              className="mt-4 flex flex-col gap-3"
            >
              {[
                { label: "Mot de passe actuel", key: "current" },
                { label: "Nouveau mot de passe", key: "newPwd" },
                { label: "Confirmer", key: "confirm" },
              ].map((f) => (
                <div key={f.key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#64748B]">{f.label}</label>
                  <input type="password" value={pwd[f.key as keyof typeof pwd]} onChange={(e) => setPwd({...pwd, [f.key]: e.target.value})} required
                    className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3 text-sm bg-[#F8FAFC] focus:outline-none focus:border-[#38BDF8] transition" />
                </div>
              ))}
              <button type="submit" className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold py-3 rounded-2xl transition shadow-md mt-1">
                Mettre à jour ✓
              </button>
            </form>
          )}
        </div>

        {/* Langue */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] flex items-center justify-center flex-shrink-0 text-sm">🌐</div>
            <h2 className="font-black text-[#0F172A] text-sm">Langue</h2>
          </div>
          <div className="flex gap-3">
            {[{ k: "fr", l: "🇫🇷 Français" }, { k: "en", l: "🇬🇧 English" }].map((opt) => (
              <button key={opt.k} onClick={() => setLang(opt.k)}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${lang === opt.k ? "bg-[#E0F2FE] text-[#0284C7] border-2 border-[#38BDF8]" : "bg-[#F1F5F9] text-[#64748B] border-2 border-transparent"}`}>
                {opt.l}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0 text-sm">🔔</div>
            <h2 className="font-black text-[#0F172A] text-sm">Notifications</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Alertes de stock</p>
                <p className="text-[#94A3B8] text-xs">Ruptures et niveaux critiques</p>
              </div>
              <Toggle value={notifStock} onChange={() => setNotifStock(!notifStock)} />
            </div>
            <div className="h-px bg-[#F1F5F9]" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Réservations prêtes</p>
                <p className="text-[#94A3B8] text-xs">Commandes disponibles en pharmacie</p>
              </div>
              <Toggle value={notifResa} onChange={() => setNotifResa(!notifResa)} />
            </div>
          </div>
        </div>

        {saved === "pwd" && (
          <div className="bg-[#DCFCE7] border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[#15803D] text-sm font-semibold">Mot de passe mis à jour !</p>
          </div>
        )}

        {/* Déconnexion */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <button
            onClick={() => alert("Déconnexion...")}
            className="w-full flex items-center gap-3 py-2 text-[#EF4444] hover:text-red-700 transition"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
            </div>
            <span className="font-black text-sm">Se déconnecter</span>
          </button>
        </div>

        <p className="text-center text-[#94A3B8] text-xs">
          PROXYMÉDOC v1.0 — Projet ING1 2025
        </p>
      </div>
    </main>
  );
}
