import { Box, CardMedia, Icon, SvgIcon, Typography } from "@mui/material"
import React from "react"
import Image from "next/image";
import { poppins } from '@/app/fonts'


interface CardMenuProps {
    label: string
    backgroundColor: string
    textColor: string
    icon: string
    size?: string
    onClick?: () => void
}

const CardMenu: React.FC<CardMenuProps> = ({ label, backgroundColor, textColor, icon, size, onClick }) => {
    return <Box onClick={onClick} sx={{
        display: 'flex',
        flexDirection: size !== 'medium' ? 'column' : 'row-reverse',
        justifyContent: size === 'medium' ? 'space-between' : '',
        alignItems: size === 'medium' ? 'center' : '',
        backgroundColor: backgroundColor,
        height: size === 'medium' ? '10vh' : '18vh',
        borderRadius: '10px',
        position: size !== 'medium' ? 'relative' : '',
        padding: size === 'medium' ? '5%' : ''
    }}>

        <Box sx={{
            display: 'flex',
            justifyContent: size === 'large' ? 'end' : 'center',
            alignItems: "center",
            height: '100%',
            padding: size !== 'medium' ? '0 20%' : ''
        }}>
            <Image alt='icon' src={icon} width={40} height={40} />

        </Box>

        <Typography sx={{
            color: textColor,
            position: size !== 'medium' ? 'absolute' : '',
            bottom: '10%',
            left: '5%',
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: { xs: '10px', sm: '16px' },
            width: '60px'
        }}>
            {label}
        </Typography>

    </Box>
}


export default CardMenu
