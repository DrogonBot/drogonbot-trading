export interface IPaginationData {
  docs?: Object;
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: number;
  hasNextPage?: number;
  prevPage?: number;
  nextPage?: number;
}

export enum NavPosition {
  NavLeft,
  NavRight,
}

export interface INavOption {
  href: string;
  text?: string;
  icon?: JSX.Element;
  showIconOnDesktop?: boolean;
  customComponent?: JSX.Element;
  position?: NavPosition;
  customColor?: string;
  primary?: boolean;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}
