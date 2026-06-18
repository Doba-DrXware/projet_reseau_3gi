"use client";

import { useState, useRef } from "react";
import { MOCK_PRESCRIPTION } from "@/lib/mock-data";

export default function OrdonnancePage() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name); setUploaded(true); setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setDone(true); }, 2500);
  };

  const found = MOCK_PRESCRIPTION.filter((m) => m.found);
  const notFound = MOCK_PRESCRIPTION.filter((m) => !m.found);
  const total = found.reduce((a, m) => a + (m.price || 0), 0);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#7C3AED] to-[#9333EA] px-6 pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <div className="mb-5">
          <h1 className="text-white text-2xl font-black relative z-10">Ordonnance</h1>
          <p className="text-purple-200 text-sm mt-1 relative z-10">Scannez votre prescription médicale</p>
        </div>
      </div>

      <div className="px-5 pt-5 pb-24 flex flex-col gap-5">
        {!uploaded ? (
          <>
            <div onClick={() => inputRef.current?.click()}
              className="bg-white rounded-3xl p-8 shadow-md border-2 border-dashed border-purple-200 flex flex-col items-center gap-4 cursor-pointer hover:border-[#9333EA] hover:bg-purple-50/30 transition-all active:scale-98"
            >
              <div className="w-20 h-20 rounded-3xl bg-purple-50 flex items-center justify-center text-4xl">📋</div>
              <div className="text-center">
                <p className="font-black text-[#0F172A] text-base">Importer une ordonnance</p>
                <p className="text-[#64748B] text-sm mt-1">Photo, scan (JPG, PNG, PDF)</p>
              </div>
              <span className="bg-[#9333EA] text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-md">Choisir un fichier</span>
            </div>
            <input ref={inputRef} type="file" accept="image/*,.pdf" onChange={handleFile} className="hidden" />

            <div className="bg-purple-50 border border-purple-100 rounded-3xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0 text-lg">ℹ️</div>
                <div>
                  <p className="font-bold text-purple-700 text-sm">Comment ça fonctionne ?</p>
                  <p className="text-purple-500 text-xs mt-1 leading-relaxed">Notre IA analyse votre ordonnance et identifie les médicaments disponibles dans les pharmacies proches.</p>
                </div>
              </div>
            </div>
          </>
        ) : analyzing ? (
          <div className="flex flex-col items-center gap-6 py-16">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-purple-50 flex items-center justify-center text-5xl animate-pulse">📋</div>
              <div className="absolute inset-0 rounded-3xl border-4 border-purple-300 animate-ping opacity-40" />
            </div>
            <div className="text-center">
              <p className="font-black text-[#0F172A] text-lg">Analyse en cours...</p>
              <p className="text-[#64748B] text-sm mt-1">{fileName}</p>
            </div>
            <div className="flex gap-1.5">
              {[0,1,2].map((i) => <div key={i} className="w-2 h-2 rounded-full bg-[#9333EA] animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}
            </div>
          </div>
        ) : (
          <>
            {/* Succès */}
            <div className="bg-[#DCFCE7] border border-green-200 rounded-3xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#15803D] text-sm">Analyse réussie ✓</p>
                <p className="text-[#22C55E] text-xs mt-0.5">{fileName}</p>
              </div>
              <button onClick={() => { setUploaded(false); setDone(false); setFileName(""); if(inputRef.current) inputRef.current.value=""; }}
                className="text-[#94A3B8] hover:text-[#64748B]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
              </button>
            </div>

            {/* Trouvés */}
            <div>
              <h2 className="font-black text-[#0F172A] text-base mb-3">✓ Disponibles ({found.length})</h2>
              <div className="flex flex-col gap-3">
                {found.map((m, i) => (
                  <div key={i} className="bg-white rounded-3xl p-4 shadow-md flex items-center gap-4 border border-[#F1F5F9]">
                    <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] flex items-center justify-center text-xl flex-shrink-0">💊</div>
                    <div className="flex-1">
                      <p className="font-bold text-[#0F172A] text-sm">{m.name}</p>
                      <p className="text-[#64748B] text-xs mt-0.5">{m.pharmacy}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-[#0EA5E9] text-sm">{m.price?.toLocaleString()} F</p>
                      <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-2 py-0.5 rounded-full">Dispo</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {notFound.length > 0 && (
              <div>
                <h2 className="font-black text-[#0F172A] text-base mb-3">✗ Introuvables ({notFound.length})</h2>
                <div className="flex flex-col gap-3">
                  {notFound.map((m, i) => (
                    <div key={i} className="bg-white rounded-3xl p-4 shadow-md flex items-center gap-4 opacity-60 border border-[#F1F5F9]">
                      <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] flex items-center justify-center text-xl flex-shrink-0">🚫</div>
                      <div className="flex-1"><p className="font-bold text-[#0F172A] text-sm">{m.name}</p><p className="text-[#94A3B8] text-xs">Non disponible</p></div>
                      <span className="bg-[#FEE2E2] text-[#DC2626] text-[10px] font-bold px-2 py-0.5 rounded-full">Rupture</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-[#64748B]">Total ordonnance</span>
                <span className="font-black text-[#0EA5E9] text-xl">{total.toLocaleString()} FCFA</span>
              </div>
              <button className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold py-4 rounded-2xl shadow-lg transition">
                Ajouter tout au panier
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
