import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './langs/en.json';
import ruTranslations from './langs/ru.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  ru: {
    translation: ruTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
