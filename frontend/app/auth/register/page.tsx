"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) { setError("Ce champ est requis."); return; }
    setError(""); setStep(2);
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) { setError("Nom et prénom sont obligatoires."); return; }
    if (password.length < 8) { setError("Minimum 8 caractères."); return; }
    if (password !== confirmPassword) { setError("Les mots de passe ne correspondent pas."); return; }
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: identifier.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          password,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(body.error || "Erreur lors de l'inscription. Vérifiez les champs.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError("Impossible de contacter le serveur. Vérifiez que le backend est démarré.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 gap-6">
        <div className="w-28 h-28 rounded-3xl bg-[#DCFCE7] border-2 border-green-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-[#0F172A]">Inscription réussie !</h2>
          <p className="text-[#64748B] text-sm mt-2">Votre compte a été créé. Vérifiez votre email pour confirmer.</p>
        </div>
        <button onClick={() => router.push("/auth/otp")} className="w-full max-w-sm bg-[#0EA5E9] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-[#0284C7] transition">
          Vérifier mon email →
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] px-6 pt-14 pb-16 rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <button onClick={() => step === 2 ? setStep(1) : router.push("/")} className="flex items-center gap-2 text-sky-100 text-sm mb-6 w-fit hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </button>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" alt="Logo" width={46} height={46} className="object-contain" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-black">S&apos;inscrire</h1>
            <p className="text-sky-100 text-sm">Étape {step}/2</p>
          </div>
        </div>
        {/* Barre de progression */}
        <div className="flex gap-2 mt-4">
          <div className="h-1.5 flex-1 rounded-full bg-white" />
          <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? "bg-white" : "bg-white/30"}`} />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-8 max-w-sm mx-auto w-full">
        {step === 1 ? (
          <form onSubmit={handleStep1} className="flex flex-col gap-5">
            <div>
              <p className="font-black text-[#0F172A] text-lg">Votre identifiant</p>
              <p className="text-[#64748B] text-sm mt-0.5">Email ou numéro de téléphone</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#0F172A]">Email ou téléphone</label>
              <input
                type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                placeholder="699 000 000 ou vous@email.com"
                className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]"
              />
            </div>
            {error && <p className="text-red-500 text-sm bg-[#FEE2E2] px-4 py-3 rounded-2xl border border-red-200">{error}</p>}
            <button type="submit" className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold py-4 rounded-2xl shadow-lg transition mt-2">
              Continuer →
            </button>
            <p className="text-center text-sm text-[#64748B]">
              Déjà un compte ?{" "}
              <Link href="/auth/login" className="text-[#0EA5E9] font-bold hover:underline">Se connecter</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleStep2} className="flex flex-col gap-5">
            <div>
              <p className="font-black text-[#0F172A] text-lg">Votre identité</p>
              <p className="text-[#64748B] text-sm mt-0.5">Complétez votre profil</p>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-bold text-[#0F172A]">Nom</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Dupont"
                  className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-bold text-[#0F172A]">Prénom</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ibrahim"
                  className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#0F172A]">Mot de passe</label>
              <div className="relative">
                <input type={showPwd ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 caractères" minLength={8}
                  className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3.5 pr-14 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs font-semibold hover:text-[#0EA5E9]">
                  {showPwd ? "Masquer" : "Voir"}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#0F172A]">Confirmer</label>
              <div className="relative">
                <input type={showPwd ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Répétez votre mot de passe"
                  className={`w-full border-2 rounded-2xl px-4 py-3.5 pr-12 text-sm bg-white focus:outline-none transition placeholder:text-[#94A3B8] ${
                    confirmPassword && confirmPassword === password ? "border-[#22C55E]" :
                    confirmPassword && confirmPassword !== password ? "border-[#EF4444]" : "border-[#E2E8F0] focus:border-[#38BDF8]"
                  }`} />
                {confirmPassword && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {confirmPassword === password
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    }
                  </div>
                )}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm bg-[#FEE2E2] px-4 py-3 rounded-2xl border border-red-200">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-4 rounded-2xl shadow-lg transition disabled:opacity-60 mt-2">
              {loading ? "Création..." : "Créer mon compte ✓"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
