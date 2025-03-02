import * as stylex from '@stylexjs/stylex';
import LegacyHidden from './LegacyHidden';

interface WebViewProps extends React.HTMLAttributes<HTMLDivElement> {
  hidden?: boolean;
  xstyle?: stylex.StyleXStyles;
  ref?: React.Ref<HTMLDivElement>;
}

export default function WebView({
  children,
  xstyle,
  hidden,
  ref,
  ...props
}: WebViewProps) {
  const isHidden = hidden === true;
  return (
    <LegacyHidden
      ref={ref}
      mode={isHidden ? 'hidden' : 'visible'}
      htmlAttributes={{
        ...props,
        ...stylex.props(styles.root, xstyle, isHidden && styles.hidden),
      }}
    >
      {children}
    </LegacyHidden>
  );
}

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 0,
  },
  hidden: {
    display: 'none',
  },
});
