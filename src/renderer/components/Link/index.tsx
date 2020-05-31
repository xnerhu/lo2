import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  to?: string;
  target?: string;
  rel?: string;
  external?: boolean;
}

export const Link = ({
  to,
  target,
  rel,
  external,
  children,
  className,
  style,
  onClick,
}: Props) => {
  const domProps: any = { className, style, onClick };

  if (!to) {
    return <div {...domProps}>{children}</div>;
  }

  const linkProps = {
    ...domProps,
    target,
    rel,
  };

  if (to.startsWith('http') || external) {
    return (
      <a href={to} {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={to} {...linkProps}>
      {children}
    </RouterLink>
  );
};
