import * as stylex from '@stylexjs/stylex';

type Props = {
  rootXStyle?: stylex.StyleXStyles
}

export default function LoadingDots({rootXStyle}: Props) {
  return (
    <div {...stylex.props(styles.root, rootXStyle)}>
      <div {...stylex.props(styles.row)}>
        {Array.from(new Array(3), (_, i) => i).map(delay => (
          <div
            key={`LoadingDots$${delay}`}
            {...stylex.props(
              styles.dot,
              delay > 0 && styles.setAnimationDelay(0.16 * delay + 's'),
            )}
          />
        ))}
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingEnd: 2,
    paddingBottom: 16,
    paddingStart: 2,
  },
  row: {
    display: 'flex',
    marginEnd: -2,
    marginStart: -2,
  },
  dot: {
    display: 'inline-block',
    borderRadius: 16,
    backgroundColor: '#65686c',
    animationName: stylex.keyframes({
      '0%, 80%, 100%': { transform: 'scale(0.3)', opacity: 0 },
      '40%': { transform: 'none', opacity: 0.5 },
    }),
    animationDuration: '1.4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDirection: 'normal',
    animationFillMode: 'both',
    animationPlayState: 'running',
    animationDelay: 0,
    width: 8,
    height: 8,
    marginEnd: 2,
    marginStart: 2,
  },
  setAnimationDelay: (delay: string) => ({ animationDelay: delay }),
});
