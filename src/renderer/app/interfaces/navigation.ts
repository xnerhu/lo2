import { RouteComponentProps } from 'react-router-dom';

export type IRouterProps<T> = T & RouteComponentProps;

export interface INavItem {
  to: string;
  label: string;
  openInNewTab?: boolean;
}
