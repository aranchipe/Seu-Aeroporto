"use client";

import NavigationHeader from "@/components/NavigationHeader";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/services/axios";
import FlightsTable from "@/components/FlightsTable";
import InputFilter from "@/components/InputFilter";
import mockFlights from '@/mocks/mockFlights.json'
import RestaurantsTable from "@/components/RestaurantsTable";
import EntitiesTable from "@/components/EntitiesTable";
import SegmentButton from "@/components/SegmentButton";


interface MenuProps {
    _id: string
    label: string
    ref: string
    icon: string
    backgroundColor: string
    textColor: string
}

interface HoursProps {
    open: string
    close: string
}

interface openingHoursProps {
    monday?: HoursProps[]
    tuesday?: HoursProps[]
    wednesday?: HoursProps[]
    thursday?: HoursProps[]
    friday?: HoursProps[]
    saturday?: HoursProps[]
    sunday?: HoursProps[]
}

export interface EntitiesProps {
    _id: string
    name: string
    logo: string
    segments: string[]
    serviceCategories: string[]
    address: string
    openingHours: openingHoursProps
    phone?: string
}




const Page: React.FC = () => {
    const params = useParams();
    const path = params?.path
    const [menuData, setMenuData] = useState<MenuProps | null>(null)
    const [segments, setSegments] = useState<string | null>('lojas')

    const [restaurantsState, setRestaurantsState] = useState<EntitiesProps[] | null>(null)
    const [totalRestaurants, setTotalRestaurants] = useState<EntitiesProps[] | null>(null)

    const [servicesState, setServicesState] = useState<EntitiesProps[] | null>(null)
    const [totalServices, setTotalServices] = useState<EntitiesProps[] | null>(null)

    const [storeState, setStoreState] = useState<EntitiesProps[] | null>(null)
    const [totalStore, setTotalStore] = useState<EntitiesProps[] | null>(null)


    const [currentFlights, setCurrentFlights] = useState(mockFlights)

    useEffect(() => {

        handleNavigationHeader(String(path));
        if (path === 'restaurants') {
            listRestaurants()
        } else if (path === 'services') {
            if (segments === 'services') {
                listServices()

            } else {
                listStories()
            }
        }
        /* setSegments('lojas') */

    }, [path, segments]);



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

    const listRestaurants = async () => {
        console.log('entrou na funcao de listar restaurantes')
        try {
            const entities: EntitiesProps[] = (await axios.get('entidades')).data

            const restaurants = entities.filter((entity) => {
                return entity.segments[0] === 'Restaurante'
            }) || null
            setRestaurantsState(restaurants)
            setTotalRestaurants(restaurants)


        } catch (error) {
            console.error("Erro ao buscar restaurantes:", error);

        }
    }

    const listServices = async () => {
        try {
            const entities: EntitiesProps[] = (await axios.get('entidades')).data

            const services = entities.filter((entity) => {
                return entity.segments[0] === 'Serviço'
            }) || null

            setServicesState(services)
            setTotalServices(services)
        } catch (error) {

        }
    }

    const listStories = async () => {
        try {
            const entities: EntitiesProps[] = (await axios.get('entidades')).data

            const stores = entities.filter((entity) => {
                return entity.segments[0] === 'Loja'
            }) || null

            setStoreState(stores)
            setTotalStore(stores)

        } catch (error) {

        }
    }

    return (
        <Box>
            <NavigationHeader label={menuData?.label || ''} backgroundColor={menuData?.backgroundColor || ''} />
            <Box
                sx={{
                    marginTop: "18vh",
                    marginBottom: "10vh",
                    padding: "3vh 3vw 2vh 3vw ",
                    display: 'flex',
                    justifyContent: "center",
                    height: '72vh',
                }}
            >
                {
                    path === 'flights'
                        ? <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <InputFilter propFilter={'number'} totalData={mockFlights} setState={setCurrentFlights} placeholder='Buscar voo pelo número. Ex:. 2349' />
                            <FlightsTable currentFlights={currentFlights} />
                        </Box>
                        :
                        path === 'restaurants'
                            ?
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <InputFilter
                                    propFilter={'name'}
                                    totalData={totalRestaurants}
                                    setState={setRestaurantsState}
                                    placeholder='Busque um estabelecimento. Ex:. Spolleto' />
                                <EntitiesTable entitiesState={restaurantsState} />
                            </Box>
                            :
                            path === 'services'
                                ?
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <Grid container spacing={2} sx={{ marginBottom: { xs: '5vh', sm: '3vh' }, height: "10%" }} >
                                        <Grid item xs={6}>

                                            <SegmentButton label='Lojas' setSegments={setSegments} segments={segments} />
                                        </Grid>
                                        <Grid item xs={6}>

                                            <SegmentButton label='Services' setSegments={setSegments} segments={segments} />
                                        </Grid>
                                        {/* <SegmentButton buttonOption='services' setSegments={setSegments} segments={segments} /> */}

                                    </Grid>



                                    <InputFilter
                                        propFilter={'name'}
                                        totalData={segments === 'lojas' ? totalStore : totalServices}
                                        setState={segments === 'lojas' ? setStoreState : setServicesState}
                                        placeholder='Busque um estabelecimento. Ex:. Spolleto'
                                    />
                                    <EntitiesTable entitiesState={segments === 'lojas' ? storeState : servicesState} />
                                </Box>
                                :
                                ''
                }
            </Box>
        </Box>
    );
};

export default Page;
