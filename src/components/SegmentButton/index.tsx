import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { SegmentButtonProps } from '@/interfaces/SegmentButton';
import { isValidTranslationKey } from '@/utils/translationKeyValidation';
import { Button } from '@mui/material';

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

const SegmentButton = ({
  setSegment,
  label,
  segment,
  menuType,
  setOpenMenu,
  getOptions,
  setTagLabel,
}: SegmentButtonProps) => {
  const { t } = useTranslation();

  const handleClick = () => {
    setSegment!(label.replace(/s$/, ''));
    if (getOptions) {
      if (menuType === 'services') {
        getOptions(menuType, label.replace(/s$/, ''));
      } else {
        getOptions(menuType);
      }
    }

    if (setOpenMenu) {
      setOpenMenu(true);
    }
    if (setTagLabel) {
      setTagLabel(label);
    }
  };

  return (
    <Button
      onClick={() => handleClick()}
      sx={{
        ...buttonStyles.base,
        ...(segment === label.replace(/s$/, '') ? buttonStyles.active : buttonStyles.inactive),
      }}
    >
      {isValidTranslationKey(label) ? t(label) : label}
    </Button>
  );
};

export default SegmentButton;
