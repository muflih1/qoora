import * as stylex from '@stylexjs/stylex';

export type BaseSkeletonProps = {
  xstyle?: stylex.StyleXStyles;
};

export default function BaseSkeleton({ xstyle }: BaseSkeletonProps) {
  return (
    <div
      role='status'
      aria-live='polite'
      {...stylex.props(styles.skeleton, xstyle)}
    />
  );
}

const styles = stylex.create({
  skeleton: {
    borderTopEndRadius: 9999,
    borderTopStartRadius: 9999,
    borderBottomEndRadius: 9999,
    borderBottomStartRadius: 9999,
    backgroundColor: '#939598',
    animationName: stylex.keyframes({
      from: {
        opacity: .15
      },
      to: {
        opacity: .5
      }
    }),
    animationDuration: '1000ms',
    animationTimingFunction: 'steps(10, end)',
    animationIterationCount: 'infinite',
  },
});
