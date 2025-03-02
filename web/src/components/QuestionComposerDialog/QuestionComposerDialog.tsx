import * as stylex from '@stylexjs/stylex';
import { useRef, useState } from 'react';
import BaseDialog from '../Dialog/BaseDialog';
import {
  isStringEndsWithQuestionsMark,
  isStringNotNullAndNotWhitespaceOnly,
} from '../../lib/validators';
import { promiseDone } from '../Signup/utils';
import axios from '../../lib/axios';
import LoadingDots from '../LoadingDots';
import QuestionComposerTextArea from './QuestionComposerTextArea';
import { useNavigate } from 'react-router';

const MAX_QUESTION_TEXT_CHAR_LENGTH = 250;

export default function QuestionComposerDialog({ onClose }) {
  const [questionText, setQuestionText] = useState('');
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const hasAddedQuestionMark = useRef(false);
  const navigate = useNavigate();

  const onValueChange = (value: string) => {
    if (value && !value.endsWith('?') && !hasAddedQuestionMark.current) {
      const newValue = value + '?';
      setQuestionText(newValue);
      hasAddedQuestionMark.current = true;

      setTimeout(() => {
        if (textRef.current) {
          textRef.current.setSelectionRange(
            newValue.length - 1,
            newValue.length - 1
          );
        }
      }, 0);
    } else {
      setQuestionText(value);
    }
  };

  const isDisabled =
    !isStringNotNullAndNotWhitespaceOnly(questionText) ||
    loading ||
    questionText.length > MAX_QUESTION_TEXT_CHAR_LENGTH;

  const onSubmit = () => {
    if (isStringNotNullAndNotWhitespaceOnly(questionText)) {
      if (!isStringEndsWithQuestionsMark(questionText)) {
        alert('Questions should ends with ?.');
        textRef.current?.focus();
        return;
      }

      setLoading(true);
      promiseDone(
        axios.post('/questions', { question_text: questionText }),
        res => {
          setLoading(false);
          onClose();
          navigate(res.data.question.url);
        },
        () => {
          setLoading(false);
          onClose();
        }
      );
    }
  };

  return (
    <BaseDialog
      onClose={onClose}
      titleText='Add question'
      primaryClickableProps={{
        isDisabled,
        label: 'Add question',
        onPress: onSubmit,
      }}
      secondaryClickableProps={{
        isDisabled: false,
        label: 'Cancel',
        onPress: onClose,
      }}
    >
      {!loading ? (
        <QuestionComposerTextArea
          ref={textRef}
          value={questionText}
          onValueChange={onValueChange}
        />
      ) : (
        <div {...stylex.props(styles.loadingDotsContainer)}>
          <LoadingDots />
        </div>
      )}
    </BaseDialog>
  );
}

const styles = stylex.create({
  loadingDotsContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
