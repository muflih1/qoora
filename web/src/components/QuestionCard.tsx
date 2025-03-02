import * as stylex from '@stylexjs/stylex';
import BaseText from './Typography/BaseText';
import pluralize from 'pluralize';
import Button from './Button/Button';
import BaseTextLink from './Button/BaseTextLink';
import AnswerSolidIconSvg from './Icons/AnswerSolidIcon.svg';
import useAnswerComposerDialog from './AnswerComposerDialog/useAnswerComposerDialog';

export default function QuestionCard({ isLast, ...props }) {
  const openAnswerComposerDialog = useAnswerComposerDialog({
    question: props,
  });

  return (
    <div {...stylex.props(!isLast && styles.card)}>
      <div {...stylex.props(styles.body)}>
        <div>
          <BaseTextLink
            href={props.url}
            color='primary'
            underlineOnHover
          >
            <BaseText
              weight='bold'
              size='label'
              color='primaryText'
              maxLines={5}
            >
              {props.question_text}
            </BaseText>
          </BaseTextLink>
        </div>
        <div {...stylex.props(styles.metadata)}>
          <BaseTextLink
            href={props.url}
            color='secondary'
            underlineOnHover
          >
            <BaseText
              color='secondaryText'
              size='body2'
              weight='bold'
            >
              {props.answer_count === 0
                ? 'No answer yet'
                : pluralize('answer', props.answer_count, true)}
            </BaseText>
          </BaseTextLink>
        </div>
        <div {...stylex.props(styles.actions)}>
          {props.viewer_has_answered ? (
            <Button
              icon={<AnswerSolidIconSvg />}
              label={'Edit answer'}
              type='secondary'
              xstyle={styles.answerButton}
              onPress={() => {}}
            />
          ) : (
            <Button
              isDisabled={props.viewer_has_answered}
              icon={<AnswerSolidIconSvg />}
              label={'Answer'}
              type='secondary'
              xstyle={styles.answerButton}
              onPress={openAnswerComposerDialog}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  card: {
    borderBottomColor: '#dee0e1',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  body: {
    paddingTop: 16,
    paddingEnd: 16,
    paddingStart: 16,
  },
  metadata: {
    display: 'flex',
    marginTop: 8,
  },
  actions: {
    paddingTop: 4,
    paddingBottom: 4,
    display: 'flex',
  },
  answerButton: {
    color: '#63656c',
    paddingStart: 12,
  },
});
