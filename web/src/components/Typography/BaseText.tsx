/* eslint-disable @typescript-eslint/no-explicit-any */
import * as stylex from '@stylexjs/stylex';
import createBaseTextConfig from './BaseTextConfig';
import BaseLineClamp from './BaseLineClamp';
import {
  BaseTextContextProvider,
  useBaseTextContext,
} from './contexts/BaseTextContext';

const baseStyles = stylex.create({
  base: {
    maxWidth: '100%',
    minWidth: 0,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  },
  inline: {
    display: 'inline',
  },
});

const textAlignStyles = stylex.create({
  auto: {
    textAlign: 'auto',
  },
  center: {
    textAlign: 'center',
  },
  end: {
    textAlign: 'end',
  },
  start: {
    textAlign: 'start',
  },
});

const hasOwnProp = Object.prototype.hasOwnProperty;

function memoizeWithArgs<T, Args extends any[]>(
  transformFn: (...args: Args) => T,
  computeFn: (...args: Args) => string
): (...args: Args) => T {
  let cache: Record<string, T>;

  return function (...args: Args): T {
    if (!cache) {
      cache = {};
    }

    const key = computeFn(...args);

    if (!hasOwnProp.call(cache, key)) {
      cache[key] = transformFn(...args);
    }

    return cache[key];
  };
}

type Config = {
  colors: any;
  styles: any;
};

type CreateBaseTextProps = {
  alignment?: 'start' | 'center' | 'end' | 'auto';
  children?: React.ReactNode;
  colorName: string;
  dir?: string;
  elementType?: React.ElementType;
  htmlFor?: string;
  id?: string;
  isDeseModeEnabled?: boolean;
  lines?: number;
  styleName: string;
  wrap?: 'nowrap' | 'balance' | 'wrap' | 'pretty';
  xstyle?: stylex.StyleXStyles;
};

function createBaseText(config: Config) {
  return function BaseText({
    alignment = 'start',
    children,
    colorName,
    dir,
    elementType = 'span',
    htmlFor,
    id,
    lines = 0,
    styleName,
    wrap,
    xstyle,
  }: CreateBaseTextProps) {
    const styles = config.styles[styleName];

    const lineHeight = styles.lineHeight;
    const style = styles.style;

    const color = config.colors[colorName];

    const BaseTextContext = useBaseTextContext();

    if (BaseTextContext && BaseTextContext.nested) {
      const Comp = elementType;
      return (
        <Comp
          htmlFor={htmlFor}
          id={id}
          {...stylex.props([
            baseStyles.base,
            baseStyles.inline,
            style,
            color,
            textAlignStyles[alignment],
            xstyle,
            {
              lineHeight:
                typeof lineHeight === 'number' ? lineHeight + 'px' : lineHeight,
            },
          ])}
        >
          <BaseTextContextProvider nested={true}>
            {children}
          </BaseTextContextProvider>
        </Comp>
      );
    }

    return (
      <BaseLineClamp
        lines={lines}
        dir={dir}
        elementType={elementType}
        htmlFor={htmlFor}
        id={id}
        lineHeight={lineHeight}
        wrap={wrap}
        xstyle={[
          baseStyles.base,
          style,
          color,
          textAlignStyles[alignment],
          xstyle,
        ]}
      >
        <BaseTextContextProvider nested={true}>
          {children}
        </BaseTextContextProvider>
      </BaseLineClamp>
    );
  };
}

const momoizedConfig = memoizeWithArgs(
  weight => createBaseText(createBaseTextConfig(weight)),
  a => `${a}`
);

interface BaseTextProps {
  children?: React.ReactNode;
  color?: 'primaryText' | 'secondaryText' | 'betaText' | 'link';
  dir?: string;
  elementType?: React.ElementType;
  htmlFor?: string
  maxLines?: number;
  size?:
    | 'body'
    | 'body2'
    | 'headline1'
    | 'headline2'
    | 'title'
    | 'display'
    | 'footnote'
    | 'label'
    | 'bodyLink3';
  textAlign?: 'auto' | 'start' | 'center' | 'end';
  weight?: 'normal' | 'semibold' | 'bold' | 'heavy';
  wrap?: 'wrap' | 'nowrap';
  id?: string;
  xstyle?: stylex.StyleXStyles;
}

const BaseText: React.FC<BaseTextProps> = ({
  children,
  color = 'primaryText',
  dir = 'auto',
  elementType,
  htmlFor,
  maxLines = 0,
  size = 'body',
  textAlign,
  weight = 'normal',
  id,
  xstyle,
}) => {
  const Comp = momoizedConfig(weight);

  return (
    <Comp
      id={id}
      alignment={textAlign}
      colorName={color}
      dir={dir}
      elementType={elementType}
      htmlFor={htmlFor}
      lines={maxLines}
      styleName={size}
      xstyle={xstyle}
    >
      {children}
    </Comp>
  );
};

export default BaseText;
