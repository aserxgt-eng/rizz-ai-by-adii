import { useEffect, useState } from "react";
import { getLang, setLang as persist } from "@/lib/languages";

export const useLanguage = () => {
  const [lang, setLangState] = useState<string>(getLang());
  useEffect(() => {
    const handler = (e: Event) => setLangState((e as CustomEvent).detail as string);
    window.addEventListener("rizz-lang", handler);
    return () => window.removeEventListener("rizz-lang", handler);
  }, []);
  const setLang = (code: string) => { persist(code); setLangState(code); };
  return { lang, setLang };
};
