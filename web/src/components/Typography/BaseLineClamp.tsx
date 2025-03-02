import * as stylex from '@stylexjs/stylex';

interface BaseLineClampProps {
  children: React.ReactNode;
  dir?: string;
  elementType?: React.ElementType;
  htmlFor?: string;
  id?: string;
  lineHeight?: number | string;
  lines: number;
  ref?: React.Ref<HTMLSpanElement>;
  wrap?: 'balance' | 'nowrap' | 'pretty' | 'wrap';
  xstyle?: stylex.StyleXStyles;
}

export default function BaseLineClamp({
  children: baseChildren,
  dir,
  elementType: ElementType = 'span',
  htmlFor,
  id,
  lineHeight,
  lines,
  ref,
  wrap,
  xstyle,
}: BaseLineClampProps) {
  const [children] = getLineHeight(lines, 'var(--base-line-clamp-line-height)', baseChildren);

  let computesLineHeight =
    lineHeight != null
      ? typeof lineHeight === 'number'
        ? `${lineHeight}px`
        : lineHeight
      : null;

  computesLineHeight =
    computesLineHeight != null && computesLineHeight.endsWith('px')
      ? computesLineHeight
      : `calc(${computesLineHeight ?? '1'} * 1em)`;

  return (
    <ElementType
      dir={dir}
      htmlFor={htmlFor}
      id={id}
      ref={ref}
      {...stylex.props([
        styles.root,
        lineHeight != null && styles.setLineHeight(computesLineHeight),
        wrap && textWrapStyles[wrap],
        xstyle
      ])}
    >
      {children}
    </ElementType>
  );
}

function getLineHeight(
  lines: number,
  baseLineClampLineHeight: string,
  children: React.ReactNode
) {
  if (lines === 0) {
    return [
      children,
      {
        lineHeight: baseLineClampLineHeight,
      },
    ];
  }
  if (lines === 1) {
    const elment = <span {...stylex.props(styles.oneLine)}>{children}</span>;
    return [
      elment,
      {
        lineHeight: baseLineClampLineHeight,
      },
    ];
  }
  const element = (
    <span
      className={stylex.props(styles.multiLine).className}
      style={{
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
        display: '-webkit-box',
      }}
    >
      {children}
    </span>
  );
  return [
    element,
    {
      lineHeight: baseLineClampLineHeight,
    },
  ];
}

const styles = stylex.create({
  root: {
    display: 'block',
    overflowX: 'visible',
    overflowY: 'visible',
    position: 'relative',
  },
  oneLine: {
    display: 'block',
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  multiLine: {
    display: 'block',
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  setLineHeight: (lineHeight) => ({lineHeight}),
});

const textWrapStyles = stylex.create({
  balance: {
    textWrap: 'balance',
  },
  nowrap: {
    textWrap: 'nowrap',
  },
  pretty: {
    textWrap: 'initial',
  },
  wrap: {
    textWrap: 'wrap',
  },
});
