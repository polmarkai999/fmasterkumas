import { fal } from "@fal-ai/client";

export const initFal = () => {
  const falKey = localStorage.getItem("FAL_KEY") || import.meta.env.VITE_FAL_KEY;
  if (falKey) {
    fal.config({ credentials: falKey });
    return true;
  }
  return false;
};

// Auto-init
initFal();

export { fal };
