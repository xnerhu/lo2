import { RouteComponentProps } from 'react-router-dom';

export type IRouterProps<T = RouteComponentProps> = T &
  RouteComponentProps & {
    children?: React.ReactNode;
    match?: {
      params?: any;
    };
  };

export interface INavItem {
  to?: string;
  label?: string;
  subpages?: INavSubItem[];
  selectFilter?: (path: string) => boolean;
  useDefaultLink?: boolean;
}

export type INavSubItem = Omit<INavItem, 'subpages' | 'selectFilter'>;
