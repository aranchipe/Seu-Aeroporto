import { EntitiesProps } from '@/app/(paginas)/[path]/page';
import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { Box, CardMedia, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import * as React from 'react';

interface RestaurantsTableProps {
  entitiesState: EntitiesProps[] | null;
  path?: string | null;
}

const EntitiesTable: React.FC<RestaurantsTableProps> = ({ entitiesState, path }) => {
  const { t } = useTranslation();
  return (
    <TableContainer sx={{ width: { xs: '100%', sm: '60vw' } }}>
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableBody>
          {entitiesState &&
            entitiesState.map((entity, index) => (
              <TableRow key={entity._id || index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center', paddingLeft: 0 }}>
                  <Box sx={{ marginRight: { xs: '3vw', sm: '1vw' } }}>
                    <CardMedia
                      component="img"
                      image={entity.logo}
                      alt="Restaurant Logo"
                      sx={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #D3D3D3' }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 600,
                      }}
                    >
                      {path ? (
                        <Link href={`/${path}/${entity.name}`}>{entity.name}</Link>
                      ) : (
                        <Typography
                          sx={{
                            fontFamily: poppins.style.fontFamily,
                            fontWeight: 600,
                          }}
                        >
                          {entity.name}
                        </Typography>
                      )}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 500,
                        color: '#808080',
                        fontSize: '12px',
                      }}
                    >{`${t(entity.serviceCategories[0])} - ${t(entity.address)}`}</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EntitiesTable;
