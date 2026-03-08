import { createContext, useContext } from "react";

type Lang = "nl" | "fr";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangContextType>({
  lang: "nl",
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);
