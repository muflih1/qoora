import * as stylex from '@stylexjs/stylex';
import BaseLink from './BaseLink';

interface BaseTextLinkProps {
  'aria-label'?: React.HTMLAttributes<HTMLAnchorElement>['aria-label'];
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'brand';
  href?: string;
  onPress?: (e: React.MouseEvent<HTMLDivElement>) => void;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  textDecoration?: React.CSSProperties['textDecoration'];
  underlineOnHover?: boolean;
  weight?: 'semibold' | 'bold' | 'heavy';
  ref?: React.Ref<HTMLDivElement>;
  display?: 'inline' | 'block';
  role?: React.HTMLAttributes<HTMLElement>['role'];
}

export default function BaseTextLink({
  children,
  color,
  display,
  href,
  onPress,
  target,
  textDecoration,
  underlineOnHover,
  ref,
  weight,
  role,
  ...props
}: BaseTextLinkProps) {
  return (
    <BaseLink
    role={role == null && (href == null || href === '#') ? 'button' : role}
    disaplay={display}
    href={href}
    onPress={onPress}
    ref={ref}
    target={target == null ? undefined : target}
    xstyle={[
        styles.root,
        color === "primary" && styles['primary'],
        color === "brand" && styles['brand'],
        color === "secondary" && styles['secondary'],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        underlineOnHover === true && styles.underlineOnHover,
        textDecoration === 'undeline' && styles.underline,
        weight === "semibold" && styles['semibold'],
        weight === "bold" && styles["bold"],
        weight === "heavy" && styles["heavy"],
      ]}
    {...props}
    >
      {children}
    </BaseLink>
  );
}

const styles = stylex.create({
  root: {
    color: {
      default: '#1877f2',
      ':active': '#1877f2',
      ':visited': '#1877f2',
    },
    ':hover': { textDecoration: 'none' },
    ':active': {
      opacity: 0.6,
    },
  },
  primary: {
    color: {
      default: '#000',
      ':active': '#000',
    },
    ':active': { opacity: 0.6 },
  },
  secondary: {
    color: '#65686c',
    ':active': {
      color: '#65686c',
      opacity: 0.6,
    },
  },
  brand: {
    color: {
      default: '#b92b27',
      ':active': '#b92b27',
      ':visited': '#b92b27',
    },
  },
  semibold: {
    fontWeight: 600,
  },
  bold: {
    fontWeight: 700,
  },
  heavy: {
    fontWeight: 800,
  },
  underline: {
    textDecoration: 'underline',
  },
  underlineOnHover: {
    ':hover': {
      textDecoration: 'underline',
    },
  },
});
