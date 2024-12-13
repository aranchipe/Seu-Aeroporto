'use client'
import { Box, Grid, Typography } from "@mui/material";
import CardMenu from "@/components/CardMenu";
import { poppins } from '@/app/fonts'
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/services/axios";
import Image from "next/image";
import airplaneIcon from '../assets/aviao.svg'

interface cardMenuProps {
  id: number
  label: string
  backgroundColor: string
  textColor: string,
  icon: string,
  ref: string
}

export default function Home() {

  const [menuData, setMenuData] = useState<cardMenuProps[] | null>(null)

  /*   const menuDb: cardMenuProps[] = [
      {
        id: 1,
        label: 'Informações de Vôo',
        backgroundColor: '#1C1611',
        textColor: '#D0DF00',
        icon: 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/HKUG6Y853KVLNTAHIDE3EAJ2BNCQKK8B.svg',
        ref: '/flights'
      },
      {
        id: 2,
        label: 'Restaurantes',
        backgroundColor: '#E30026',
        textColor: '#FFFFFF',
        icon: 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/HKUG6Y853KVLNTAHIDE3EAJ2BNCQKK8B.svg',
        ref: '/flights'
  
      },
      {
        id: 3,
        label: 'Lojas & Serviços',
        backgroundColor: '#52C2DE',
        textColor: '#FFFFFF',
        icon: 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/ECUMES944WFBRT8L2JLZDH72U6R3PYFT.svg',
        ref: '/flights'
  
      },
      {
        id: 4,
        label: 'Mapa do Aeroporto',
        backgroundColor: '#004489',
        textColor: '#FFFFFF',
        icon: 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/29YCRU0R1LCLDXPRUOU21069SZR2FBXJ.svg',
        ref: '/flights'
  
      },
      {
        id: 5,
        label: 'Atendente Virtual',
        backgroundColor: '#8467F4',
        textColor: '#FFFFFF',
        icon: 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/SM1AJXTYWP2KU6OHUYDZ58IUIJKF4F21.svg',
        ref: '/flights'
  
      },
    ] */

  useEffect(() => {
    handlePage();
  }, []);

  const handlePage = async () => {
    try {
      const menu: cardMenuProps[] = (await axios.get("/menu")).data;
      setMenuData(menu);

    } catch (error) {
      console.error("Erro ao buscar menu:", error);
    }
  };


  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F3F2F2",
          marginTop: "12vh",
          padding: '0 7vw',
          minHeight: '78vh'
        }}
      >
        <Box sx={{
          marginBottom: '4vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: "center",
        }}>
          <Typography variant="h5" fontWeight={'bold'} sx={{
            fontFamily: poppins.style.fontFamily, fontWeight: 800
          }}>
            Bem-vindo!
          </Typography>
          <Typography variant="subtitle1" sx={{
            fontFamily: poppins.style.fontFamily, fontWeight: 400,
            color: '#000000CC'
          }} >
            Como podemos ajuda-lo?
          </Typography>
        </Box>


        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "600px",
          }}
        >
          {menuData?.map((item) => (
            <Grid item xs={
              item.ref === '/flights' ? 8
                : item.ref === '/restaurants' ? 4
                  : item.ref === '/services' ? 4
                    : item.ref === '/map' ? 8 : 12
            }>
              <Link href={item.ref}>
                <CardMenu
                  label={item.label}
                  backgroundColor={item.backgroundColor}
                  textColor={item.textColor}
                  icon={item.icon}
                  size={item.ref === '/flights' || item.ref === '/map' ? 'large' : item.ref === '/chatbot' ? 'medium' : ''}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
