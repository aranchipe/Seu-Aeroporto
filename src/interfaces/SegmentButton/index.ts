export interface SegmentButtonProps {
  setSegments?: React.Dispatch<React.SetStateAction<string | null>>;
  setTagLabel?: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  segments?: string | null;
  menuType?: string;
  setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  getOptions?: any;
  handleOpen?: any;
}
