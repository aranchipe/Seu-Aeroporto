import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import mockFlights from '@/mocks/mockFlights.json'
import { poppins } from '@/app/fonts';
import airplaneLogo from '../../../public/assets/airplaneLogo.svg'
import Image from 'next/image';
import { Box } from '@mui/material';

const windowSize = window.innerWidth

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#F4F6F8',
        color: '#004490',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: windowSize < 600 ? 10 : 14,
    },
}));

/* interface currentFlightsProps {
    id: string
    time: string
    destination: string
    number: string
    airlineName: string
    airlineLogo: string
    status: string
    gate: string
    mapLink: string
} */

const FlightsTable: React.FC<any> = ({ currentFlights }) => {


    return (
        <TableContainer sx={{ width: { xs: '100%', sm: '60vw' } }} component={Paper}>
            <Table size='small' sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow >
                        <StyledTableCell align="left">Hora</StyledTableCell>
                        <StyledTableCell align="left" >Destino</StyledTableCell>
                        <StyledTableCell align="left">Voo</StyledTableCell>
                        <StyledTableCell align="left">Status</StyledTableCell>
                        <StyledTableCell align="left">Portão</StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentFlights.map((flight: any) => (
                        <TableRow key={flight.id} >
                            <StyledTableCell
                                sx={{
                                    padding: '10px 15px',
                                    color: '#212B36'
                                }}
                                component="th"
                                scope="row">{`${new Date(flight.time).getHours()}:${new Date(flight.time).getMinutes()}`}
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={{
                                    color: '#212B36',
                                    fontFamily: poppins.style.fontFamily,
                                    fontWeight: 400,
                                }}>
                                {flight.destination}
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={{
                                    color: '#212B36',
                                    fontFamily: poppins.style.fontFamily,
                                }}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                    {flight.number}
                                    <Image src={airplaneLogo} alt='Airplane Logo' width={30} height={10} />

                                </Box>


                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={
                                    flight.status === 'Atrasado' ? {
                                        color: 'red',
                                        fontFamily: poppins.style.fontFamily,
                                        fontWeight: 400
                                    } : {
                                        color: '#212B36',
                                        fontFamily: poppins.style.fontFamily,
                                        fontWeight: 400
                                    }}>
                                {flight.status}
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={{
                                    color: '#212B36',
                                    fontFamily: poppins.style.fontFamily,
                                    fontWeight: 400
                                }}>
                                {flight.gate}
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={{
                                    color: '#212B36',
                                    fontFamily: poppins.style.fontFamily,
                                    fontWeight: 400
                                }}>
                                Botão
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default FlightsTable