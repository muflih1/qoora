import * as stylex from '@stylexjs/stylex';
import Clickable from './Clickable';
import ClickableText from './ClickableText';

type BaseLinkProps = {
  'aria-lable'?: React.HTMLAttributes<HTMLDivElement>['aria-label'];
  children?: React.ReactNode;
  disabled?: boolean;
  disaplay?: 'inline' | 'block';
  href?: string;
  download?: React.AnchorHTMLAttributes<HTMLAnchorElement>['download']
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  label?: React.HTMLAttributes<HTMLAnchorElement>['aria-label'];
  onPress?: (e: React.MouseEvent<HTMLDivElement>) => void;
  role?: React.HtmlHTMLAttributes<HTMLAnchorElement>['role'];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  xstyle?: stylex.StyleXStyles;
  ref?: React.Ref<HTMLDivElement>
};

export default function BaseLink({
  'aria-lable': ariaLabel,
  children,
  disabled = false,
  disaplay = 'inline',
  download,
  href,
  label,
  onPress,
  role,
  ref,
  rel,
  target,
  xstyle,
}: BaseLinkProps) {
  role = role === 'presentation' ? 'none' : role;
  const props = {
    accessibilityLabel:
      role !== 'none' ? (ariaLabel != null ? ariaLabel : label) : undefined,
    disabled,
    link: {
      url: href,
      download,
      target,
      rel: undefined
    },
    onPress,
    ref,
    rel,
    xstyle,
  };

  if (disaplay === 'block') {
    const accessibilityRole =
      role === 'button' ||
      role === 'menuitem' ||
      role === 'none' ||
      role === 'switch' ||
      role === 'checkbox' ||
      role === 'article' ||
      role === 'radio' ||
      role === 'tab'
        ? role
        : 'link';
    return (
      <Clickable
        accessibilityRole={accessibilityRole}
        {...props}
      >
        {children}
      </Clickable>
    );
  } else {
    const accessibilityRole =
      role === 'button' ||
      role === 'menuitem' ||
      role === 'menuitemcheckbox' ||
      role === 'menuitemradio' ||
      role === 'none' ||
      role === 'tab'
        ? role
        : 'link';
    return (
      <ClickableText
        accessibilityRole={accessibilityRole}
        {...props}
      >
        {children}
      </ClickableText>
    );
  }
}
