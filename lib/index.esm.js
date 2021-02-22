import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';

function findBestAvailableLanguage(availableLanguages) {
    var browserLanguages = navigator && navigator.languages;
    if (browserLanguages) {
        for (var bl in browserLanguages) {
            for (var al in availableLanguages) {
                if (browserLanguages[bl] === availableLanguages[al]) {
                    return {
                        languageTag: browserLanguages[bl],
                        isRTL: false,
                    };
                }
            }
        }
    }
}
function addEventListener(handler) {
    window.addEventListener('languagechange', handler);
}
function removeEventListener(handler) {
    window.removeEventListener('languagechange', handler);
}

var TranslationsContext = createContext({
    languageTag: 'en',
    isRTL: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setLanguage: function () { },
    translations: {},
});
function getBrowserLanguage(translations, fallback) {
    if (fallback === void 0) { fallback = { languageTag: 'en', isRTL: false }; }
    var l = findBestAvailableLanguage(Object.keys(translations)) || fallback;
    return l;
}
var TranslationsProvider = function (_a) {
    var translations = _a.translations, fallback = _a.fallback, children = _a.children;
    var _b = useState(getBrowserLanguage(translations, fallback)), _c = _b[0], languageTag = _c.languageTag, isRTL = _c.isRTL, setLanguage = _b[1];
    var handleLanguageChange = useCallback(function () {
        var l = getBrowserLanguage(translations, fallback);
        setLanguage(l);
    }, [translations, fallback]);
    useEffect(function () {
        addEventListener(handleLanguageChange);
        return function () { return removeEventListener(handleLanguageChange); };
    }, [handleLanguageChange]);
    return (React.createElement(TranslationsContext.Provider, { children: children, value: {
            languageTag: languageTag,
            isRTL: isRTL,
            setLanguage: setLanguage,
            translations: translations,
        } }));
};
function useAvailableLanguages() {
    var t = useContext(TranslationsContext);
    return [
        (Object.keys(t.translations) || []).map(function (l) { return ({
            languageTag: l,
            isRTL: t.translations[l].isRTL || false,
        }); }),
    ];
}
function useTranslationLanguage() {
    var t = useContext(TranslationsContext);
    return [
        {
            languageTag: t.languageTag,
            isRTL: t.isRTL,
        },
        t.setLanguage,
    ];
}
var getTranslationFromString = function (t) { return function (path) {
    // eslint-disable-next-line dot-notation
    var translation = t.translations[t.languageTag] || t.translations['en'];
    if (path !== '') {
        var paths = path.split('.');
        var value = paths.reduce(function (a, v) { return a && a[v]; }, translation);
        if (value === undefined) {
            console.warn("Missing translation " + path);
            // eslint-disable-next-line dot-notation
            value = paths.reduce(function (a, v) { return a && a[v]; }, t.translations['en']);
        }
        return value || path;
    }
    return translation;
}; };
function useTranslation() {
    var t = useContext(TranslationsContext);
    return getTranslationFromString(t);
}

export { TranslationsProvider, useAvailableLanguages, useTranslation, useTranslationLanguage };
//# sourceMappingURL=index.esm.js.map
