import { EntitiesProps } from '@/interfaces/[path]';
import { Flight } from '@/interfaces/InputFilter';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import * as React from 'react';
import lupa from '../../../public/assets/lupa.svg';
import FilterTag from '../FilterTag';

interface InputFilterProps {
  setFilteredOptions: React.Dispatch<React.SetStateAction<any>>;
  setOpenMenu?: React.Dispatch<React.SetStateAction<any>>;
  placeholder: string;
  options: Flight[] | EntitiesProps[] | null;
  columnName: string;
  openMenu?: boolean;
  tagLabel?: string;
  setSegments?: React.Dispatch<React.SetStateAction<any>>;
}

const InputFilter: React.FC<InputFilterProps> = ({
  placeholder,
  setFilteredOptions,
  options,
  columnName,
  openMenu,
  tagLabel,
  setOpenMenu,
  setSegments,
}) => {
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

          endAdornment: (
            <InputAdornment position="end">
              {openMenu && <FilterTag setSegments={setSegments} setOpenMenu={setOpenMenu} tagLabel={tagLabel} />}
            </InputAdornment>
          ),
        },
      }}
      onInput={(e) => handleChange(e)}
    />
  );
};

export default InputFilter;
