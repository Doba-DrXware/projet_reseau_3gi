"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ─── Comptes de démo pour pré-remplir les champs ───────────────────────
   patient     : 699000001 / patient123
   pharmacien  : 699000002 / pharma123
   admin       : admin@proxymedoc.cm / admin123
──────────────────────────────────────────────────────────── */
const DEMO_ACCOUNTS = [
  { identifier: "699000001",           password: "patient123",  role: "patient"    },
  { identifier: "patient@demo.cm",     password: "patient123",  role: "patient"    },
  { identifier: "699000002",           password: "pharma123",   role: "pharmacien" },
  { identifier: "pharma@demo.cm",      password: "pharma123",   role: "pharmacien" },
  { identifier: "admin@proxymedoc.cm", password: "admin123",    role: "admin"      },
];

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) { setError("Veuillez remplir tous les champs."); return; }
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(body.error || "Erreur de connexion. Vérifiez vos identifiants.");
        setLoading(false);
        return;
      }

      const resultat = await response.json();
      localStorage.setItem("token", resultat.token);
      localStorage.setItem("role", resultat.role);
      localStorage.setItem("userId", String(resultat.userId));
      // stocker prénom/nom et identifiant pour affichage du profil
      if (resultat.firstName) localStorage.setItem("firstName", resultat.firstName);
      if (resultat.lastName) localStorage.setItem("lastName", resultat.lastName);
      // conserver l'identifiant utilisé pour la connexion (email ou téléphone)
      localStorage.setItem("identifier", identifier.trim());

      if (resultat.role === "PATIENT") router.push("/patient");
      else if (resultat.role === "PHARMACIEN") router.push("/pharmacien");
      else if (resultat.role === "ADMIN") router.push("/admin");
      else router.push("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Impossible de contacter le serveur. Vérifiez que le backend est démarré.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header bleu ciel (style maquette page se connecter) */}
      <div className="bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] px-6 pt-14 pb-16 rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <div className="absolute bottom-[-15px] left-[20px] w-20 h-20 rounded-full bg-[#0284C7]/30" />

        <Link href="/" className="flex items-center gap-2 text-sky-100 text-sm mb-6 w-fit hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Retour
        </Link>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" alt="Logo" width={46} height={46} className="object-contain" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-black">Se connecter</h1>
            <p className="text-sky-100 text-sm mt-0.5">Bienvenue sur PROXYMÉDOC</p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 pt-8 gap-5 max-w-sm mx-auto w-full">

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#0F172A]">Email ou téléphone</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#38BDF8]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <input
              type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)}
              placeholder="699 000 000 ou vous@email.com"
              className="w-full border-2 border-[#E2E8F0] rounded-2xl pl-12 pr-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#0F172A]">Mot de passe</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#38BDF8]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              className="w-full border-2 border-[#E2E8F0] rounded-2xl pl-12 pr-14 py-3.5 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0EA5E9] transition">
              {showPassword
                ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              }
            </button>
          </div>
        </div>

        <div className="text-right -mt-2">
          <Link href="/auth/forgot-password" className="text-[#0EA5E9] text-sm font-semibold hover:text-[#0284C7] transition">
            Mot de passe oublié ?
          </Link>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-[#FEE2E2] border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374l7.303-12.748c.866-1.5 3.032-1.5 3.898 0l7.303 12.748z" /></svg>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] active:bg-[#0369A1] text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-base disabled:opacity-60 mt-1"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Connexion...
            </span>
          ) : "Se connecter"}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-[#94A3B8] text-xs">ou</span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        <p className="text-center text-sm text-[#64748B]">
          Pas de compte ?{" "}
          <Link href="/auth/register" className="text-[#0EA5E9] font-bold hover:text-[#0284C7] transition">
            S&apos;inscrire gratuitement
          </Link>
        </p>

        {/* Comptes de démo */}
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-4 mt-2">
          <p className="text-[#0284C7] text-xs font-black mb-2">🧪 Comptes de démo</p>
          <div className="flex flex-col gap-1.5">
            {[
              { role: "Patient",     id: "699000001",           pwd: "patient123",  color: "text-[#15803D]" },
              { role: "Pharmacien",  id: "699000002",           pwd: "pharma123",   color: "text-[#7C3AED]" },
              { role: "Admin",       id: "admin@proxymedoc.cm", pwd: "admin123",    color: "text-[#B45309]" },
            ].map((a) => (
              <button key={a.role} type="button"
                onClick={() => { setIdentifier(a.id); setPassword(a.pwd); setError(""); }}
                className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-[#E2E8F0] hover:border-[#38BDF8] transition text-left"
              >
                <span className={`text-xs font-black ${a.color}`}>{a.role}</span>
                <span className="text-[#94A3B8] text-[10px] font-mono">{a.id}</span>
              </button>
            ))}
          </div>
          <p className="text-[#94A3B8] text-[10px] mt-2">Cliquez sur un rôle pour pré-remplir les champs</p>
        </div>
      </form>
    </main>
  );
}
