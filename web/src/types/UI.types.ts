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

export interface INavOption {
  href: string;
  text: string;
  icon: JSX.Element;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}
