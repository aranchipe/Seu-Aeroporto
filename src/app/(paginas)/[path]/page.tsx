"use client";

import NavigationHeader from "@/components/NavigationHeader";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/services/axios";
import FlightsTable from "@/components/FlightsTable";
import InputFilter from "@/components/InputFilter";
import mockFlights from '@/mocks/mockFlights.json'


interface MenuProps {
    _id: string
    label: string
    ref: string
    icon: string
    backgroundColor: string
    textColor: string
}




const Page: React.FC = () => {
    const params = useParams();
    const path = params?.path
    const [menuData, setMenuData] = useState<MenuProps | null>(null)

    const [currentFlights, setCurrentFlights] = useState(mockFlights)

    useEffect(() => {

        handlePage(String(path));

    }, [path]);

    const handlePage = async (path: string) => {
        try {
            const menu: MenuProps[] = (await axios.get("/menu")).data;

            const currentPage = menu.find((item) => {
                return item.ref === `/${path}`;
            }) || null;

            setMenuData(currentPage);
            console.log(menuData?.backgroundColor)

        } catch (error) {
            console.error("Erro ao buscar menu:", error);
        }
    };

    return (
        <Box>
            <NavigationHeader label={menuData?.label || ''} backgroundColor={menuData?.backgroundColor || ''} />
            <Box
                sx={{
                    marginTop: "18vh",
                    marginBottom: "10vh",
                    padding: "2vh 3vw 2vh 3vw ",
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: '72vh',

                }}
            >
                {
                    path === 'flights'
                        ? <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <InputFilter totalFlights={mockFlights} setCurrentFlights={setCurrentFlights} placeholder='Buscar voo pelo número. Ex:. 2349' />
                            <FlightsTable currentFlights={currentFlights} />
                        </Box>
                        :
                        ''
                }
            </Box>
        </Box>
    );
};

export default Page;
