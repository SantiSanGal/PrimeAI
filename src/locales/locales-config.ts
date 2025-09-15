export type LanguageValue = (typeof languages)[number];
export const languages = ['en', 'es'];
export const defaultNS = 'common';
export const fallbackLng = 'en';

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  en: {
    success: 'Language has been changed!',
    error: 'Error changing language!',
    loading: 'Loading...',
  },
  es: {
    success: 'El lenguaje ha cambiado!',
    error: 'Ocurrió un error al cambiar el lenguaje!',
    loading: 'Cargando...',
  },
};
