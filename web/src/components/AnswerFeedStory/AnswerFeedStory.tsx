import * as stylex from '@stylexjs/stylex';
import BaseText from '../Typography/BaseText';
import TextLink from '../TextLink';
import AnswerFeedStoryAvatarCell from './_components/AnswerFeedStoryAvatarCell';
import { formatDate } from '../../lib/utils';
import { useState } from 'react';
import BaseTextLink from '../Button/BaseTextLink';
import AnswerFeedStoryFooterCell from './_components/AnswerFeedStoryFooterCell';

type Props = {
  id: string
  answer_text: string
  url: string
  created_time: string
  owner: {
    id: string
    given_name: string
    family_name?: string | null
  }
  question: {
    id: string
    question_text: string
    url: string
  }
}

export default function AnswerFeedStory(props: Props) {
  const [truncated, setTruncated] = useState(true);

  return (
    <div {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.header)}>
        <AnswerFeedStoryAvatarCell {...props.owner} />
        <div>
          <TextLink
            href={`/profile/${props.owner.id}`}
            color='primary'
            underlineOnHover
          >
            <BaseText
              size='body2'
              color='primaryText'
              weight='bold'
            >
              {props.owner.given_name}
            </BaseText>
          </TextLink>
          <TextLink
            href={props.url}
            color='secondary'
            underlineOnHover
          >
            <BaseText
              size='body2'
              color='secondaryText'
              weight='normal'
            >
              {formatDate(props.created_time)}
            </BaseText>
          </TextLink>
        </div>
      </div>
      <div {...stylex.props(styles.questionContainer)}>
        <TextLink
          href={props.question.url}
          color='primary'
          underlineOnHover
        >
          <BaseText
            size='label'
            color='primaryText'
            weight='bold'
            maxLines={5}
          >
            {props.question.question_text}
          </BaseText>
        </TextLink>
      </div>
      <div>
        {props.answer_text.length > 600 ? (
          truncated ? (
            <>
              <BaseText>{props.answer_text.slice(0, 600)}</BaseText>
              {'... '}
              <BaseTextLink
                onPress={() => setTruncated(false)}
                display='inline'
                underlineOnHover
              >
                (more)
              </BaseTextLink>
            </>
          ) : (
            <BaseText>{props.answer_text}</BaseText>
          )
        ) : (
          <BaseText>{props.answer_text}</BaseText>
        )}
      </div>
      <AnswerFeedStoryFooterCell {...props} />
    </div>
  );
}

const styles = stylex.create({
  card: {
    backgroundColor: '#ffffff',
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    marginBottom: 8,
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
    paddingTop: 12,
    paddingEnd: 12,
    paddingStart: 12,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  questionContainer: {
    marginBottom: 4,
  },
  collapseInlineButton: {
    ':hover': { textDecoration: 'underline' },
    color: {
      default: '#1877f2',
      ':active': '#1877f2'
    },
    ':active': {opacity: .6}
  },
});