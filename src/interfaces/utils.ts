export type IStringified<T> = {
  [P in keyof T]?: string;
};
