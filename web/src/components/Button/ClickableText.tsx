import * as stylex from '@stylexjs/stylex';
import { useCallback } from 'react';
import { Link } from 'react-router';

const possibleLinkRoles = ['menuitem', 'tab', 'none'];

const roleToHTMLTagMap = {
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  figure: 'figure',
  form: 'form',
  heading: 'h1',
  label: 'label',
  link: Link,
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  none: 'div',
  region: 'section',
};

function getComponentBasedOnProps(
  role?: string | null,
  linkProps?: LinkProps | null
) {
  let element: React.ElementType = 'div';
  if (
    ((linkProps == null ? undefined : linkProps.url) != null &&
      (linkProps == null ? undefined : linkProps.url) != '#') ||
    (role &&
      possibleLinkRoles.includes(role) &&
      (linkProps == null ? undefined : linkProps.url) != null)
  ) {
    element = Link;
  } else if (role != null) {
    const el = roleToHTMLTagMap[role as keyof typeof roleToHTMLTagMap];
    if (el != null) {
      element = el as React.ElementType;
    }
  }

  return element;
}

function isKeyboardIntractiveElement(
  event: React.KeyboardEvent<HTMLDivElement>
) {
  const target = event.target as HTMLElement;
  const tagName = target.tagName;
  const alreadyKeyboardIntractive =
    (target as HTMLElement).isContentEditable ||
    (tagName === 'A' && (target as HTMLAnchorElement).href != null) ||
    tagName === 'BUTTON' ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA';
  if (target.tabIndex === 0 && !alreadyKeyboardIntractive) {
    const key = event.key;
    if (key === 'Enter') {
      return true;
    }
    const role = target.getAttribute('role');
    if (
      (key === ' ' || key === 'Spacebar') &&
      (role === 'button' ||
        role === 'combobox' ||
        role === 'menuitem' ||
        role === 'menuitemradio' ||
        role === 'option')
    ) {
      return true;
    }
  }
  return false;
}

type LinkProps = {
  url?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  download?: React.AnchorHTMLAttributes<HTMLAnchorElement>['download'];
};

type ClickableTextProps = {
  accessibilityRole?: React.HTMLAttributes<HTMLDivElement>['role'];
  accessibilityLabel?: React.HTMLAttributes<HTMLDivElement>['aria-label'];
  children?: React.ReactNode;
  direction?: string;
  disabled?: boolean;
  link?: LinkProps;
  onPress?: (event: React.MouseEvent<HTMLDivElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
  selectable?: boolean;
  xstyle?: stylex.StyleXStyles;
};

export default function ClickableText({
  accessibilityLabel,
  accessibilityRole,
  children,
  direction,
  disabled,
  link,
  onPress,
  ref,
  selectable = false,
  xstyle,
}: ClickableTextProps) {
  const Component = getComponentBasedOnProps(accessibilityRole, link);
  const isAnchorAndNotDisabled = Component === Link && disabled !== true;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (onPress) {
        onPress(e);
      }
      if (onPress || link != null) {
        e.stopPropagation();
      }
    },
    [onPress, link]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isKeyboardIntractiveElement(e)) {
        const key = e.key;
        if (key === ' ' || key === 'Spacebar') {
          e.preventDefault();
        }
        if (onPress) {
          onPress(e as never);
        }
        e.stopPropagation();
      }
    },
    [onPress]
  );

  let adjustedDirection: string = '';
  switch (direction) {
    case 'none':
      break;
    default:
      if (direction != null) {
        adjustedDirection = direction;
      }
  }

  const isAnchorOrButton = Component === Link || accessibilityRole === 'button';

  let tabIndex: number = -1;
  if (isAnchorOrButton) {
    if (disabled) {
      tabIndex = -1;
    } else {
      tabIndex = 0;
    }
    if (disabled !== true && accessibilityRole !== 'none') {
      tabIndex = 0;
    }
  }

  const adjustedRole =
    accessibilityRole === 'none' ? 'presentation' : accessibilityRole;

  return (
    <Component
      aria-label={accessibilityLabel}
      aria-disabled={
        disabled === true && adjustedRole !== 'presentation'
          ? disabled
          : undefined
      }
      dir={adjustedDirection}
      to={
        isAnchorAndNotDisabled
          ? link == null
            ? undefined
            : link.url
          : undefined
      }
      onClick={disabled ? undefined : handleClick}
      onKeyDown={disabled ? useCallback : handleKeyDown}
      ref={ref}
      role={adjustedRole}
      tabIndex={tabIndex}
      target={
        isAnchorAndNotDisabled
          ? link == null
            ? undefined
            : link.target
          : undefined
      }
      {...stylex.props(
        styles.root,
        selectable === false && styles.noSelect,
        xstyle
      )}
    >
      {children}
    </Component>
  );
}

const styles = stylex.create({
  root: {
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    borderTopStyle: 'none',
    borderEndStyle: 'none',
    borderBottomStyle: 'none',
    borderStartStyle: 'none',
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'inline',
    listStyle: 'none',
    marginTop: 0,
    marginEnd: 0,
    marginBottom: 0,
    marginStart: 0,
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    textAlign: 'inherit',
    textDecoration: 'none',
    touchAction: 'manipulation',
    ':focus-visible': {
      outline: '2px auto #1877f2'
    },
  },
  noSelect: {
    userSelect: 'none',
  },
});
