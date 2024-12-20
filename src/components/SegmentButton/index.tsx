import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { SegmentButtonProps } from '@/interfaces/SegmentButton';
import { isValidTranslationKey } from '@/utils/translationKeyValidation';
import { Button } from '@mui/material';
import React from 'react';

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
  setTagLabel,
}) => {
  const { t } = useTranslation();
  return (
    <Button
      onClick={async () => {
        setTagLabel && setTagLabel(label);
        setSegments && (await setSegments(label.replace(/s$/, '')));
        getOptions && menuType === 'services'
          ? getOptions(menuType, label.replace(/s$/, ''))
          : getOptions && getOptions(menuType);
        setOpenMenu && setOpenMenu(true);
        console.log(segments);
      }}
      sx={{
        ...buttonStyles.base,
        ...(segments === label.replace(/s$/, '') ? buttonStyles.active : buttonStyles.inactive),
      }}
    >
      {isValidTranslationKey(label) ? t(label) : label}
    </Button>
  );
};

export default SegmentButton;
