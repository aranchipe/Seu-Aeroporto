import { Language } from '@/utils/translations';

export interface CardMenuProps {
  id?: number;
  label?: Language;
  backgroundColor: string;
  textColor: string;
  icon: string;
  ref?: string;
  order?: number;
  size?: string;
  onClick?: () => void;
}
