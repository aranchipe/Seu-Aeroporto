import { translations } from './translations';

export type TranslationKeys = keyof (typeof translations)['en'];
