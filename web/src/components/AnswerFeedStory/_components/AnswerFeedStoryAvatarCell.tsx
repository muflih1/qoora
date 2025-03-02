import * as stylex from '@stylexjs/stylex';
import BaseLink from '../../Button/BaseLink';

export default function AnswerFeedStoryAvatarCell(props) {
  return (
    <div {...stylex.props(styles.root)}>
      <BaseLink href={`/profile/${props.id}`}>
        <img
          src={props.picture_url}
          alt={`Profile picture of ${props.given_name}`}
          {...stylex.props(styles.image)}
        />
      </BaseLink>
    </div>
  );
}

const styles = stylex.create({
  root: {
    flexShrink: 0,
    marginEnd: 8,
    display: 'inline-flex',
  },
  image: {
    width: 36,
    height: 36,
    borderTopEndRadius: 9999,
    borderTopStartRadius: 9999,
    borderBottomEndRadius: 9999,
    borderBottomStartRadius: 9999,
    display: 'block',
  },
});
