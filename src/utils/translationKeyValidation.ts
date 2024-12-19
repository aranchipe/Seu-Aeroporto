import { translations } from '@/utils/translations';
import { TranslationKeys } from './types';

export const isValidTranslationKey = (key: string): key is TranslationKeys => {
  return key in translations['en'];
};
