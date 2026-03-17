import React, { useState, useEffect } from 'react';
import { Leaf, Sparkles, Users, CheckCircle2, Clock, Trophy, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DONNÉES DU DÉFI ---
const DAILY_CHALLENGE = {
  id: "1",
  title: "Zéro Déchet au Déjeuner",
  description: "Aujourd'hui, utilise des couverts réutilisables et évite tout emballage plastique jetable pour ton repas !",
  points: 40,
  participants: 124
};

export default function App() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const isAfter13h = new Date().getHours() >= 13;

  if (loading) return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 p-6 space-y-8 animate-pulse">
      <div className="h-48 bg-slate-200 rounded-[2.5rem]" />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-20 bg-slate-200 rounded-2xl" />
        <div className="h-20 bg-slate-200 rounded-2xl" />
        <div className="h-20 bg-slate-200 rounded-2xl" />
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 font-sans shadow-2xl pb-10">
      {/* HEADER */}
      <div className="relative h-60 bg-emerald-600 p-6 flex flex-col justify-between text-white overflow-hidden">
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md border border-white/30">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tighter uppercase leading-none">Green Challenge</h1>
            <p className="text-[10px] font-bold opacity-70 tracking-widest mt-1 text-white/80">BY EKLORE</p>
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-bold bg-black/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl" />
      </div>

      {/* STATS */}
      <div className="px-4 -mt-8 relative z-20 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Zap className="w-4 h-4 text-amber-500" />} label="Défi" value={isAfter13h ? "Actif" : "À 13h"} />
          <StatCard icon={<Trophy className="w-4 h-4 text-yellow-500" />} label="Top 1" value="+100 pts" />
          <StatCard icon={<Leaf className="w-4 h-4 text-emerald-500" />} label="Action" value="+40 pts" />
        </div>

        {!isAfter13h ? (
          <div className="bg-white p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center space-y-4">
            <Clock className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="font-black text-slate-800">Le défi arrive à 13h00...</p>
          </div>
        ) : (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-emerald-50">
              <h3 className="text-2xl font-black text-emerald-900 mb-3">{DAILY_CHALLENGE.title}</h3>
              <p className="text-slate-600 mb-8">{DAILY_CHALLENGE.description}</p>
              {!hasSubmitted ? (
                <button
                  onClick={() => setHasSubmitted(true)}
                  className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black shadow-lg shadow-emerald-500/30 active:scale-95 transition-all"
                >
                  J'AI RÉUSSI ! (+40 pts)
                </button>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Bravo ! Preuve envoyée.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
      <div className="mb-1">{icon}</div>
      <div className="text-[10px] font-bold text-slate-400 uppercase">{label}</div>
      <div className="text-xs font-black text-slate-800">{value}</div>
    </div>
  );
}
