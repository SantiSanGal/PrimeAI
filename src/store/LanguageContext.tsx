import React, { createContext, useReducer, ReactNode, useEffect } from 'react';

import en from '../locales/en.json';
import es from '../locales/es.json';

export type Language = 'en' | 'es';

export interface LanguageState {
  language: Language;
}

export type LanguageAction = { type: 'SET_LANGUAGE'; payload: Language };

export interface LanguageContextProps {
  state: LanguageState;
  dispatch: React.Dispatch<LanguageAction>;
  translate: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = { en, es };

const getInitialLanguage = (): Language => {
  const storedLang = localStorage.getItem('language');
  return storedLang === 'en' || storedLang === 'es' ? storedLang : 'en';
};

const initialState: LanguageState = {
  language: getInitialLanguage(),
};

const languageReducer = (state: LanguageState, action: LanguageAction): LanguageState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload);
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  const translate = (key: string): string => {
    return translations[state.language][key] || key;
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'language' && (event.newValue === 'en' || event.newValue === 'es')) {
        dispatch({ type: 'SET_LANGUAGE', payload: event.newValue });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ state, dispatch, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
