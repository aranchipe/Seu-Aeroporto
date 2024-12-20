import { poppins } from '@/app/fonts';
import { HoursProps, openingHoursProps } from '@/interfaces/[path]';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import * as React from 'react';

interface TransitionsPopperProps {
  openingHours?: openingHoursProps;
}

const TransitionsPopper = ({ openingHours }: TransitionsPopperProps) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        <AddCircleOutlineIcon sx={{ width: 20 }} />
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)',
                bgcolor: 'background.paper',
                maxHeight: '40vh',
                width: { xs: '90vw', sm: '50vw', md: '20vw' },
                marginLeft: '5vw',
                borderRadius: '10px',
                padding: '15px',
              }}
            >
              {openingHours ? (
                Object.entries(openingHours).map(([day, hoursArray]) => {
                  const daysMap: Record<string, string> = {
                    monday: 'Segunda',
                    tuesday: 'Terça',
                    wednesday: 'Quarta',
                    thursday: 'Quinta',
                    friday: 'Sexta',
                    saturday: 'Sábado',
                    sunday: 'Domingo',
                  };
                  const translatedDay = daysMap[day] || day;

                  return (
                    <Box key={day} sx={{ marginTop: '1vh', display: 'flex' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontFamily: poppins.style.fontFamily,
                          color: '#00000099',
                        }}
                      >
                        <Typography sx={{ fontWeight: 'bold' }}>{translatedDay}</Typography>
                        {hoursArray?.length > 0 ? (
                          hoursArray.map((hours: HoursProps, index: number) => (
                            <Typography key={index}>
                              {index === 0 && hoursArray?.length > 1
                                ? ` ${hours.open} às ${hours.close} -`
                                : ` ${hours.open} às ${hours.close}`}
                            </Typography>
                          ))
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: poppins.style.fontFamily,
                              fontSize: '14px',
                              color: '#00000099',
                            }}
                          >
                            Fechado
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: '14px',
                    color: '#00000099',
                  }}
                >
                  Horário não disponível
                </Typography>
              )}
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default TransitionsPopper;
