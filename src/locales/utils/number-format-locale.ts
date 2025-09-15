import { fallbackLng } from '../locales-config';
import { allLangs } from '../all-langs';
import i18next from 'i18next';

export function formatNumberLocale() {
  const lng = i18next.resolvedLanguage ?? fallbackLng;

  const currentLang = allLangs.find((lang) => lang.value === lng);

  return { code: currentLang?.numberFormat.code, currency: currentLang?.numberFormat.currency };
}
