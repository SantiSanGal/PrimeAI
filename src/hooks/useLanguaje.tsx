import { LanguageContext, LanguageContextProps } from '@/store/LanguageContext';
import { useContext } from 'react';

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
