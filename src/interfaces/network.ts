export type IApiResponse<T = {}> = T & {
  success?: boolean;
};
