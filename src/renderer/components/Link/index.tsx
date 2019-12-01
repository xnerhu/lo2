import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  target?: string;
  rel?: string;
  tag?: React.ReactNode;
  list?: boolean;
  to?: string;
}

export const Link = ({ to, children, list, ...props }: Props) => {
  if (!to) {
    if (!list) return <div {...props as any}>{children}</div>;
    return <li {...props as any}>{children}</li>;
  }

  if (to.startsWith('http')) return <a href={to} {...props}>{children}</a>;

  return <RouterLink to={to} {...props}>{children}</RouterLink>
}
