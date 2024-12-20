/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntitiesProps, InputFilterProps } from '@/interfaces/[path]';
import { Flight } from '@/interfaces/InputFilter';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import * as React from 'react';
import lupa from '../../../public/assets/lupa.svg';
import FilterTag from '../FilterTag';

const InputFilter = ({
  placeholder,
  setFilteredOptions,
  options,
  columnName,
  openMenu,
  tagLabel,
  setOpenMenu,
  setSegment,
}: InputFilterProps) => {
  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    const normalizeString = (str: string) => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
    };

    const filteredData: any = options?.filter((item: Flight | EntitiesProps | null) => {
      if (item && columnName in item) {
        return normalizeString(item[columnName as keyof typeof item]).includes(normalizeString(value));
      }
      return false;
    });

    if (filteredData) {
      setFilteredOptions(filteredData);
    }
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
              {openMenu && <FilterTag setSegment={setSegment} setOpenMenu={setOpenMenu} tagLabel={tagLabel} />}
            </InputAdornment>
          ),
        },
      }}
      onInput={handleChange}
    />
  );
};

export default InputFilter;
