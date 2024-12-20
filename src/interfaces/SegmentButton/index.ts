/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SegmentButtonProps {
  setSegment?: (value: string | null) => void;
  setTagLabel?: (value: string) => void;
  label: string;
  segment?: string | null;
  menuType?: string;
  setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  getOptions?: any;
  handleOpen?: any;
}
