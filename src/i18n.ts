import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import lang_en from "./locales/en.json";
import lang_de from "./locales/de.json";
import lang_Ox2A from ".locales/0x2A.json"

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: { translation: lang_en },
        de: { translation: lang_de },
        Ox2A: { translation: lang_Ox2A },
    },
});
export default i18n