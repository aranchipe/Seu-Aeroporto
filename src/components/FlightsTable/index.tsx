import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { Box, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import * as React from 'react';
import airplaneLogo from '../../../public/assets/airplaneLogo.svg';

const windowSize = window.innerWidth;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F4F6F8',
    color: '#004490',
    fontSize: windowSize < 600 ? 10 : 14,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: windowSize < 600 ? 10 : 14,
  },
}));

const FlightsTable: React.FC<any> = ({ currentFlights }) => {
  const { t } = useTranslation();

  return (
    <TableContainer sx={{ width: { xs: '100%', sm: '60vw' } }} component={Paper}>
      <Table size="small" sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">{t('Hora')}</StyledTableCell>
            <StyledTableCell align="left">{t('Destino')}</StyledTableCell>
            <StyledTableCell align="left">{t('Voo')}</StyledTableCell>
            <StyledTableCell align="left">{t('Status')}</StyledTableCell>
            <StyledTableCell align="left">{t('Portão')}</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentFlights.map((flight: any) => (
            <TableRow key={flight.id}>
              <StyledTableCell
                sx={{
                  padding: '10px 15px',
                  color: '#212B36',
                }}
                component="th"
                scope="row"
              >
                {`${new Date(flight.time).getHours()}:${new Date(flight.time).getMinutes()}`}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{
                  color: '#212B36',
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 400,
                }}
              >
                {flight.destination}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{
                  color: '#212B36',
                  fontFamily: poppins.style.fontFamily,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {flight.number}
                  <Image src={airplaneLogo} alt="Airplane Logo" width={30} height={10} />
                </Box>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={
                  flight.status === 'Atrasado'
                    ? {
                        color: 'red',
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 400,
                      }
                    : {
                        color: '#212B36',
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 400,
                      }
                }
              >
                {t(flight.status)}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{
                  color: '#212B36',
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 400,
                  width: '80px',
                }}
              >
                {flight.gate}
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  color: '#212B36',
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 400,
                }}
              >
                <Button
                  sx={{
                    all: 'unset',
                    backgroundColor: '#004490',
                    padding: '5px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#ffffff',
                  }}
                >
                  z
                </Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlightsTable;
