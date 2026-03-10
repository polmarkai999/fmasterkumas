import React, { useState, useRef } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadFile } from "../services/falApi";

interface Props {
  label: string;
  onUpload: (url: string) => void;
  isLoading?: boolean;
}

export const ImageUploader: React.FC<Props> = ({ label, onUpload, isLoading = false }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    try {
      setLocalLoading(true);
      const url = URL.createObjectURL(file);
      setPreview(url);

      const falUrl = await uploadFile(file);
      onUpload(falUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("İşlem sırasında hata! Lütfen tekrar deneyin.");
      setPreview(null);
    } finally {
      setLocalLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onUpload("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-1">
        <label className="text-[11px] font-medium tracking-[0.1em] text-white/40 uppercase">{label}</label>
        <AnimatePresence>
          {preview && !localLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex items-center gap-1.5"
            >
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-[8px] font-bold text-emerald-400/70 uppercase tracking-widest">Hazır</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        whileHover={!preview ? { scale: 1.01 } : {}}
        className={`dropzone-container group h-[180px] flex items-center justify-center relative overflow-hidden card-glass
          ${preview ? 'border-solid border-white/10 bg-black/40' : ''}
          ${isDragging ? 'border-white/30 bg-white/5 scale-[1.02]' : ''}
        `}
        onClick={() => !localLoading && !isLoading && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept="image/*"
          onChange={onFileChange}
          disabled={localLoading || isLoading}
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full h-full p-2.5 flex items-center justify-center z-10"
            >
              <img
                src={preview}
                alt="Önizleme"
                className="h-full max-w-full object-contain rounded-xl shadow-2xl shadow-black/50"
              />
              <motion.button
                whileHover={{ scale: 1.15, backgroundColor: 'rgba(255, 50, 50, 0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={removeImage}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm text-white/30 hover:text-red-400 flex items-center justify-center transition-colors"
              >
                <X size={14} />
              </motion.button>

              {localLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-[18px] backdrop-blur-md z-30"
                >
                  <div className="w-16 h-[2px] bg-white/5 relative overflow-hidden rounded-full mb-4">
                    <motion.div
                      animate={{ x: [-64, 64] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"
                    />
                  </div>
                  <span className="text-[8px] text-[#c5a059]/80 font-bold tracking-[0.4em] uppercase">Yükleniyor</span>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-5 z-10"
            >
              <motion.div
                animate={isDragging ? { scale: 1.1, borderColor: 'rgba(255, 255, 255, 0.2)' } : {}}
                className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-white/30 group-hover:text-white/60 transition-all duration-300 group-hover:bg-white/[0.04]"
              >
                <ImageIcon size={20} />
              </motion.div>
              <div className="text-center space-y-1.5">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] group-hover:text-white/60 transition-colors duration-300">Kaynak Seç</p>
                <p className="text-[9px] text-white/8 font-medium">veya sürükle-bırak</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
