"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...otp]; n[i] = v; setOtp(n);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };
  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const n = [...otp];
    txt.split("").forEach((c, i) => { n[i] = c; });
    setOtp(n);
    inputs.current[Math.min(txt.length, 5)]?.focus();
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length < 6) { setError("Entrez les 6 chiffres."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/patient"); }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header (style maquette vérification mail) */}
      <div className="bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] px-6 pt-14 pb-16 rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sky-100 text-sm mb-6 w-fit hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </button>
        <h1 className="text-white text-2xl font-black relative z-10">Vérification email</h1>
        <p className="text-sky-100 text-sm mt-1 relative z-10">Un code à 6 chiffres vous a été envoyé</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center px-6 pt-10 gap-7 max-w-sm mx-auto w-full">
        {/* Icône email */}
        <div className="w-20 h-20 rounded-3xl bg-[#E0F2FE] border-2 border-[#38BDF8]/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
          </svg>
        </div>

        <div className="text-center">
          <p className="font-black text-[#0F172A] text-lg">Entrez le code reçu</p>
          <p className="text-[#64748B] text-sm mt-1">Vérifiez votre boîte email</p>
        </div>

        {/* Champs OTP */}
        <div className="flex gap-2.5 justify-center" onPaste={handlePaste}>
          {otp.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text" inputMode="numeric" maxLength={1} value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-11 h-14 text-center text-2xl font-black border-2 rounded-2xl transition-all focus:outline-none ${
                d ? "border-[#0EA5E9] bg-[#E0F2FE] text-[#0284C7]"
                  : "border-[#E2E8F0] bg-white text-[#0F172A] focus:border-[#38BDF8]"
              }`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm bg-[#FEE2E2] px-4 py-3 rounded-2xl border border-red-200 w-full text-center">{error}</p>}
        {resent && <p className="text-[#22C55E] text-sm bg-[#DCFCE7] px-4 py-3 rounded-2xl border border-green-200 w-full text-center">Code renvoyé ! ✓</p>}

        <div className="w-full flex flex-col gap-4 mt-auto">
          <button type="submit" disabled={loading || otp.join("").length < 6}
            className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all text-base ${
              otp.join("").length === 6 ? "bg-[#0EA5E9] hover:bg-[#0284C7] text-white" : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
            } disabled:opacity-60`}
          >
            {loading ? "Vérification..." : "Valider le code"}
          </button>
          <p className="text-center text-sm text-[#64748B] pb-6">
            Pas reçu ?{" "}
            <button type="button" onClick={() => { setResent(true); setTimeout(() => setResent(false), 3000); }}
              className="text-[#0EA5E9] font-bold hover:text-[#0284C7] transition">Renvoyer</button>
          </p>
        </div>
      </form>
    </main>
  );
}
