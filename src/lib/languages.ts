export type Language = {
  code: string;
  name: string;
  native: string;
  flag: string;
  rtl?: boolean;
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", native: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦", rtl: true },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹" },
  { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", native: "اردو", flag: "🇵🇰", rtl: true },
];

const KEY = "rizz.lang";
const RECENT_KEY = "rizz.lang.recent";

export const getLang = (): string => localStorage.getItem(KEY) || "en";

export const setLang = (code: string) => {
  localStorage.setItem(KEY, code);
  const recent = getRecent().filter((c) => c !== code);
  recent.unshift(code);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 4)));
  window.dispatchEvent(new CustomEvent("rizz-lang", { detail: code }));
};

export const getRecent = (): string[] => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
};

export const findLang = (code: string) => LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];

export const isRTL = (code: string) => !!findLang(code).rtl;
