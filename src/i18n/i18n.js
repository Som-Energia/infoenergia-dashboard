import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { registerSomEnergiaI18n } from '@somenergia/somenergia-ui'

import LOCALE_CA from './locale-ca.json'
import LOCALE_ES from './locale-es.json'
import LOCALE_GL from './locale-gl.json'
import LOCALE_EU from './locale-eu.json'

const resources = {
  ca: {
    translation: LOCALE_CA
  },
  es: {
    translation: LOCALE_ES
  },
  gl: {
    translation: LOCALE_GL
  },
  eu: {
    translation: LOCALE_EU
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'es',
    lng: 'es',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

registerSomEnergiaI18n(i18n)

export default i18n
