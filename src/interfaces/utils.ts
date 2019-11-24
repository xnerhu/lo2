export type IStr<T> = {
  [P in keyof T]?: string;;
};
