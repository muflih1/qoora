import * as stylex from '@stylexjs/stylex';

const spinnerSizes = {
  large: {
    count: 12,
    length: 25,
    offset: 25,
    size: 32,
    thickness: 6,
  },
  medium: {
    count: 8,
    length: 28,
    offset: 22,
    size: 24,
    thickness: 10,
  },
  small: {
    count: 8,
    length: 28,
    offset: 22,
    size: 18,
    thickness: 10,
  },
};

type SpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  xstyle?: stylex.StyleXStyles;
};

export default function Spinner({ size = 'medium', xstyle }: SpinnerProps) {
  const { count, length, offset, size: spinnerSize, thickness } = spinnerSizes[size];

  return (
    <svg
      aria-label='Loading...'
      role='img'
      viewBox='0 0 100 100'
      {...stylex.props(styles.root, xstyle, styles.rootSizing(spinnerSize), count === 8 && styles.spin8, count === 12 && styles.spin12)}
    >
      {range(0, count).map(c => (
        <rect
          fill='currentColor'
          height={thickness}
          opacity={c / count}
          rx={thickness / 2}
          ry={thickness / 2}
          transform={`rotate(${((c - count / 4) * 360) / count} 50 50)`}
          width={length}
          x={50 - thickness / 2 + offset}
          y={50 - thickness / 2}
        />
      ))}
    </svg>
  );
}

function range(start: number, end: number, step?: number): number[] {
  if (step == null || step === 0) {
    step = start < end ? 1 : -1;
  }

  const length = Math.max(Math.ceil((end - start) / step), 0);
  const result: number[] = new Array(length);

  for (let i = 0; i < length; i++, start += step) {
    result[i] = start;
  }

  return result;
}

const styles = stylex.create({
  root: {
    display: 'inline-block',
    color: 'var(--secondary-text)',
  },
  rootSizing: (size: number) => ({ width: size, height: size }),
  spin12: {
    animationName: stylex.keyframes({
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    }),
    animationTimingFunction: 'steps(12,end)',
    animationIterationCount: 'infinite',
    animationDuration: '.8s',
  },
  spin8: {
    animationName: stylex.keyframes({
      from: { transform: 'rotate(180deg)' },
      to: { transform: 'rotate(540deg)' },
    }),
    animationTimingFunction: 'steps(8,end)',
    animationIterationCount: 'infinite',
    animationDuration: '.8s',
  },
});
