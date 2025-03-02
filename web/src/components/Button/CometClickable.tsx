import * as stylex from '@stylexjs/stylex';
import { ReactNode } from 'react';
import BaseLink from './BaseLink';
import BaseButton from './BaseButton';

interface LinkProps {
  url?: string;
  download?: React.AnchorHTMLAttributes<HTMLAnchorElement>['download'];
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
}

interface CometClickableProps {
  'aria-label'?: React.HTMLAttributes<HTMLDivElement>['aria-label'];
  children: ReactNode;
  cusrsorDisabled?: boolean;
  xstyle?: stylex.StyleXStyles;
  disabled?: boolean;
  display?: 'inline' | 'block';
  expanding?: boolean;
  linkProps?: LinkProps;
  onPress?: (event: React.MouseEvent<HTMLDivElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
}

export default function CometClickable({
  children,
  cusrsorDisabled = false,
  xstyle,
  display,
  disabled = false,
  expanding = display === 'block',
  linkProps,
  onPress,
  ref,
  ...props
}: CometClickableProps) {
  const style = [
    display === 'inline' ? styles.root_DEPRECATED : styles.root,
    cusrsorDisabled && styles.defaultCusror,
    expanding && styles.expanding,
    linkProps != null && styles.linkBase,
    xstyle,
  ];

  if (linkProps != null) {
    return (
      <BaseLink
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        disaplay={display === 'inline' ? display : 'block'}
        href={linkProps.url}
        target={linkProps.target}
        download={linkProps.download}
        rel={linkProps.rel}
        xstyle={style}
        {...props}
      >
        {children}
      </BaseLink>
    );
  }

  return (
    <BaseButton
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      disaplay={display === 'inline' ? display : 'block'}
      xstyle={style}
      {...props}
    >
      {children}
    </BaseButton>
  );
}

const styles = stylex.create({
  root: {
    borderTopStartRadius: 'inherit',
    borderTopEndRadius: 'inherit',
    borderBottomEndRadius: 'inherit',
    borderBottomStartRadius: 'inherit',
    display: 'inline-flex',
    flexDirection: 'row',
    userSelect: 'none',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus-visible': {
      boxShadow: '0 0 0 2px #fff, 0 0 0 4px #1877f2',
    },
  },
  root_DEPRECATED: {
    borderTopStartRadius: 'inherit',
    borderTopEndRadius: 'inherit',
    borderBottomEndRadius: 'inherit',
    borderBottomStartRadius: 'inherit',
    position: 'relative',
    userSelect: 'none',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus-visible': {
      boxShadow: '0 0 0 2px #fff, 0 0 0 4px #1877f2',
    },
  },
  defaultCusror: {
    cursor: 'default',
  },
  expanding: {
    display: 'flex',
  },
  linkBase: {
    display: 'inline-block',
  },
});
