import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  findBestAvailableLanguage,
  addEventListener,
  removeEventListener,
} from './helpers/localization';

export interface Translation {
  [key: string]: any;
}

export interface Language {
  languageTag: string;
  isRTL: boolean;
}

export interface LanguageTranslations {
  [key: string]: Translation;
}

interface TranslationContext extends Language {
  translations: LanguageTranslations;
  setLanguage: (l: Language) => void;
}

const TranslationsContext = createContext<TranslationContext>({
  languageTag: 'en',
  isRTL: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLanguage: () => {},
  translations: {},
});

function setGlobalSettings(l: Language) {
  // change any global setting based on the lang active / selected
}

function getBrowserLanguage(
  translations: Translation,
  fallback: Language = { languageTag: 'en', isRTL: false }
) {
  const l = findBestAvailableLanguage(Object.keys(translations)) || fallback;
  setGlobalSettings(l);
  return l;
}

export interface TranslationProviderProps {
  translations: Translation;
  fallback?: Language;
}

export const TranslationsProvider: React.FC<TranslationProviderProps> = ({
  translations,
  fallback,
  children,
}) => {
  const [{ languageTag, isRTL }, setLanguage] = useState(
    getBrowserLanguage(translations, fallback)
  );

  const handleLanguageChange = useCallback(() => {
    const l = getBrowserLanguage(translations, fallback);
    setLanguage(l);
    setGlobalSettings(l);
  }, [translations, fallback]);

  useEffect(() => {
    addEventListener(handleLanguageChange);
    return () => removeEventListener(handleLanguageChange);
  }, [handleLanguageChange]);

  return (
    <TranslationsContext.Provider
      children={children}
      value={{
        languageTag,
        isRTL,
        setLanguage,
        translations,
      }}
    />
  );
};

function useAvailableLanguages(): [Language[]] {
  const t = useContext(TranslationsContext);
  return [
    (Object.keys(t.translations) || []).map((l) => ({
      languageTag: l,
      isRTL: t.translations[l].isRTL || false,
    })),
  ];
}

function useTranslationLanguage(): [Language, (l: Language) => void] {
  const t = useContext(TranslationsContext);
  return [
    {
      languageTag: t.languageTag,
      isRTL: t.isRTL,
    },
    t.setLanguage,
  ];
}

const getTranslationFromString = (t: TranslationContext) => (
  path: string
): any => {
  // eslint-disable-next-line dot-notation
  const translation = t.translations[t.languageTag] || t.translations['en'];
  if (path !== '') {
    const paths = path.split('.');
    let value = paths.reduce((a, v) => a && a[v], translation);
    if (value === undefined) {
      console.warn(`Missing translation ${path}`);
      // eslint-disable-next-line dot-notation
      value = paths.reduce((a, v) => a && a[v], t.translations['en']);
    }
    return value || path;
  }
  return translation;
};

function useTranslation(): (path: string) => any {
  const t = useContext(TranslationsContext);
  return getTranslationFromString(t);
}

export {
  useTranslation,
  useTranslationLanguage,
  useAvailableLanguages,
};
