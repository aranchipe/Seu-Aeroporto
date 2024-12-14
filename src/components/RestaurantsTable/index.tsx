import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { EntitiesProps } from '@/app/(paginas)/[path]/page'
import Image from 'next/image';
import { poppins } from '@/app/fonts';


interface RestaurantsTableProps {
    restaurantsState: EntitiesProps[] | null;
}


const RestaurantsTable: React.FC<RestaurantsTableProps> = ({ restaurantsState }) => {


    return (
        <TableContainer sx={{ width: { xs: '100%', sm: '60vw' } }}>
            <Table sx={{ tableLayout: 'fixed' }}>

                <TableBody>
                    {restaurantsState && restaurantsState.map((restaurant) => (
                        <TableRow
                            key={restaurant._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                sx={{ display: "flex", alignItems: "center", paddingLeft: 0 }}
                            >
                                {/* <Image src={restaurant.logo} alt='Logo Restaurante' width={940}
                                    height={523} /> */}
                                <Box sx={{ marginRight: { xs: '3vw', sm: '1vw' } }}>
                                    <img src={restaurant.logo} alt='Logo Restaurante' style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #D3D3D3' }} />
                                </Box>

                                <Box>
                                    <Typography sx={{
                                        fontFamily: poppins.style.fontFamily, fontWeight: 600,
                                        /* fontSize: '12px' */
                                    }} >
                                        {restaurant.name}
                                    </Typography>
                                    <Typography sx={{

                                    }}></Typography>
                                    <Typography variant="subtitle1" sx={{
                                        fontFamily: poppins.style.fontFamily, fontWeight: 500,
                                        color: '#808080',
                                        fontSize: '12px'
                                    }} >{`${restaurant.serviceCategories[0]}-${restaurant.address}`}</Typography>
                                </Box>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RestaurantsTable