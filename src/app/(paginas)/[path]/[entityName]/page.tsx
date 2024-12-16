"use client";

import NavigationHeader from "@/components/NavigationHeader";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/services/axios";
import Image from "next/image";
import { poppins } from "@/app/fonts";
import OperatingHoursStatus from "@/components/OperatingHoursStatus";
import CallIcon from '@mui/icons-material/Call';
import TransitionsPopper from "@/components/PopperOpeningHours";
import { formatPhoneNumber } from "@/utils/formatPhone";
const mapaImage = 'https://s3-alpha-sig.figma.com/img/bd3d/f7a9/a95931faaa9535a55f37ca4e104b0d82?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZFzCrTG3WKuY2DDm1OuUX7nrSoIzvcyaE5DK1iebqvTDssaaL8az77NWcJXO8cM503PhtpEYhdGvEn4v~cuivuFkv41GINBKPzng-8OdKZObG564tLYldWykvFIO9qw~Y0Z40sWe7clugFTbmUZ7PHcCax845T52IaCpXcvra1KRjVaNt9jXmvfEFbiWDYL5Qg-CGWHWlrM83Rc2iSvLhZ~pNwlut8Jg2vSbDlkxWcn2QXA3to~nBKmM~TW8XC~xozj-G3pBtMMuEuqxZlm2-XW9Q15IXg9NLsfw5OVR4t7uUnPVCdeBeZflgS-BuWNGGkyOpPowwMThzNQ3GInNnw'
const windowSize = window.innerWidth

export interface MenuProps {
    _id: string
    label: string
    ref: string
    icon: string
    backgroundColor: string
    textColor: string
}

export interface HoursProps {
    open: string
    close: string
}

export interface openingHoursProps {
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
    const { entityName, path } = params
    const [entityState, setEntityState] = useState<EntitiesProps | null>(null)

    useEffect(() => {
        entityDetail()
    }, [])

    const entityDetail = async () => {
        try {
            const entity: EntitiesProps = (await axios.get(`/entidades/${entityName}`)).data;
            setEntityState(entity)
        } catch (error) {
            console.error("Erro ao buscar entidade:", error);

        }
    }

    return (
        <Box>
            <NavigationHeader path={String(path)} label={entityState?.segments[0]} />
            <Box sx={{
                width: '100vw',
                marginTop: "18vh",
                marginBottom: "10vh",
                display: "flex",
                flexDirection: "column",
                minHeight: '72vh',
                padding: "3vh 3vw 2vh 3vw ",
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {entityState?.logo && (
                        <Box sx={{ marginRight: '2vw' }}>
                            <img src={entityState.logo} alt='Logo Restaurante' style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #D3D3D3' }} />

                        </Box>
                    )}

                    <Typography variant="h5" fontWeight={'bold'} sx={{
                        fontFamily: poppins.style.fontFamily, fontWeight: 600
                    }}>
                        {entityState?.name}
                    </Typography>

                </Box>



                <Box sx={{ display: 'flex', flexDirection: "column", paddingTop: '3vh', marginBottom: '5vh' }}>
                    <Typography variant="h5" fontWeight={'bold'} sx={{
                        fontFamily: poppins.style.fontFamily, fontWeight: 600, fontSize: '16px'
                    }}>
                        Horário de Funcionamento
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <OperatingHoursStatus openingHours={entityState?.openingHours} />
                        <TransitionsPopper openingHours={entityState?.openingHours} />

                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',

                }}>
                    <Typography variant="h5" fontWeight={'bold'} sx={{
                        fontFamily: poppins.style.fontFamily, fontWeight: 600, fontSize: '16px'
                    }}>
                        Contatos
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        marginBottom: '5vh',
                        gap: '10px'
                    }}>
                        <CallIcon />
                        <Typography sx={{
                            fontFamily: poppins.style.fontFamily, fontWeight: 400, fontSize: '14px'
                        }}>
                            {formatPhoneNumber(entityState?.phone ?? '')}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "3vh" }}>
                        <Typography variant="h5" fontWeight={'bold'} sx={{
                            fontFamily: poppins.style.fontFamily, fontWeight: 600, fontSize: '16px'
                        }}>
                            Localização
                        </Typography>
                        <Typography sx={{
                            fontFamily: poppins.style.fontFamily, fontWeight: 400, fontSize: '14px'
                        }}>
                            {entityState?.address}
                        </Typography>
                    </Box>
                    <Box>
                        <img src={mapaImage}
                            alt=""
                            style={{
                                width: windowSize < 600 ? '100%' : '50%',
                                height: '30%',
                                borderRadius: '10px'
                            }}
                        />
                    </Box>

                </Box>
            </Box>

        </Box>
    )
}

export default Page