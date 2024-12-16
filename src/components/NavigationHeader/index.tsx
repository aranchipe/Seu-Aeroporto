import { Box, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import Image from "next/image";
import { poppins } from '@/app/fonts'
import { useRouter } from "next/navigation";
import { MenuProps } from "@/app/(paginas)/[path]/page";
import axios from "@/services/axios";



const NavigationHeader: React.FC<{ path: string, label?: string }> = ({ path, label }) => {

    const returnArrow = 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/ATHD8AK3EPHWXHJ6AIZDP2JSYCADG298.svg'
    const router = useRouter()
    const [menuData, setMenuData] = useState<MenuProps | null>(null)

    useEffect(() => {
        handleNavigationHeader(path);

    }, [])

    const handleNavigationHeader = async (path: string) => {
        try {
            const menu: MenuProps[] = (await axios.get("/menu")).data;

            const currentPage = menu.find((item) => {
                return item.ref === `/${path}`;
            }) || null;

            setMenuData(currentPage);

        } catch (error) {
            console.error("Erro ao buscar menu:", error);
        }
    };

    return (
        <Box sx={{
            width: '100vw',
            height: '6vh',
            backgroundColor: menuData?.backgroundColor,
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
                <Image style={{ cursor: 'pointer' }} src={returnArrow} alt='return' width={20} height={20} onClick={() => router.push('/')} />

            </Box>
            <Typography sx={{
                fontFamily: poppins.style.fontFamily, fontWeight: 500
            }}>

                {label ? label : menuData?.label}
            </Typography>

        </Box>
    )
}


export default NavigationHeader