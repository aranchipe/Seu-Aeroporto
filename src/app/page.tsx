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
      label: 'Informações de Vôo',
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
          marginTop: "15vh",
          padding: '6vh 3vw '
        }}
      >
      </Box>
      <Bar type='footer' />
    </div>
  );
}
