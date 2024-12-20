import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { Flight } from '@/interfaces/InputFilter';
import { isValidTranslationKey } from '@/utils/translationKeyValidation';
import { Box, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import airplaneLogo from '../../../public/assets/airplaneLogo.svg';

const windowSize = window.innerWidth;

const StyledTableCell = styled(TableCell)(() => ({
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlightsTable = ({ currentFlights }: any) => {
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
          {currentFlights.map((flight: Flight) => (
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
                {isValidTranslationKey(flight.status) ? t(flight.status) : flight.status}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{
                  color: '#212B36',
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 400,
                }}
              >
                {flight.gate}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ padding: 0 }}>
                <Button
                  sx={{
                    width: '100%',
                    backgroundColor: '#004490',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '6px',
                    }}
                  >
                    Ver no mapa
                  </Typography>
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
