# react-translations

[![MIT License](https://img.shields.io/npm/l/react-native-template-iso-starter)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-16.8.0-68D3FC?logo=react)](https://reactjs.org/)
[![Typescript](https://img.shields.io/badge/typescript-4.1.5-007ACC?logo=typescript)](https://www.typescriptlang.org/)

Simple library for react translation with hooks (and typescript).

## Installation

`npm install @ff2005/react-translations`

## Usage

App.js
```javascript
import { TranslationsProvider } from '@ff2005/react-translations';
import Page from "./Page";
import en from './en.json';
import fr from './fr.json';

function App() {
  return (
    <TranslationsProvider translations={{ en, fr }}>
      <Page />
    </TranslationsProvider>
  );
}

export default App;
```


Page.js
```javascript
import { useTranslation, useTranslationLanguage } from "@ff2005/react-translations";

function Page() {
  const [translationLanguage, setTranslationLanguage] = useTranslationLanguage();
  const t = useTranslation();

  setTimeout(() => {
    setTranslationLanguage({
      languageTag: 'fr',
      isRTL: false
    })
  }, 3000);

  return (
    <>
      <div>{t('app.title')}</div>
      <div>{JSON.stringify(translationLanguage)}</div>
    </>
  );
}

export default Page;
```


en.json
```json
{
  "app": {
    "title": "My Application"
  }
}
```


fr.json
```json
{
  "app": {
    "title": "Mon application"
  }
}

```

## TranslationsProvider attributes

- translations - Object with each json language
- fallback - Object for the fallback language (ex: { languageTag: 'en', isRTL: false }) 

## Hooks

- useAvailableLanguages - return arrays of available languages form the browser
- useTranslationLanguage - return [language, setLanguage], language is a object with the current selected language and setLanguage is a function to change the selected language
- useTranslation - return function to query the translation

## Contributing

Contributions are very welcome. Please check out the [contributing document](CONTRIBUTING.md).

## License

[MIT](LICENSE).
