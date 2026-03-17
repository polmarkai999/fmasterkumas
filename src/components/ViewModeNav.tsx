import React from "react";
import { Eye, RotateCcw, Focus, Camera, MapPin, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type ShootMode = "studio" | "location";

interface ViewTab {
  key: string;
  path: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
}

const studioTabs: ViewTab[] = [
  {
    key: "front",
    path: "/",
    label: "Ön Görünüm",
    sublabel: "Editoryal Çekim",
    icon: <Eye size={16} />,
    color: "#D4AF37",
  },
  {
    key: "back",
    path: "/back",
    label: "Arka Görünüm",
    sublabel: "Detaylı Çekim",
    icon: <RotateCcw size={16} />,
    color: "#D4AF37",
  },
  {
    key: "closeup",
    path: "/closeup",
    label: "Yakın Plan",
    sublabel: "Detay Odağı",
    icon: <Focus size={16} />,
    color: "#D4AF37",
  },
  {
    key: "jacket-transfer",
    path: "/jacket-transfer",
    label: "Ceket Transferi",
    sublabel: "Birebir Değişim",
    icon: <Sparkles size={16} />,
    color: "#D4AF37",
  },
];

/* ─── Shoot Mode Toggle (Stüdyo / Mekan) ─── */
interface ShootModeToggleProps {
  shootMode: ShootMode;
  onShootModeChange: (mode: ShootMode) => void;
}

export const ShootModeToggle: React.FC<ShootModeToggleProps> = ({ shootMode, onShootModeChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleShootModeChange = (mode: ShootMode) => {
    onShootModeChange(mode);
    if (mode === "location") {
      navigate("/location");
    } else {
      if (location.pathname === "/location" || location.pathname === "/location-closeup") {
        navigate("/");
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Stüdyo Button */}
      <button
        onClick={() => handleShootModeChange("studio")}
        className={`p-3 glass-panel rounded-sm text-center transition-all ${
          shootMode === "studio" ? "active-gold" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        <Camera size={20} className={`mx-auto mb-2 ${shootMode === "studio" ? "text-[#D4AF37]" : "opacity-50"}`} />
        <span className="text-[10px] block font-medium">Stüdyo</span>
      </button>

      {/* Mekan Button */}
      <button
        onClick={() => handleShootModeChange("location")}
        className={`p-3 glass-panel rounded-sm text-center transition-all ${
          shootMode === "location" ? "active-gold text-white" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        <MapPin size={20} className={`mx-auto mb-2 ${shootMode === "location" ? "text-[#D4AF37]" : "opacity-50"}`} />
        <span className="text-[10px] block font-medium">Mekan</span>
      </button>
    </div>
  );
};

/* ─── View Sub-Tabs (Ön Görünüm / Arka Görünüm / Yakın Plan / Location tabs) ─── */
interface ViewSubTabsProps {
  shootMode: ShootMode;
}

export const ViewSubTabs: React.FC<ViewSubTabsProps> = ({ shootMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveKey = () => {
    if (location.pathname === "/back") return "back";
    if (location.pathname === "/closeup") return "closeup";
    if (location.pathname === "/location") return "location";
    if (location.pathname === "/location-closeup") return "location-closeup";
    if (location.pathname === "/jacket-transfer") return "jacket-transfer";
    return "front";
  };

  const activeKey = getActiveKey();

  return (
    <div className="flex flex-col space-y-2">
      {shootMode === "studio" ? (
        studioTabs.map((tab) => {
          const isActive = activeKey === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.path)}
              className={`flex items-center space-x-3 p-2 glass-panel rounded-sm transition-all ${
                isActive ? "active-gold" : "text-gray-400 hover:bg-white/5"
              }`}
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                isActive ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "border border-white/5"
              }`}>
                {tab.icon}
              </span>
              <div className="text-left">
                <p className="text-[11px] font-medium leading-tight">{tab.label}</p>
                <p className="text-[9px] text-gray-500 font-normal">{tab.sublabel}</p>
              </div>
            </button>
          );
        })
      ) : (
        <>
          <button
            onClick={() => navigate("/location")}
            className={`flex items-center space-x-3 p-2 glass-panel rounded-sm transition-all ${
              activeKey === "location" ? "active-gold" : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <span className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
              activeKey === "location" ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "border border-white/5"
            }`}>
              <MapPin size={16} />
            </span>
            <div className="text-left">
              <p className="text-[11px] font-medium leading-tight">Mekan Çekimi</p>
              <p className="text-[9px] text-gray-500 font-normal">Dış Mekan Editoryal</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/location-closeup")}
            className={`flex items-center space-x-3 p-2 glass-panel rounded-sm transition-all ${
              activeKey === "location-closeup" ? "active-gold" : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <span className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
              activeKey === "location-closeup" ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "border border-white/5"
            }`}>
              <Focus size={16} />
            </span>
            <div className="text-left">
              <p className="text-[11px] font-medium leading-tight">Yakın Plan</p>
              <p className="text-[9px] text-gray-500 font-normal">Dış Mekan Arka Plan</p>
            </div>
          </button>
        </>
      )}
    </div>
  );
};

/* ─── Legacy combined component (kept for backward compatibility) ─── */
interface Props {
  shootMode: ShootMode;
  onShootModeChange: (mode: ShootMode) => void;
}

export const ViewModeNav: React.FC<Props> = ({ shootMode, onShootModeChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <ShootModeToggle shootMode={shootMode} onShootModeChange={onShootModeChange} />
      <ViewSubTabs shootMode={shootMode} />
    </div>
  );
};
