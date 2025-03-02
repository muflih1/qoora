import * as stylex from '@stylexjs/stylex';
import BaseLink from './Button/BaseLink';

interface Props {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
  href: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  underlineOnHover?: boolean;
  weight?: 'semibold' | 'bold' | 'heavy';
}

export default function TextLink({
  children,
  color,
  href,
  target,
  underlineOnHover,
  weight,
}: Props) {
  return (
    <BaseLink
      href={href}
      target={target}
      xstyle={[
        styles.root,
        styles[color],
        underlineOnHover === true && styles.underlineOnHover,
        styles[weight],
      ]}
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
    ':active': {
      opacity: 0.6,
    },
    ':hover': {
      textDecoration: 'none',
    },
  },
  primary: {
    color: {
      default: '#000',
      ':active': '#000',
      ':visited': '#000',
    },
    ':active': { opacity: 0.6 },
  },
  secondary: {
    color: {
      default: '#65686c',
      ':active': '#65686c',
      ':visited': '#65686c',
    },
    ':active': {
      opacity: 0.6,
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
  underlineOnHover: {
    ':hover': { textDecoration: 'underline' },
  },
});
