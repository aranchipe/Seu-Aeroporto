export interface SegmentButtonProps {
  setSegments?: React.Dispatch<React.SetStateAction<string | null>>;
  label: string;
  segments?: string | null;
  menuType?: string;
  setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  getOptions?: any;
}
