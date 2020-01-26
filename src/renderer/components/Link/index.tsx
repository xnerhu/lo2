import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  target?: string;
  rel?: string;
  tag?: React.ReactNode;
  list?: boolean;
  to?: string;
  useDefaultLink?: boolean;
}

export const Link = ({
  to,
  children,
  list,
  useDefaultLink,
  ...props
}: Props) => {
  if (!to) {
    if (!list) return <div className={props.className}>{children}</div>;
    return <li className={props.className}>{children}</li>;
  }

  if (to.startsWith('http') || useDefaultLink)
    return (
      <a
        href={to}
        className={props.className}
        target={props.target}
        rel={props.rel}
      >
        {children}
      </a>
    );

  return (
    <RouterLink
      to={to}
      className={props.className}
      target={props.target}
      rel={props.rel}
    >
      {children}
    </RouterLink>
  );
};
