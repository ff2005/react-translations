declare function findBestAvailableLanguage(availableLanguages: string[]): {
    languageTag: string;
    isRTL: boolean;
} | undefined;
declare function addEventListener(handler: () => void): void;
declare function removeEventListener(handler: () => void): void;
export { findBestAvailableLanguage, addEventListener, removeEventListener };
