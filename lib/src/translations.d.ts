import React from 'react';
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
export interface TranslationProviderProps {
    translations: Translation;
    fallback?: Language;
}
export declare const TranslationsProvider: React.FC<TranslationProviderProps>;
declare function useAvailableLanguages(): [Language[]];
declare function useTranslationLanguage(): [Language, (l: Language) => void];
declare function useTranslation(): (path: string) => any;
export { useTranslation, useTranslationLanguage, useAvailableLanguages, };
