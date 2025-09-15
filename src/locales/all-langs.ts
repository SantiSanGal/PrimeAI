import { enUS as enUSDataGrid } from '@mui/x-data-grid/locales';
import { enUS as enUSDate } from '@mui/x-date-pickers/locales';

type Lang = {
  value: 'en' | 'es';
  label: string;
  countryCode: string;
  adapterLocale?: string;
  numberFormat: { code: string; currency: string };
  systemValue?: { components: any };
};

export const allLangs: Lang[] = [
  {
    value: 'en',
    label: 'English',
    countryCode: 'US',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: {
        components: { ...enUSDate.components, ...enUSDataGrid.components },
      },
    },
  },
  {
    value: 'es',
    label: 'Spanish',
    countryCode: 'ES',
    adapterLocale: 'es',
    numberFormat: {
      code: 'es-PY',
      currency: 'PYG',
    },
  },
];
