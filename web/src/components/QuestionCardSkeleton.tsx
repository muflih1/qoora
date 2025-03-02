import * as stylex from '@stylexjs/stylex';
import BaseSkeleton from './Skeleton/BaseSkeleton';

export default function QuestionCardSkeleton() {
  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.offest)} />
      <BaseSkeleton xstyle={[styles.skeletonText, styles.title]} />
      <div {...stylex.props(styles.offest)} />
      <BaseSkeleton xstyle={[styles.skeletonText, styles.title]} />
      <div {...stylex.props(styles.offest)} />
      <BaseSkeleton xstyle={[styles.skeletonText, styles.meta]} />
    </div>
  );
}

const styles = stylex.create({
  root: {
    paddingTop: 16,
    paddingEnd: 16,
    paddingStart: 16,
    ':last-child': {
      paddingBottom: 16
    }
  },
  offest: {
    height: 6.5,
  },
  skeletonText: {
    height: 6.5,
    borderTopEndRadius: 9999,
    borderTopStartRadius: 9999,
    borderBottomEndRadius: 9999,
    borderBottomStartRadius: 9999,
  },
  title: {
    width: '80%',
  },
  meta: {
    width: '40%',
  },
});
