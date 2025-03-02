import * as stylex from '@stylexjs/stylex';
import Clickable from './Clickable';
import ClickableText from './ClickableText';

type BaseButtonProps = {
  'aria-label'?: React.HTMLAttributes<HTMLDivElement>['aria-label'];
  children?: React.ReactNode;
  disabled?: boolean;
  disaplay?: 'inline' | 'block';
  label?: React.HTMLAttributes<HTMLDivElement>['aria-label'];
  onPress?: (e: React.MouseEvent<HTMLDivElement>) => void;
  role?: React.HtmlHTMLAttributes<HTMLElement>['role'];
  xstyle?: stylex.StyleXStyles;
  ref?: React.Ref<HTMLDivElement>
};

export default function BaseButton({
  'aria-label': ariaLabel,
  children,
  disabled = false,
  disaplay = 'inline',
  label,
  onPress,
  role,
  ref,
  xstyle,
}: BaseButtonProps) {
  role = role === 'presentation' ? 'none' : role;
  const props = {
    accessibilityLabel:
      role !== 'none' ? (ariaLabel != null ? ariaLabel : label) : undefined,
    disabled,
    onPress,
    ref,
    xstyle,
  };

  if (disaplay === 'block') {
    const accessibilityRole =
      role === 'menuitem' ||
      role === 'none' ||
      role === 'gridcell' ||
      role === 'switch' ||
      role === 'combobox' ||
      role === 'checkbox' ||
      role === 'tab' ||
      role === 'radio' ||
      role === 'option'
        ? role
        : 'button';
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
      role === 'combobox' ||
      role === 'menuitem' ||
      role === 'menuitemcheckbox' ||
      role === 'menuitemradio' ||
      role === 'option' ||
      role === 'none' ||
      role === 'tab'
        ? role
        : 'button';
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
