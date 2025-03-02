import * as stylex from '@stylexjs/stylex';
import BaseSkeleton from './BaseSkeleton';

export default function AnswerFeedStorySkeleton() {
  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.header)}>
        <BaseSkeleton xstyle={styles.profile} />
        <div {...stylex.props(styles.wrapper)}>
          <BaseSkeleton xstyle={[styles.textSkeleton, styles.name]} />
          <BaseSkeleton xstyle={[styles.textSkeleton, styles.meta]} />
        </div>
      </div>
      <div {...stylex.props(styles.body)}>
        <BaseSkeleton xstyle={[styles.textSkeleton, styles.main]} />
        <BaseSkeleton xstyle={[styles.textSkeleton, styles.main]} />
        <BaseSkeleton xstyle={[styles.textSkeleton, styles.small]} />
      </div>
      <div {...stylex.props(styles.footer)}>
        <div {...stylex.props(styles.button)}>
          <BaseSkeleton xstyle={styles.icon} />
          <BaseSkeleton xstyle={[styles.textSkeleton, styles.text]} />
        </div>
        <div {...stylex.props(styles.button)}>
          <BaseSkeleton xstyle={styles.icon} />
          <BaseSkeleton xstyle={[styles.textSkeleton, styles.text]} />
        </div>
        <div {...stylex.props(styles.button)}>
          <BaseSkeleton xstyle={styles.icon} />
          <BaseSkeleton xstyle={[styles.textSkeleton, styles.text]} />
        </div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    backgroundColor: '#fff',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.04)',
    borderTopColor: '#dee0e1',
    borderEndColor: '#dee0e1',
    borderBottomColor: '#dee0e1',
    borderStartColor: '#dee0e1',
    borderTopStyle: 'solid',
    borderEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderStartStyle: 'solid',
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderStartWidth: 1,
    marginBottom: 8
  },
  header: {
    paddingTop: 12,
    paddingEnd: 16,
    paddingBottom: 12,
    paddingStart: 16,
    display: 'flex',
  },
  profile: {
    width: 32,
    height: 32,
    borderTopEndRadius: 9999,
    borderTopStartRadius: 9999,
    borderBottomEndRadius: 9999,
    borderBottomStartRadius: 9999,
    marginEnd: 8,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  textSkeleton: {
    height: 6,
  },
  name: {
    width: 188,
    marginTop: 'auto',
  },
  meta: {
    width: 120,
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  body: {
    paddingStart: 16,
    paddingEnd: 16,
  },
  main: {
    width: '100%',
    marginBottom: 8,
  },
  small: {
    width: '60%',
  },
  footer: {
    paddingTop: 174,
    paddingStart: 16,
    paddingBottom: 16,
    paddingEnd: 16,
    display: 'flex',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    ':not(:first-child)': {
      marginStart: 8,
    },
  },
  icon: {
    height: 12,
    width: 12,
    borderTopEndRadius: 9999,
    borderTopStartRadius: 9999,
    borderBottomEndRadius: 9999,
    borderBottomStartRadius: 9999,
  },
  text: {
    width: 16,
    marginStart: 4
  },
});
