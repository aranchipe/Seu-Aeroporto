import { EntitiesProps } from '@/app/(paginas)/[path]/page';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import * as React from 'react';
import lupa from '../../../public/assets/lupa.svg';

interface InputFilterProps {
  setFilteredOptions: React.Dispatch<React.SetStateAction<any>>;
  placeholder: string;
  options: Flight[] | EntitiesProps[] | null;
  columnName: string;
}

export interface Flight {
  id: string;
  time: string;
  destination: string;
  number: string;
  airlineName: string;
  airlineLogo: string;
  status: string;
  gate: string;
  mapLink: string;
}

const InputFilter: React.FC<InputFilterProps> = ({ placeholder, setFilteredOptions, options, columnName }) => {
  const handleChange: any = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    const normalizeString = (str: string) => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
    };

    const filteredData: any = options?.filter((item: any) => {
      return normalizeString(item[`${columnName}`]).includes(normalizeString(value));
    });

    setFilteredOptions(filteredData);
  };

  return (
    <TextField
      id="outlined-start-adornment"
      sx={{ width: { xs: '100%', sm: '60vw' }, marginBottom: '2vh' }}
      placeholder={placeholder}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Image src={lupa} alt="lupa" width={15} />
            </InputAdornment>
          ),
        },
      }}
      onInput={(e) => handleChange(e)}
    />
  );
};

export default InputFilter;
