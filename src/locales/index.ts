import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import en from "./en/locale.json";
import zh from "./zh/locale.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: navigator.language === "zh-CN" ? "zh" : "en",
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
