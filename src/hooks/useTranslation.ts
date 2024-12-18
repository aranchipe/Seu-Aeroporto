import { TranslationKeys } from '@/utils/types';
import { useContext } from 'react';
import { LanguageContext } from '../components/PopperLanguage';
import { translations } from '../utils/translations';

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  const t = (key: TranslationKeys) => translations[language][key];

  return { t };
};
