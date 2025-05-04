export type PagingData<T> = {
  currentPage: number;
  nextPage: number;
  totalPages: number;
  pageSize: number;
  total: number;
  nextPageSize: number;
  list: T[];
};

export const initialPagingData = <T>(pageSize?: number): PagingData<T> => ({
  currentPage: -1,
  nextPage: 0,
  totalPages: 0,
  pageSize: pageSize || 0,
  total: 0,
  nextPageSize: pageSize || 0,
  list: [],
});

export type UpdatePagingDataOptions<T> = {
  newElements: T[];
  page: number;
  pageSize: number;
  total: number;
};

export const updatePagingData = <T>(data: PagingData<T>, options: UpdatePagingDataOptions<T>) => {
  const { newElements, page, pageSize, total } = options;
  const totalPages = Math.ceil(total / pageSize);
  data.currentPage = page;
  data.nextPage = Math.min(page + 1, totalPages);
  data.totalPages = totalPages;
  data.pageSize = pageSize;
  data.total = total;
  data.list.push(...newElements);
  data.nextPageSize = Math.max(Math.min(total - data.list.length, pageSize), 0);
};

export const updatePagingForErrorData = <T>(data: PagingData<T>) => {
  data.currentPage = 0;
  data.nextPage = 0;
  data.totalPages = 0;
  data.total = 0;
  data.list = [];
  data.nextPageSize = 0;
};
