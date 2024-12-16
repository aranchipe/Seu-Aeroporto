'use client'
import { Box, Grid, Typography } from "@mui/material";
import CardMenu from "@/components/CardMenu";
import { poppins } from '@/app/fonts'
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/services/axios";
import { useTranslation } from 'react-i18next';

interface cardMenuProps {
  id: number
  label: string
  backgroundColor: string
  textColor: string,
  icon: string,
  ref: string,
  order: number
}

export default function Home() {
  const { t } = useTranslation();
  const [menuData, setMenuData] = useState<cardMenuProps[] | null>(null)

  useEffect(() => {
    handleMenuData();
  }, []);

  const handleMenuData = async () => {
    try {
      const menu: cardMenuProps[] = (await axios.get("/menu")).data.sort((a: cardMenuProps, b: cardMenuProps) => {
        return a.order - b.order
      })

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
            Bem Vindo
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
