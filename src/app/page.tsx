import styles from "./page.module.css";
import Bar from '../components/Bar'
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import CardMenu from "@/components/CardMenu";
import airplaneIcon from '../assets/aviao.svg'
import { inter, roboto_mono, poppins } from '@/app/fonts'


export default function Home() {
  interface cardMenu {
    id: number
    label: string
    backgroundColor: string
    textColor: string,
    icon: string
  }

  const menuDb: cardMenu[] = [
    {
      id: 1,
      label: 'Informações sobre voos',
      backgroundColor: '#1C1611',
      textColor: '#D0DF00',
      icon: airplaneIcon
    },
    {
      id: 2,
      label: 'Restaurantes',
      backgroundColor: '#E30026',
      textColor: '#FFFFFF',
      icon: 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/HKUG6Y853KVLNTAHIDE3EAJ2BNCQKK8B.svg'
    },
    {
      id: 3,
      label: 'Lojas & Serviços',
      backgroundColor: '#52C2DE',
      textColor: '#FFFFFF',
      icon: 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/ECUMES944WFBRT8L2JLZDH72U6R3PYFT.svg'
    },
    {
      id: 4,
      label: 'Mapa do Aeroporto',
      backgroundColor: '#004489',
      textColor: '#FFFFFF',
      icon: 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/29YCRU0R1LCLDXPRUOU21069SZR2FBXJ.svg'
    },
    {
      id: 5,
      label: 'Atendente Virtual',
      backgroundColor: '#8467F4',
      textColor: '#FFFFFF',
      icon: 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/SM1AJXTYWP2KU6OHUYDZ58IUIJKF4F21.svg'
    },

  ]

  return (
    <div>

      <Bar type='header' />
      <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F3F2F2",
          marginTop: "12vh",
          padding: '0 7vw',
          height: '78vh'
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
          <Grid item xs={8}>
            <CardMenu
              label={menuDb[0].label}
              backgroundColor={menuDb[0].backgroundColor}
              textColor={menuDb[0].textColor}
              icon={menuDb[0].icon}
              size='large'
            />
          </Grid>
          <Grid item xs={4}>
            <CardMenu
              label={menuDb[1].label}
              backgroundColor={menuDb[1].backgroundColor}
              textColor={menuDb[1].textColor}
              icon={menuDb[1].icon}

            />
          </Grid>
          <Grid item xs={4}>
            <CardMenu
              label={menuDb[2].label}
              backgroundColor={menuDb[2].backgroundColor}
              textColor={menuDb[2].textColor}
              icon={menuDb[2].icon}

            />
          </Grid>
          <Grid item xs={8}>
            <CardMenu
              label={menuDb[3].label}
              backgroundColor={menuDb[3].backgroundColor}
              textColor={menuDb[3].textColor}
              icon={menuDb[3].icon}
              size='large'
            />
          </Grid>
          <Grid item xs={12}>
            <CardMenu
              label={menuDb[4].label}
              backgroundColor={menuDb[4].backgroundColor}
              textColor={menuDb[4].textColor}
              icon={menuDb[4].icon}
              size="medium"
            />
          </Grid>
        </Grid>

      </Box>
      <Bar type='footer' />
    </div>
  );
}
