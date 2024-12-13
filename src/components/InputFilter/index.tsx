import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import lupa from '../../../public/assets/lupa.svg'
import Image from 'next/image';


interface InputFilterProps {
    setCurrentFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
    placeholder: string;
    totalFlights: Flight[];
}

interface Flight {
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

const InputFilter: React.FC<InputFilterProps> = ({ placeholder, setCurrentFlights, totalFlights }) => {

    const handleChange: any = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;

        const filteredFlights: Flight[] = totalFlights.filter((flight: Flight) => {
            return flight.number.toLowerCase().includes(value.toLowerCase().trim())
        })
        setCurrentFlights(filteredFlights);
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