import { Box, Typography } from "@mui/material"
import React from "react"
import Image from "next/image";
import { poppins } from '@/app/fonts'


interface CardMenuProps {
    label: string
    backgroundColor: string
}


const NavigationHeader: React.FC<CardMenuProps> = ({ label, backgroundColor }) => {
    const returnArrow = 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/ATHD8AK3EPHWXHJ6AIZDP2JSYCADG298.svg'
    return (
        <Box sx={{
            width: '100vw',
            height: '6vh',
            backgroundColor: backgroundColor,
            position: 'fixed',
            top: '12vh',
            display: "flex",
            alignItems: 'center',
            padding: { xs: '0 4vw', sm: '0 1.5vw' },
            color: '#ffffff'
        }}>
            <Box sx={{

                marginRight: { xs: '4vw', sm: '1.5vw' },
            }}>
                <Image src={returnArrow} alt='return' width={20} height={20} />

            </Box>
            <Typography variant="h5" sx={{
                fontFamily: poppins.style.fontFamily, fontWeight: 500
            }}>
                {label}
            </Typography>

        </Box>
    )
}


export default NavigationHeader