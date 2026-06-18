"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const criteria = [
    { label: "8 caractères minimum", ok: password.length >= 8 },
    { label: "Une majuscule", ok: /[A-Z]/.test(password) },
    { label: "Un chiffre", ok: /[0-9]/.test(password) },
    { label: "Un caractère spécial", ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const strength = criteria.filter((c) => c.ok).length;
  const strengthColors = ["bg-[#E2E8F0]", "bg-[#EF4444]", "bg-[#F59E0B]", "bg-[#38BDF8]", "bg-[#22C55E]"];
  const strengthLabels = ["", "Très faible", "Faible", "Moyen", "Fort"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError("Minimum 8 caractères."); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 gap-6">
        <div className="w-24 h-24 rounded-3xl bg-[#DCFCE7] border-2 border-green-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-[#0F172A]">Mot de passe modifié !</h2>
          <p className="text-[#64748B] text-sm mt-2">Votre mot de passe a été réinitialisé. Vous pouvez vous connecter.</p>
        </div>
        <button onClick={() => router.push("/auth/login")} className="w-full max-w-sm bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold py-4 rounded-2xl shadow-lg transition">
          Se connecter →
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] px-6 pt-14 pb-16 rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sky-100 text-sm mb-6 w-fit hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </button>
        <h1 className="text-white text-2xl font-black relative z-10">Nouveau mot de passe</h1>
        <p className="text-sky-100 text-sm mt-1 relative z-10">Choisissez un mot de passe sécurisé</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 pt-8 gap-5 max-w-sm mx-auto w-full">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#0F172A]">Nouveau mot de passe</label>
          <div className="relative">
            <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 caractères" required
              className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3.5 pr-14 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs font-semibold hover:text-[#0EA5E9]">
              {show ? "Masquer" : "Voir"}
            </button>
          </div>
          {password.length > 0 && (
            <div className="mt-1">
              <div className="flex gap-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : "bg-[#E2E8F0]"}`} />
                ))}
              </div>
              <p className="text-xs mt-1 font-semibold" style={{ color: ["","#EF4444","#F59E0B","#38BDF8","#22C55E"][strength] }}>
                {strengthLabels[strength]}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#0F172A]">Confirmer</label>
          <div className="relative">
            <input type={show ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Répétez" required
              className={`w-full border-2 rounded-2xl px-4 py-3.5 pr-12 text-sm bg-white focus:outline-none transition placeholder:text-[#94A3B8] ${
                confirm && confirm === password ? "border-[#22C55E]" :
                confirm && confirm !== password ? "border-[#EF4444]" : "border-[#E2E8F0] focus:border-[#38BDF8]"
              }`} />
            {confirm && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {confirm === password
                  ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                }
              </div>
            )}
          </div>
        </div>

        {/* Critères */}
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-4">
          <p className="text-xs font-bold text-[#0284C7] mb-2">Critères de sécurité</p>
          <div className="grid grid-cols-2 gap-1.5">
            {criteria.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5">
                {c.ok
                  ? <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  : <div className="w-3.5 h-3.5 rounded-full border-2 border-[#CBD5E1] flex-shrink-0" />
                }
                <span className={`text-xs ${c.ok ? "text-[#22C55E] font-semibold" : "text-[#94A3B8]"}`}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm bg-[#FEE2E2] px-4 py-3 rounded-2xl border border-red-200">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-4 rounded-2xl shadow-lg transition disabled:opacity-60 mt-2">
          {loading ? "Réinitialisation..." : "Réinitialiser le mot de passe ✓"}
        </button>
      </form>
    </main>
  );
}
