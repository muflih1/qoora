import * as stylex from '@stylexjs/stylex';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

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

type LinkProps = {
  url?: string;
  download?: React.AnchorHTMLAttributes<HTMLAnchorElement>['download'];
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
};

function getComponentBasedOnProps(
  role?: string | null,
  linkProps?: LinkProps | null
) {
  let element: React.ElementType = 'div';
  if (
    role &&
    possibleLinkRoles.includes(role) &&
    (linkProps == null ? undefined : linkProps.url) != null
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

type ClickableProps = {
  accessibilityRole?: React.HTMLAttributes<HTMLDivElement>['role'];
  accessibilityLabel?: React.HTMLAttributes<HTMLDivElement>['aria-label'];
  children: React.ReactNode;
  disabled?: boolean;
  link?: LinkProps;
  xstyle?: stylex.StyleXStyles;
  onPress?: (e: React.MouseEvent<HTMLDivElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
};

export default function Clickable({
  accessibilityRole = 'button',
  accessibilityLabel,
  children,
  disabled = false,
  link,
  onPress,
  ref,
  xstyle,
}: ClickableProps) {
  const Component = getComponentBasedOnProps(accessibilityRole, link);
  const anchorAndNotDisabled = Component === Link && disabled !== true;

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

  const tabIndex = disabled ? -1 : 0;

  return (
    <Component
      to={
        anchorAndNotDisabled
          ? link == null
            ? undefined
            : { pathname: link.url }
          : undefined
      }
      download={
        anchorAndNotDisabled
          ? link == null
            ? undefined
            : link.download
          : undefined
      }
      target={
        anchorAndNotDisabled ? (link == null ? undefined : link.rel) : undefined
      }
      ref={ref}
      aria-label={accessibilityLabel == null ? undefined : accessibilityLabel}
      aria-disabled={disabled !== true ? undefined : disabled}
      role={accessibilityRole}
      tabIndex={tabIndex}
      onClick={disabled === true ? undefined : handleClick}
      onKeyDown={disabled === true ? undefined : handleKeyDown}
      {...stylex.props(styles.root, xstyle)}
    >
      {children}
    </Component>
  );
}

const styles = stylex.create({
  root: {
    WebkitTapHighlightColor: 'transparent',
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    borderTopStyle: 'none',
    borderEndStyle: 'none',
    borderBottomStyle: 'none',
    borderStartStyle: 'none',
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    position: 'relative',
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    marginTop: 0,
    marginEnd: 0,
    marginBottom: 0,
    marginStart: 0,
    outline: 'none',
    cursor: 'pointer',
    touchAction: 'manipulation',
  },
});
