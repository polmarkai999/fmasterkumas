import React from "react";
import { motion } from "framer-motion";
import { Camera, Video, ArrowRight, Sparkles, Film, User as UserIcon, LogOut } from "lucide-react";
import logoUrl from "../logo.jpg";
import { User } from "@supabase/supabase-js";

interface Props {
  onSelectPhoto: () => void;
  onSelectVideo: () => void;
  user: User | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenPricing: () => void;
}

export const LandingPage: React.FC<Props> = ({ onSelectPhoto, onSelectVideo, user, onOpenAuth, onSignOut, onOpenPricing }) => {
  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-start sm:justify-center z-[9999] overflow-y-auto sm:overflow-hidden py-12 px-6">
      {/* Ambient radial glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#D4AF37]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-[#D4AF37]/[0.03] blur-[100px] pointer-events-none" />

      {/* Top Navigation */}
      <div className="absolute top-6 right-6 z-[10000] flex items-center gap-4">
        <button 
          onClick={onOpenPricing}
          className="text-[10px] font-bold text-white/40 hover:text-[#D4AF37] uppercase tracking-[0.2em] transition-colors pr-4 border-r border-white/10 hidden sm:block"
        >
          Paketler
        </button>

        {user ? (
          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{user.email?.split('@')[0]}</span>
              <button 
                onClick={onSignOut}
                className="text-[9px] text-[#D4AF37] font-bold hover:underline flex items-center gap-1"
              >
                Çıkış Yap
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-bold uppercase">
              {user.email?.substring(0, 2)}
            </div>
          </div>
        ) : (
          <button 
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-full text-white/80 hover:text-white hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-md group"
          >
            <UserIcon size={16} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Giriş Yap</span>
          </button>
        )}
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="mb-8 sm:mb-14 text-center relative z-10 shrink-0"
      >
        <img
          src={logoUrl}
          alt="FashionMaster"
          className="mx-auto mb-3 w-40 sm:w-[220px]"
          style={{ mixBlendMode: "screen", opacity: 0.9 }}
        />
        <p className="text-[8px] sm:text-[9px] text-white/25 font-bold uppercase tracking-[0.45em]">FashionMaster Kumaş</p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-white/20 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-8 sm:mb-12 relative z-10 shrink-0"
      >
        Modül Seçiniz
      </motion.p>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 relative z-10 w-full max-w-3xl py-4">
        {/* ── Photo Card ── */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          whileHover={{ scale: 1.03, y: -6 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSelectPhoto}
          className="group relative w-full sm:w-72 aspect-[16/9] sm:aspect-auto sm:h-80 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between text-left overflow-hidden cursor-pointer hover:border-[#D4AF37]/35 transition-all duration-500"
        >
          {/* Gold hover glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/[0.04] group-hover:to-transparent transition-all duration-700 pointer-events-none rounded-2xl" />
          
          <div className="flex sm:block items-center gap-4 sm:gap-0">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-0 sm:mb-6 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/35 transition-all duration-400 shrink-0">
              <Camera size={20} className="text-[#D4AF37]/80 group-hover:text-[#D4AF37] transition-colors duration-300" strokeWidth={1.5} />
            </div>

            <div>
              <h2 className="font-bold text-white/80 text-base sm:text-lg tracking-tight mb-1 sm:mb-2 group-hover:text-white transition-colors duration-300">
                Fotoğraf Stüdyosu
              </h2>
              <p className="text-[10px] sm:text-[11px] text-white/30 leading-relaxed group-hover:text-white/45 transition-colors duration-300 line-clamp-2 sm:line-clamp-none">
                Seçilen kumaşı yapay zeka ile modele uygula.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#D4AF37]/40 group-hover:text-[#D4AF37]/80 transition-all duration-300 mt-2 sm:mt-0">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">Stüdyoya Gir</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </motion.button>

        {/* ── Video Card ── */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          whileHover={{ scale: 1.03, y: -6 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSelectVideo}
          className="group relative w-full sm:w-72 aspect-[16/9] sm:aspect-auto sm:h-80 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between text-left overflow-hidden cursor-pointer hover:border-[#c27ba0]/35 transition-all duration-500"
        >
          {/* Rose hover glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#c27ba0]/0 to-[#c27ba0]/0 group-hover:from-[#c27ba0]/[0.04] group-hover:to-transparent transition-all duration-700 pointer-events-none rounded-2xl" />

          {/* Veo badge */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#c27ba0]/10 border border-[#c27ba0]/20">
            <Sparkles size={8} className="text-[#c27ba0]/80" />
            <span className="text-[6px] sm:text-[7px] font-bold text-[#c27ba0]/80 uppercase tracking-[0.15em]">Veo 3.1</span>
          </div>

          <div className="flex sm:block items-center gap-4 sm:gap-0">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#c27ba0]/10 border border-[#c27ba0]/20 flex items-center justify-center mb-0 sm:mb-6 group-hover:bg-[#c27ba0]/15 group-hover:border-[#c27ba0]/35 transition-all duration-400 shrink-0">
              <Film size={20} className="text-[#c27ba0]/80 group-hover:text-[#c27ba0] transition-colors duration-300" strokeWidth={1.5} />
            </div>

            <div>
              <h2 className="font-bold text-white/80 text-base sm:text-lg tracking-tight mb-1 sm:mb-2 group-hover:text-white transition-colors duration-300">
                Video Stüdyosu
              </h2>
              <p className="text-[10px] sm:text-[11px] text-white/30 leading-relaxed group-hover:text-white/45 transition-colors duration-300 line-clamp-2 sm:line-clamp-none">
                Üretilen görsellerden sinematik moda videosu oluştur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#c27ba0]/40 group-hover:text-[#c27ba0]/80 transition-all duration-300 mt-2 sm:mt-0">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">Stüdyoya Gir</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </motion.button>
      </div>

      {/* Bottom version */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="absolute bottom-8 text-[8px] text-white/10 font-bold uppercase tracking-[0.3em]"
      >
        FM v4.2.0 · Haute Couture AI Platform
      </motion.p>
    </div>
  );
};
