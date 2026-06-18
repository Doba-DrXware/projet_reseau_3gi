"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"email" | "phone" | null>(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] px-6 pt-14 pb-16 rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sky-100 text-sm mb-6 w-fit hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </button>
        <h1 className="text-white text-2xl font-black relative z-10">Mot de passe oublié</h1>
        <p className="text-sky-100 text-sm mt-1 relative z-10">Récupérez l&apos;accès à votre compte</p>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-8 max-w-sm mx-auto w-full">
        {!sent ? (
          <>
            {!method ? (
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-black text-[#0F172A] text-lg">Choisir une méthode</p>
                  <p className="text-[#64748B] text-sm mt-0.5">Comment récupérer votre compte ?</p>
                </div>
                {[
                  { key: "email", label: "Via l'email", desc: "Lien de réinitialisation par email",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" /></svg>
                  },
                  { key: "phone", label: "Via le téléphone", desc: "Code SMS sur votre numéro",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" /></svg>
                  },
                ].map((opt) => (
                  <button key={opt.key} onClick={() => setMethod(opt.key as "email" | "phone")}
                    className="flex items-center gap-4 bg-white border-2 border-[#E2E8F0] rounded-3xl p-5 shadow-sm hover:border-[#38BDF8] hover:shadow-md transition-all text-left group"
                  >
                    <div className="w-13 h-12 rounded-2xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 px-2.5 group-hover:bg-[#BAE6FD] transition">
                      {opt.icon}
                    </div>
                    <div>
                      <p className="font-bold text-[#0F172A]">{opt.label}</p>
                      <p className="text-[#64748B] text-xs mt-0.5">{opt.desc}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#CBD5E1] ml-auto group-hover:text-[#38BDF8] transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setSent(true); }, 1500); }}
                className="flex flex-col gap-5"
              >
                <button type="button" onClick={() => setMethod(null)} className="text-[#0EA5E9] text-sm font-semibold flex items-center gap-1 w-fit hover:text-[#0284C7] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                  Changer de méthode
                </button>
                <div>
                  <p className="font-black text-[#0F172A] text-lg">{method === "email" ? "Votre email" : "Votre téléphone"}</p>
                  <p className="text-[#64748B] text-sm mt-0.5">{method === "email" ? "Un lien sera envoyé à cette adresse" : "Un code SMS sera envoyé"}</p>
                </div>
                <input
                  type={method === "email" ? "email" : "tel"} value={value} onChange={(e) => setValue(e.target.value)}
                  placeholder={method === "email" ? "vous@email.com" : "6XX XXX XXX"} required
                  className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]"
                />
                <button type="submit" disabled={loading} className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold py-4 rounded-2xl shadow-lg transition disabled:opacity-60">
                  {loading ? "Envoi..." : "Envoyer le lien →"}
                </button>
              </form>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 mt-8 text-center">
            <div className="w-24 h-24 rounded-3xl bg-[#DCFCE7] border-2 border-green-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h2 className="text-xl font-black text-[#0F172A]">Lien envoyé !</h2>
              <p className="text-[#64748B] text-sm mt-2">Vérifiez votre {method === "email" ? "boîte email" : "téléphone"} et suivez les instructions.</p>
            </div>
            <button onClick={() => router.push("/auth/login")} className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold py-4 rounded-2xl shadow-lg transition">
              Retour à la connexion
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
