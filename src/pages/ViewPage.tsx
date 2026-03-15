import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUploader } from "../components/ImageUploader";
import { AIModelId, ViewMode } from "../services/falApi";
import { Play, ArrowRight, Sparkles } from "lucide-react";

interface ViewPageProps {
  title: string;
  subtitle: string;
  accentColor: string;
  viewMode: ViewMode;
  onDressUrlChange: (url: string) => void;
  onModelUrlChange: (url: string) => void;
  onLocationUrlChange?: (url: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
  canGenerate: boolean;
  progressMsg: string;
}

export const ViewPage: React.FC<ViewPageProps> = ({
  title,
  subtitle,
  accentColor,
  viewMode,
  onDressUrlChange,
  onModelUrlChange,
  onLocationUrlChange,
  isLoading,
  onGenerate,
  canGenerate,
  progressMsg,
}) => {
  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Top Title Bar */}
      <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">{title}</h2>
          <p className="text-[10px] sm:text-sm text-[#D4AF37]/80 font-light mt-1 sm:mt-2 flex items-center">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            {subtitle} Modu Aktif
          </p>
        </div>
        
        <button 
          onClick={onGenerate}
          disabled={isLoading || !canGenerate}
          className={`w-full sm:w-auto bg-[#D4AF37] hover:bg-[#A67C00] text-black px-6 sm:px-10 py-3 sm:py-4 rounded-full flex items-center justify-center space-x-3 transition-all transform hover:scale-105 shadow-xl shadow-[#D4AF37]/20 font-bold group disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed shrink-0`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <Play size={16} fill="currentColor" strokeWidth={0} />
          )}
          <span className="text-[11px] sm:text-sm uppercase tracking-widest">{isLoading ? 'Üretiliyor...' : 'Üretimi Başlat'}</span>
          {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>

      {/* Upload Zones Grid */}
      <div className={`grid grid-cols-1 ${viewMode.includes('location') ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-4 sm:gap-8 mb-6 sm:mb-10`}>
        {/* Slot 1: Tasarım Girişi */}
        <div className="flex flex-col">
          <label className="text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-400 mb-2 sm:mb-4 font-semibold flex justify-between px-1">
            <span>Tasarım Girişi</span>
            <span className="text-[#D4AF37]/60 italic font-normal">Referans</span>
          </label>
          <ImageUploader label="Giysi Referansı" onUpload={onDressUrlChange} isLoading={isLoading} />
        </div>

        {/* Slot 2: Manken Girişi */}
        <div className="flex flex-col">
          <label className="text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-400 mb-2 sm:mb-4 font-semibold flex justify-between px-1">
            <span>Manken Girişi</span>
            <span className="text-[#D4AF37]/60 italic font-normal">Model</span>
          </label>
          <ImageUploader label="Model Konsepti" onUpload={onModelUrlChange} isLoading={isLoading} />
        </div>

        {/* Slot 3: Mekan Girişi (Optional) */}
        {(viewMode === "location" || viewMode === "location-closeup") && (
          <div className="flex flex-col">
            <label className="text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-400 mb-2 sm:mb-4 font-semibold flex justify-between px-1">
              <span>Mekan Girişi</span>
              <span className="text-[#D4AF37]/60 italic font-normal">Sahne</span>
            </label>
            <ImageUploader label="Mekan Fotoğrafı" onUpload={onLocationUrlChange!} isLoading={isLoading} />
          </div>
        )}
      </div>

      {/* Live Log Overlay */}
      <div className="glass-panel rounded-lg p-4 sm:p-5 font-mono text-[8px] sm:text-[10px] text-gray-500 border-l-2 border-l-[#D4AF37] bg-black/40 mb-8 sm:mb-0">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3">
          <span className={isLoading ? "text-yellow-500 animate-pulse" : "text-green-500 font-bold"}>
            {isLoading ? "● İŞLENİYOR" : "● SİSTEM HAZIR"}
          </span>
          <span className="hidden xs:inline">SUNUCU: OPTIMAL</span>
          <span className="text-[#D4AF37] font-bold">MOD: {viewMode.toUpperCase()}</span>
        </div>
        <div className="space-y-1 opacity-60 overflow-hidden">
          <div className="truncate">DÜĞÜM: {isLoading ? "COMPUTE_ACTIVE" : "IDLE"}</div>
          {isLoading ? (
            <div className="text-white/80 animate-pulse">{progressMsg}</div>
          ) : (
            <div className="truncate">FM_{new Date().getTime().toString().slice(-8)}_SESSION_WAITING...</div>
          )}
        </div>
      </div>
    </div>
  );
};
