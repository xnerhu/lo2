import { RouteComponentProps } from 'react-router-dom';

export type IRouterProps<T = RouteComponentProps> = T &
  RouteComponentProps & {
    children?: React.ReactNode;
    match?: {
      params?: any;
    };
  };
