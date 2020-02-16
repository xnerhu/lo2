export interface ICacheData<T> {
  time: Date;
  data: T;
}

export type ICacheRefetchFunction<T> = () => T | Promise<T>;

export type ICacheCanRefetchFunction<T> = (data: ICacheData<T>) => boolean;
