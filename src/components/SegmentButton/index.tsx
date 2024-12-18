import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@mui/material';
import React from 'react';

interface SegmentButtonProps {
  setSegments?: React.Dispatch<React.SetStateAction<string | null>>;
  /* setMenuPath?: React.Dispatch<React.SetStateAction<string | null>>; */
  label: string;
  segments?: string | null;
  menuType?: string;
  setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  getOptions?: any;
}

const buttonStyles = {
  base: {
    width: '100%',
    borderRadius: '8px',
    textTransform: 'none',
    color: '#525252CC',
    fontFamily: poppins.style.fontFamily,
    fontWeight: 400,
    height: '100%',
  },
  active: {
    backgroundColor: '#3CA0B917',
    color: '#3CA0B9',
    border: '1px solid #3CA0B9',
  },
  inactive: {
    border: '1px solid #52525233',
  },
};

const SegmentButton: React.FC<SegmentButtonProps> = ({
  setSegments,
  label,
  segments,
  menuType,
  setOpenMenu,
  getOptions,
}) => {
  const { t } = useTranslation();
  return (
    <Button
      onClick={async () => {
        setSegments && (await setSegments(label.replace(/s$/, '')));
        getOptions && menuType === 'services'
          ? getOptions(menuType, label.replace(/s$/, ''))
          : getOptions && getOptions(menuType);
        setOpenMenu && setOpenMenu(true);
      }}
      sx={{
        ...buttonStyles.base,
        ...(segments === label.replace(/s$/, '') ? buttonStyles.active : buttonStyles.inactive),
      }}
    >
      {t(label)}
    </Button>
  );
};

export default SegmentButton;
