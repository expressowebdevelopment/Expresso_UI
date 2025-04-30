import { createI18n } from 'vue-i18n';
const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: 'en', // Default locale
  fallbackLocale: 'en',
  messages: {}
})

export default i18n
