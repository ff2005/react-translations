function findBestAvailableLanguage(availableLanguages: string[]) {
  const browserLanguages = navigator && navigator.languages;
  if (browserLanguages) {
    for (const bl in browserLanguages) {
      for (const al in availableLanguages) {
        if (browserLanguages[bl] === availableLanguages[al]) {
          return {
            languageTag: browserLanguages[bl],
            isRTL: false,
          }
        }
      }
    }
  }
}

function addEventListener(handler: () => void) {
  window.addEventListener('languagechange', handler)
}

function removeEventListener(handler: () => void) {
  window.removeEventListener('languagechange', handler)
}

export { findBestAvailableLanguage, addEventListener, removeEventListener }