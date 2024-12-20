import { Flight } from '../InputFilter';

export interface MenuProps {
  _id: string;
  label: string;
  ref: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
}

export interface openingHoursProps {
  monday?: HoursProps[];
  tuesday?: HoursProps[];
  wednesday?: HoursProps[];
  thursday?: HoursProps[];
  friday?: HoursProps[];
  saturday?: HoursProps[];
  sunday?: HoursProps[];
}

export interface HoursProps {
  open: string;
  close: string;
}

export interface EntitiesProps {
  _id: string;
  name: string;
  logo: string;
  segments: string[];
  serviceCategories: string[];
  address: string;
  openingHours: openingHoursProps;
  phone?: string;
}

export interface EntitiesTableProps {
  entitiesState?: EntitiesProps[] | null;
  path?: string | null;
  setCardEntityMapOpen?: (value: boolean) => void;
  setOpenMenu?: (value: boolean) => void;
  setEntityName?: (value: string) => void;
}

export interface EntitiesTableProps2 {
  entitiesState?: EntitiesProps[] | null;
  path?: string | null;
  setCardEntityMapOpen: (value: boolean) => void;
  setOpenMenu: (value: boolean) => void;
  setEntityName: (value: string) => void;
}

export interface InputFilterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilteredOptions: any;
  setOpenMenu?: (value: boolean) => void;
  placeholder: string;
  options: Flight[] | EntitiesProps[] | null;
  columnName: string;
  openMenu?: boolean;
  tagLabel?: string;
  setSegment?: (value: string | null) => void;
}
