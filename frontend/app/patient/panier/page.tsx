"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_CART, PROCESSING_FEE } from "@/lib/mock-data";

export default function PanierPage() {
  const router = useRouter();
  const [cart, setCart] = useState(MOCK_CART);
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = cart.reduce((a, i) => a + i.price * i.quantity, 0);
  const total = subtotal + PROCESSING_FEE;

  const updateQty = (id: string, delta: number) =>
    setCart((p) => p.map((i) => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter((i) => i.quantity > 0));

  if (confirmed) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 gap-6">
        <div className="w-28 h-28 rounded-3xl bg-[#DCFCE7] border-2 border-green-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-[#0F172A]">Réservation confirmée !</h2>
          <p className="text-[#64748B] text-sm mt-2 leading-relaxed max-w-xs">
            Rendez-vous en pharmacie dans les <strong>24 heures</strong>. Paiement en <strong>espèces</strong> au comptoir.
          </p>
        </div>
        <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-3xl p-4 w-full max-w-sm">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-xl">⚠️</span>
            <p className="text-[#B45309] text-xs leading-relaxed">Délai de 24h obligatoire. Paiement cash uniquement.</p>
          </div>
        </div>
        <button onClick={() => { setConfirmed(false); setCart([]); router.push("/patient"); }}
          className="w-full max-w-sm bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold py-4 rounded-2xl shadow-lg transition">
          Retour à l&apos;accueil
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0284C7] to-[#38BDF8] px-6 pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sky-100 text-sm mb-5 w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </button>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl">🛒</div>
          <div>
            <h1 className="text-white text-2xl font-black">Mon Panier</h1>
            <p className="text-sky-100 text-sm">{cart.length} article{cart.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-40 flex flex-col gap-5">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="w-24 h-24 rounded-3xl bg-[#F1F5F9] flex items-center justify-center text-5xl">🛒</div>
            <p className="font-bold text-[#64748B] text-lg">Panier vide</p>
            <button onClick={() => router.push("/patient/medicaments")} className="bg-[#0EA5E9] text-white font-bold px-6 py-3 rounded-2xl shadow">
              Parcourir les médicaments
            </button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-4 shadow-md border border-[#F1F5F9]">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 text-2xl">💊</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0F172A] text-sm leading-tight">{item.name}</p>
                    <p className="text-[#64748B] text-xs mt-0.5">{item.form}</p>
                    <p className="text-[#94A3B8] text-xs mt-0.5">{item.pharmacy}</p>
                  </div>
                  <span className="font-black text-[#0EA5E9] text-sm">{(item.price * item.quantity).toLocaleString()} F</span>
                </div>
                <div className="mt-4 flex items-center justify-between bg-[#F8FAFC] rounded-2xl px-4 py-2">
                  <span className="text-[#64748B] text-xs">{item.price.toLocaleString()} F/u</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center font-bold text-[#EF4444] hover:bg-[#FEE2E2] transition">−</button>
                    <span className="font-black text-[#0F172A] w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-xl bg-[#0EA5E9] flex items-center justify-center font-bold text-white hover:bg-[#0284C7] transition">+</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Récapitulatif */}
            <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
              <h2 className="font-black text-[#0F172A] text-sm mb-4">Récapitulatif</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between"><span className="text-[#64748B] text-sm">Sous-total</span><span className="font-semibold text-[#0F172A] text-sm">{subtotal.toLocaleString()} FCFA</span></div>
                <div className="flex justify-between"><span className="text-[#64748B] text-sm">Frais de traitement</span><span className="font-semibold text-[#0F172A] text-sm">{PROCESSING_FEE.toLocaleString()} FCFA</span></div>
                <div className="h-px bg-[#F1F5F9] my-1" />
                <div className="flex justify-between"><span className="font-black text-[#0F172A]">Total</span><span className="font-black text-[#0EA5E9] text-lg">{total.toLocaleString()} FCFA</span></div>
              </div>
            </div>

            {/* Avertissement */}
            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-3xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-xl">⚠️</span>
                <div>
                  <p className="font-bold text-[#B45309] text-sm">Paiement en pharmacie</p>
                  <p className="text-[#B45309] text-xs mt-1">Récupérez dans <strong>24h</strong>. Paiement uniquement en <strong>espèces</strong>.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-5 py-4 shadow-[0_-4px_20px_rgba(14,165,233,0.1)]">
          <button onClick={() => setShowModal(true)} className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-4 rounded-2xl shadow-lg transition text-base">
            Confirmer la réservation — {total.toLocaleString()} FCFA
          </button>
        </div>
      )}

      {/* Modal confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 flex flex-col gap-5">
            <div className="w-12 h-1 bg-[#E2E8F0] rounded-full mx-auto" />
            <div className="text-center">
              <h3 className="font-black text-[#0F172A] text-lg">Confirmer la réservation ?</h3>
              <p className="text-[#64748B] text-sm mt-2">Vous vous engagez à récupérer et payer en pharmacie dans les 24 heures.</p>
            </div>
            <div className="bg-[#E0F2FE] rounded-2xl p-4 text-center">
              <p className="text-[#64748B] text-sm">Montant total à payer</p>
              <p className="font-black text-[#0EA5E9] text-2xl mt-1">{total.toLocaleString()} FCFA</p>
              <p className="text-[#94A3B8] text-xs mt-1">En espèces au comptoir</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 rounded-2xl border-2 border-[#E2E8F0] text-[#64748B] font-bold">Annuler</button>
              <button onClick={() => { setShowModal(false); setConfirmed(true); }} className="flex-1 py-4 rounded-2xl bg-[#22C55E] text-white font-bold shadow-lg hover:bg-[#16A34A] transition">Confirmer ✓</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
