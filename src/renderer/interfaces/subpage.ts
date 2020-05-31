export interface ISubPage {
  title: string;
  items: ISubPageItem[];
}

export interface ISubPageItem {
  to: string;
  label: string;
  external?: boolean;
}
