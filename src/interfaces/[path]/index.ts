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
