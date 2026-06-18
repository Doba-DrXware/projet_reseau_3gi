"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_MEDICATIONS } from "@/lib/mock-data";

/* Inspiré maquettes "Gestionnaire médicament" + "Formulaire ajout" + "Formulaire modification" + "Confirmation suppression" Figma */

type Med = {
  id: string; name: string; category: string; form: string;
  description: string; price: number; quantity: number; threshold: number;
  prescription: boolean; inStock: boolean;
};

const initialMeds: Med[] = MOCK_MEDICATIONS.map((m) => ({
  id: m.id, name: m.name, category: m.category, form: m.form,
  description: m.description, price: m.price, quantity: m.inStock ? 50 : 0,
  threshold: 10, prescription: false, inStock: m.inStock,
}));

export default function StockPage() {
  const [meds, setMeds] = useState<Med[]>(initialMeds);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Med | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const [form, setForm] = useState({ name: "", category: "Antibiotique", form: "Comprimé", description: "", price: "", quantity: "", threshold: "10", prescription: false });

  const filtered = meds.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setMeds((p) => [...p, { id: String(Date.now()), name: form.name, category: form.category, form: form.form, description: form.description, price: Number(form.price), quantity: Number(form.quantity), threshold: Number(form.threshold), prescription: form.prescription, inStock: Number(form.quantity) > 0 }]);
    setForm({ name: "", category: "Antibiotique", form: "Comprimé", description: "", price: "", quantity: "", threshold: "10", prescription: false });
    setShowAddForm(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    setMeds((p) => p.map((m) => m.id === editTarget.id ? { ...editTarget, inStock: editTarget.quantity > 0 } : m));
    setEditTarget(null);
  };

  const categories = ["Antibiotique", "Analgesique / Antipyrétique", "Antipaludéen", "Anti-inflammatoire", "Vitamines", "Autre"];
  const forms = ["Comprimé", "Gélule", "Sirop", "Injection", "Pommade", "Suppositoire"];

  const InputField = ({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-[#0F172A]">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]" />
    </div>
  );

  const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-[#0F172A]">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0284C7] to-[#38BDF8] px-6 pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <Link href="/pharmacien" className="flex items-center gap-2 text-sky-100 text-sm mb-5 w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </Link>
        <h1 className="text-white text-2xl font-black relative z-10">Gestion du stock</h1>
        <p className="text-sky-100 text-sm mt-1 relative z-10">{meds.length} médicaments référencés</p>
        <div className="mt-4 relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un médicament..."
            className="w-full bg-white rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none shadow-lg placeholder:text-[#94A3B8]" />
        </div>
      </div>

      <div className="px-5 pt-5 pb-24 flex flex-col gap-5">
        {/* Bouton ajouter */}
        <button onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-4 rounded-2xl shadow-lg transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          {showAddForm ? "Annuler" : "Ajouter un médicament"}
        </button>

        {/* Formulaire ajout */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="bg-white rounded-3xl p-5 shadow-md border-2 border-[#DCFCE7] flex flex-col gap-4">
            <h3 className="font-black text-[#0F172A] text-base">Nouveau médicament</h3>
            <InputField label="Nom du médicament" value={form.name} onChange={(v) => setForm({...form, name: v})} placeholder="ex: Paracétamol 500mg" />
            <div className="grid grid-cols-2 gap-3">
              <SelectField label="Catégorie" value={form.category} onChange={(v) => setForm({...form, category: v})} options={categories} />
              <SelectField label="Forme" value={form.form} onChange={(v) => setForm({...form, form: v})} options={forms} />
            </div>
            <InputField label="Description" value={form.description} onChange={(v) => setForm({...form, description: v})} placeholder="Indications thérapeutiques" />
            <div className="grid grid-cols-3 gap-3">
              <InputField label="Prix (FCFA)" value={form.price} onChange={(v) => setForm({...form, price: v})} type="number" placeholder="1500" />
              <InputField label="Quantité" value={form.quantity} onChange={(v) => setForm({...form, quantity: v})} type="number" placeholder="50" />
              <InputField label="Seuil alerte" value={form.threshold} onChange={(v) => setForm({...form, threshold: v})} type="number" placeholder="10" />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-12 h-6 rounded-full transition-all ${form.prescription ? "bg-[#0EA5E9]" : "bg-[#E2E8F0]"} relative`}
                onClick={() => setForm({...form, prescription: !form.prescription})}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.prescription ? "left-7" : "left-1"}`} />
              </div>
              <span className="text-sm font-semibold text-[#0F172A]">Sur ordonnance uniquement</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-3.5 rounded-2xl border-2 border-[#E2E8F0] text-[#64748B] font-bold text-sm">Annuler</button>
              <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-[#22C55E] text-white font-bold text-sm shadow-md hover:bg-[#16A34A] transition">Ajouter ✓</button>
            </div>
          </form>
        )}

        {/* Liste */}
        <p className="text-[#64748B] text-xs font-medium">{filtered.length} médicament{filtered.length !== 1 ? "s" : ""}</p>

        <div className="flex flex-col gap-3">
          {filtered.map((med) => (
            <div key={med.id} className="bg-white rounded-3xl p-4 shadow-md border border-[#F1F5F9]">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl ${med.inStock ? "bg-[#E0F2FE]" : "bg-[#FEE2E2]"}`}>💊</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0F172A] text-sm truncate">{med.name}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{med.form} • {med.category}</p>
                  <p className="text-[#94A3B8] text-xs">Stock : {med.quantity} u. • Seuil : {med.threshold}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-black text-[#0EA5E9] text-sm">{med.price.toLocaleString()} F</span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${med.inStock ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#DC2626]"}`}>
                    {med.inStock ? "En stock" : "Épuisé"}
                  </span>
                  {med.prescription && <span className="bg-[#FEF3C7] text-[#B45309] text-[10px] font-bold px-2 py-0.5 rounded-full">Ordonnance</span>}
                </div>
              </div>

              {/* Progress bar stock */}
              {med.quantity > 0 && (
                <div className="mt-3">
                  <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${med.quantity <= med.threshold ? "bg-[#EF4444]" : "bg-[#22C55E]"}`}
                      style={{ width: `${Math.min(100, (med.quantity / 100) * 100)}%` }} />
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4 pt-4 border-t border-[#F1F5F9]">
                <button onClick={() => setEditTarget({ ...med })}
                  className="flex-1 py-3 rounded-2xl text-xs font-bold bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD] hover:bg-[#BAE6FD] transition">
                  ✏️ Modifier
                </button>
                <button onClick={() => setDeleteTarget(med.id)}
                  className="w-12 h-10 rounded-2xl bg-[#FEE2E2] text-[#EF4444] border border-red-200 flex items-center justify-center hover:bg-red-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom sheet modification */}
      {editTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end overflow-y-auto">
          <div className="bg-white w-full rounded-t-3xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-1 bg-[#E2E8F0] rounded-full mx-auto" />
            <h3 className="font-black text-[#0F172A] text-lg">Modifier le médicament</h3>
            <form onSubmit={handleEdit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#0F172A]">Nom</label>
                <input value={editTarget.name} onChange={(e) => setEditTarget({...editTarget, name: e.target.value})}
                  className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#0F172A]">Prix</label>
                  <input type="number" value={editTarget.price} onChange={(e) => setEditTarget({...editTarget, price: Number(e.target.value)})}
                    className="w-full border-2 border-[#E2E8F0] rounded-2xl px-3 py-3 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#0F172A]">Quantité</label>
                  <input type="number" value={editTarget.quantity} onChange={(e) => setEditTarget({...editTarget, quantity: Number(e.target.value)})}
                    className="w-full border-2 border-[#E2E8F0] rounded-2xl px-3 py-3 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#0F172A]">Seuil</label>
                  <input type="number" value={editTarget.threshold} onChange={(e) => setEditTarget({...editTarget, threshold: Number(e.target.value)})}
                    className="w-full border-2 border-[#E2E8F0] rounded-2xl px-3 py-3 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition" />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-12 h-6 rounded-full transition-all ${editTarget.prescription ? "bg-[#0EA5E9]" : "bg-[#E2E8F0]"} relative`}
                  onClick={() => setEditTarget({...editTarget, prescription: !editTarget.prescription})}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${editTarget.prescription ? "left-7" : "left-1"}`} />
                </div>
                <span className="text-sm font-semibold text-[#0F172A]">Sur ordonnance uniquement</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditTarget(null)} className="flex-1 py-4 rounded-2xl border-2 border-[#E2E8F0] text-[#64748B] font-bold">Annuler</button>
                <button type="submit" className="flex-1 py-4 rounded-2xl bg-[#0EA5E9] text-white font-bold shadow-lg hover:bg-[#0284C7] transition">Sauvegarder ✓</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom sheet suppression */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 flex flex-col gap-5">
            <div className="w-12 h-1 bg-[#E2E8F0] rounded-full mx-auto" />
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 rounded-3xl bg-[#FEE2E2] flex items-center justify-center text-3xl">🗑️</div>
              <div>
                <h3 className="font-black text-[#0F172A] text-lg">Supprimer ce médicament ?</h3>
                <p className="text-[#64748B] text-sm mt-1">Cette action est irréversible.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-4 rounded-2xl border-2 border-[#E2E8F0] text-[#64748B] font-bold">Annuler</button>
              <button onClick={() => { setMeds((p) => p.filter((m) => m.id !== deleteTarget)); setDeleteTarget(null); }}
                className="flex-1 py-4 rounded-2xl bg-[#EF4444] text-white font-bold shadow-lg hover:bg-red-600 transition">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
