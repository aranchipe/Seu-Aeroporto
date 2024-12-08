import React from 'react';
import logoSeuAeroporto from '../../assets/logo-seu-aeroporto.jpg'
import logoRight from '../../assets/logo-right.jpg'
import Image from "next/image";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import portuguese from '../../assets/portuguese.png'
import { Typography } from '@mui/material';
import { inter, roboto_mono, poppins } from '@/app/fonts'

interface MeuComponenteProps {
    type: string;
}

const Bar: React.FC<MeuComponenteProps> = ({ type }) => {

    const houseIcon = 'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/M19CXVLFIQ76KENHKVBZ936575H7XO46.svg'

    return (
        <Box sx={{
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'fixed',
            backgroundColor: '#ffffff',
            ...(type === 'header' ? { top: 0, height: '15vh', padding: '5vh 5vw', } : { bottom: 0, height: '10vh', padding: '4vh 1vw', }),
        }}>
            <Box sx={{
                width: { xs: '150px', sm: '200px', md: '400px' },
            }}>
                {
                    type === 'header'
                        ?
                        <Image
                            layout="responsive"
                            alt="Picture of the author"
                            src={logoSeuAeroporto} />
                        :
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            <IconButton sx={{
                                width: { xs: '50px', sm: '70px', md: '70px' },
                                height: { xs: '50px', sm: '70px', md: '70px' },
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                padding: '4%'
                            }}>
                                <Image
                                    layout="responsive"
                                    width={1}
                                    height={1}
                                    alt='icone'
                                    src={houseIcon} />
                            </IconButton>
                            <IconButton sx={{
                                width: { xs: '50px', sm: '70px', md: '70px' },
                                height: { xs: '50px', sm: '70px', md: '70px' },
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                padding: '4%',
                            }}>
                                <Image
                                    layout="responsive"
                                    width={1}
                                    height={1}
                                    alt='icone'
                                    src={portuguese} />
                            </IconButton>
                        </Box>
                }

            </Box>

            <Box sx={{
                ...(type === 'header' ? { width: { xs: '50px', sm: '90px', md: '125px' } } : '')
            }}>
                {type === 'header' ?
                    <Image
                        layout="responsive"
                        alt="Picture of the author"
                        src={logoRight} />

                    :
                    <Box sx={{
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: 'end',
                    }}>
                        <Typography variant="caption" sx={{
                            fontFamily: poppins.style.fontFamily, fontWeight: 400,
                            color: '#000000CC'
                        }}>
                            Segunda, 22 de Out.
                        </Typography>
                        <Typography variant="h4" sx={{
                            fontFamily: poppins.style.fontFamily, fontWeight: 500
                        }}>
                            12:16
                        </Typography>

                    </Box>

                }
            </Box>

        </Box>
    );
};

export default Bar;
