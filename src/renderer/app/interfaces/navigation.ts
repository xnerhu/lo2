import { RouteComponentProps } from 'react-router-dom';

export type IRouterProps<T> = T &
  RouteComponentProps & {
    children?: React.ReactNode;
  };

export interface INavItem {
  to?: string;
  label: string;
  subpages?: INavSubItem[];
}

export type INavSubItem = Omit<INavItem, 'subpages'>;
