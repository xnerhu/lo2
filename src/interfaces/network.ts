export type IApiResponse<T = {}> = T & {
  success?: boolean;
  errorMessage?: string;
};
