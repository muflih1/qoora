import { useState } from 'react';
import BaseDialog from '../Dialog/BaseDialog';
import AnswerComposerMarkdownTextArea from './AnswerComposerMarkdownTextArea';
import BaseText from '../Typography/BaseText';
import { isStringNotNullAndNotWhitespaceOnly } from '../../lib/validators';
import { promiseDone } from '../Signup/utils';
import axios from '../../lib/axios';
import LoadingDots from '../LoadingDots';

export default function AnswerComposerDialog({ onClose, question }) {
  const [answerText, setAnswerText] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (!isStringNotNullAndNotWhitespaceOnly(answerText)) {
      alert('Answer cannot be blank.');
      return;
    }

    setLoading(true);
    promiseDone(
      axios.post('/answers', {
        question_id: question.id,
        answer_text: answerText,
      }),
      res => {
        setLoading(false);
        console.log(res);
        onClose();
      },
      err => {
        setLoading(false);
        console.log(err);
        onClose();
      }
    );
  };
  return (
    <BaseDialog
      onClose={onClose}
      titleText={null}
      withCloseButton
      primaryClickableProps={{
        isDisabled: !isStringNotNullAndNotWhitespaceOnly(answerText),
        label: 'Post',
        onPress: onSubmit,
      }}
    >
      {loading ? (
        <LoadingDots />
      ) : (
        <>
          <div>
            <BaseText
              color='primaryText'
              size='title'
              weight='bold'
              maxLines={5}
            >
              {question.question_text}
            </BaseText>
          </div>
          <AnswerComposerMarkdownTextArea
            value={answerText}
            onValueChange={value => setAnswerText(value)}
          />
        </>
      )}
    </BaseDialog>
  );
}
