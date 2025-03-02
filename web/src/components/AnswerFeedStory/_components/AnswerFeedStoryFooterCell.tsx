import * as stylex from '@stylexjs/stylex';
import CometClickable from '../../Button/CometClickable';
import BaseText from '../../Typography/BaseText';
import useAnswerEditDialog from '../../AnswerEditDialog/useAnswerEditDialog';
import BaseTextLink from '../../Button/BaseTextLink';

export default function AnswerFeedStoryFooterCell(props) {
  const openAnswerEditDialog = useAnswerEditDialog();

  return (
    <div {...stylex.props(styles.root)}>
      <div
        role='group'
        {...stylex.props(styles.actionButtonGroup)}
      >
        <CometClickable
          display='block'
          xstyle={[styles.actionButton]}
        >
          <BaseText
            color='secondaryText'
            size='body2'
            weight='semibold'
          >
            Upvote
          </BaseText>
        </CometClickable>
        <div {...stylex.props(styles.sepretor)} />
        <CometClickable
          display='block'
          xstyle={[styles.actionButton]}
        >
          <BaseText
            color='secondaryText'
            size='body2'
            weight='semibold'
          >
            Downvote
          </BaseText>
        </CometClickable>
      </div>
      {props.viewer_can_delete && <span>Delete</span>}
      {props.viewer_can_edit && (
        <BaseTextLink
          underlineOnHover
          onPress={openAnswerEditDialog}
        >
          Edit
        </BaseTextLink>
      )}
    </div>
  );
}

const styles = stylex.create({
  root: {
    paddingStart: 12,
    paddingEnd: 12,
    marginTop: 4,
    marginBottom: 4,
    display: 'flex',
    alignItems: 'center',
    marginStart: -12,
    marginEnd: -12,
  },
  actionButtonGroup: {
    display: 'inline-flex',
    height: 30,
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
    borderTopEndRadius: 1000,
    borderTopStartRadius: 1000,
    borderBottomStartRadius: 1000,
    borderBottomEndRadius: 1000,
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  actionButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': 'rgba(0, 0, 0, 0.03)',
    },
    height: 30,
    paddingEnd: 10,
    paddingStart: 10,
    borderTopEndRadius: 'unset',
    borderTopStartRadius: 'unset',
    borderBottomStartRadius: 'unset',
    borderBottomEndRadius: 'unset',
  },
  sepretor: {
    height: 30,
    width: 1,
    backgroundColor: '#dee0e1',
  },
});
