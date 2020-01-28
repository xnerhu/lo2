import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  tag?: React.ReactNode;
  list?: boolean;
  to?: string;
  target?: string;
  rel?: string;
  useDefaultLink?: boolean;
}

export const Link = ({
  to,
  children,
  list,
  useDefaultLink,
  ...props
}: Props) => {
  const sharedProps: any = {
    className: props.className,
    style: props.style,
    onClick: props.onClick,
  };

  if (!to) {
    if (!list) return <div {...sharedProps}>{children}</div>;
    return <li {...sharedProps}>{children}</li>;
  }

  const linkProps = {
    ...sharedProps,
    target: props.target,
    rel: props.rel,
  };

  if (to.startsWith('http') || useDefaultLink)
    return (
      <a href={to} {...linkProps}>
        {children}
      </a>
    );

  return (
    <RouterLink to={to} {...linkProps}>
      {children}
    </RouterLink>
  );
};
