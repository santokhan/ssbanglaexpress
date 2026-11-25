"use client";

import { useEffect, useState } from "react";
import { setPreferredLanguage } from "@/app/actions/language";

type GoogleTranslate = {
  TranslateElement: new (
    options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
    elementId: string,
  ) => unknown;
};

declare global {
  interface Window {
    google?: { translate?: GoogleTranslate };
    googleTranslateElementInit?: () => void;
  }
}

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const preferredLanguage = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("site-language="))
      ?.split("=")[1];
    const translatedLanguage = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("googtrans="))
      ?.split("/")
      .at(-1);
    const savedLanguage = preferredLanguage === "bn" || preferredLanguage === "en"
      ? preferredLanguage
      : translatedLanguage === "bn" ? "bn" : "en";
    setLanguage(savedLanguage);

    const initialize = () => {
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (TranslateElement && !document.querySelector("#google_translate_element select")) {
        new TranslateElement(
          { pageLanguage: "en", includedLanguages: "en,bn", autoDisplay: false },
          "google_translate_element",
        );
      }
    };

    window.googleTranslateElementInit = initialize;
    if (window.google?.translate) {
      initialize();
    } else if (!document.querySelector("script[data-google-translate]")) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.dataset.googleTranslate = "true";
      document.head.appendChild(script);
    }

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  const changeLanguage = async (nextLanguage: string) => {
    if (nextLanguage !== "en" && nextLanguage !== "bn") return;

    try {
      await setPreferredLanguage(nextLanguage);
    } catch {
      return;
    }
    setLanguage(nextLanguage);
    if (nextLanguage === "en") {
      window.location.reload();
      return;
    }

    const select = document.querySelector<HTMLSelectElement>("#google_translate_element select");
    if (select) {
      select.value = nextLanguage;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <label className="sr-only" htmlFor="site-language">Choose language</label>
      <select
        id="site-language"
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
        className="h-10 max-w-[92px] rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus-visible:border-[#b81e46] focus-visible:ring-2 focus-visible:ring-[#b81e46]/20"
      >
        <option value="en">English</option>
        <option value="bn">বাংলা</option>
      </select>
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
    </>
  );
};

export default LanguageSwitcher;
