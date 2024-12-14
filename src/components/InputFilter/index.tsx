import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import lupa from '../../../public/assets/lupa.svg'
import Image from 'next/image';
import { EntitiesProps } from '@/app/(paginas)/[path]/page';



interface InputFilterProps {
    setState: React.Dispatch<React.SetStateAction<any>>;
    placeholder: string;
    totalData: Flight[] | EntitiesProps[] | null;
    propFilter: string
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


const InputFilter: React.FC<InputFilterProps> = ({ placeholder, setState, totalData, propFilter }) => {

    const handleChange: any = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;

        const normalizeString = (str: string) => {
            return str
                .normalize('NFD') // Normaliza a string para decompor caracteres com acentos
                .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
                .toLowerCase() // Converte tudo para minúsculas
                .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único espaço
                .trim(); // Remove espaços extras no começo e no fim
        };

        const filteredData: any = totalData && totalData.filter((item: any) => {
            // Normaliza tanto o valor de busca quanto o campo do item
            return normalizeString(item[`${propFilter}`]).includes(normalizeString(value));
        });

        setState(filteredData)
    }



    return (
        <TextField
            id="outlined-start-adornment"
            sx={{ width: { xs: '100%', sm: '60vw' }, marginBottom: "2vh" }}
            placeholder={placeholder}
            slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start">
                        <Image src={lupa} alt='lupa' width={15} />
                    </InputAdornment>,
                },
            }}
            onInput={(e) => handleChange(e)}
        />
    );
}

export default InputFilter