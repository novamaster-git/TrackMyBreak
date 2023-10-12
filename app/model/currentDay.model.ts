type breakItem = {
  breakIn?: string;
  breakOut?: string;
  totalBreak?: number;
};
export type CurrentDay = {
  isInOffice?: boolean;
  date?: string;
  officeIn?: string;
  officeOut?: string;
  breaks?: Array<breakItem>;
  currentBreak?: string;
};
