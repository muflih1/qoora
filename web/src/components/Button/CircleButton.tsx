import * as stylex from '@stylexjs/stylex';
import CometClickable from './CometClickable';

interface LinkProps {
  download?: React.AnchorHTMLAttributes<HTMLAnchorElement>['download'];
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
  url?: string;
}

interface CircleButtonProps {
  'label'?: React.HTMLAttributes<HTMLElement>['aria-label'];
  children: React.ReactNode;
  size?: 24 | 28 | 32 | 36 | 40 | 44 | 48;
  onPress?: (e: React.MouseEvent<HTMLDivElement>) => void;
  linkProps?: LinkProps;
  ref?: React.Ref<HTMLDivElement>;
  xstyle?: stylex.StyleXStyles;
}

export default function CircleButton({
  'label': ariaLabel,
  onPress,
  linkProps,
  children,
  size = 36,
  ref,
  xstyle,
}: CircleButtonProps) {
  return (
    <CometClickable
      aria-label={ariaLabel}
      ref={ref}
      onPress={onPress}
      linkProps={linkProps}
      xstyle={[styles.root, sizes[size], xstyle]}
    >
      {children}
    </CometClickable>
  );
}

const styles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderTopStartRadius: 1000,
    borderTopEndRadius: 1000,
    borderBottomStartRadius: 1000,
    borderBottomEndRadius: 1000,
    position: 'relative',
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    transitionProperty: 'background-color',
    transitionDuration: '.18s',
    transitionTimingFunction: 'ease-out',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
});

const sizes = stylex.create({
  24: {
    width: 24,
    height: 24,
  },
  28: {
    width: 28,
    height: 28,
  },
  32: {
    width: 32,
    height: 32,
  },
  36: {
    width: 36,
    height: 36,
  },
  40: {
    width: 40,
    height: 40,
  },
  44: {
    width: 44,
    height: 44,
  },
  48: {
    width: 48,
    height: 48,
  },
});
