import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { EntitiesProps } from '@/interfaces/[path]';
import { isValidTranslationKey } from '@/utils/translationKeyValidation';
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
  setCardEntityMapOpen?: React.Dispatch<React.SetStateAction<any>>;
  setOpenMenu?: React.Dispatch<React.SetStateAction<any>>;
  setEntityName?: React.Dispatch<React.SetStateAction<any>>;
}

const EntitiesTable: React.FC<RestaurantsTableProps> = ({
  entitiesState,
  path,
  setCardEntityMapOpen,
  setOpenMenu,
  setEntityName,
}) => {
  const { t } = useTranslation();
  return (
    <TableContainer
      sx={{
        width: { xs: '100%', sm: '60vw' },
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
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
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setCardEntityMapOpen && setCardEntityMapOpen(true);
                            setOpenMenu && setOpenMenu(false);
                            setEntityName && setEntityName(entity.name);
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
                    >
                      {isValidTranslationKey(entity.serviceCategories[0]) && isValidTranslationKey(entity.address)
                        ? `${t(entity.serviceCategories[0])} - ${t(entity.address)}`
                        : `${entity.serviceCategories[0]} - ${entity.address}`}
                    </Typography>
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
