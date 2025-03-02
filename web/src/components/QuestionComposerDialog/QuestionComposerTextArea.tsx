import * as stylex from '@stylexjs/stylex';
import BaseTextInput from '../BaseInput';
import { useLayoutEffect, useRef, useState } from 'react';
import { useMergeRefs } from '../Signup/utils';
import BaseText from '../Typography/BaseText';
import WebView from '../WebView';

interface PropsTypes {
  ref?: React.Ref<HTMLTextAreaElement>;
  value: string;
  onValueChange: (value: string) => void;
}

const MAX_QUESTION_CHAR_LENGTH = 250;

export default function QuestionComposerTextArea({
  ref,
  value,
  onValueChange,
}: PropsTypes) {
  const [focused, setFocused] = useState(false);
  const textRef = useAutosizeTextArea(value);
  const mergedRef = useMergeRefs(textRef, ref);

  return (
    <div {...stylex.props(styles.root, focused && styles.rootFocused)}>
      <div {...stylex.props(styles.padd)}>
        <BaseTextInput
          type='textarea'
          autoFocus
          rows={1}
          ref={mergedRef}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          dir='ltr'
          value={value}
          onValueChange={onValueChange}
          placeholder='Start your question with "What", "How", "Why", etc.'
          xstyle={[styles.textarea]}
        />
        {MAX_QUESTION_CHAR_LENGTH - value.length <= 25 && (
          <WebView xstyle={styles.questionTextRemaingCountContainer}>
            <BaseText
              size='body2'
              color='secondaryText'
              weight='normal'
              maxLines={1}
              xstyle={[
                styles.questionTextRemaningCount,
                MAX_QUESTION_CHAR_LENGTH - value.length <= 10 &&
                  styles.questionTextRemaningCountDestructive,
              ]}
            >
              {MAX_QUESTION_CHAR_LENGTH - value.length}
            </BaseText>
          </WebView>
        )}
      </div>
    </div>
  );
}

export function useAutosizeTextArea(value: string, minRows?: number) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const textarea = ref.current;
    if (textarea != null) {
      textarea.style.height = '0px';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
      const minHeight = minRows ? minRows * lineHeight : 0;
      textarea.style.height = Math.max(minHeight, scrollHeight) + 'px';
    }
  }, [value, minRows]);
  return ref;
}

const styles = stylex.create({
  root: {
    width: '100%',
    resize: 'none',
    borderBottomColor: '#dee0e1',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    transitionProperty: 'border-color',
    transitionDuration: '180ms',
    transitionTimingFunction: 'cubic-bezier(.4,0,.6,1)',
  },
  rootFocused: {
    borderBottomColor: '#1877f2',
  },
  padd: {
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'flex-start',
  },
  textarea: {
    resize: 'none',
    width: '100%',
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    fontSize: 16,
    color: '#000',
    overflowX: 'hidden',
    lineHeight: '1.25',
  },
  questionTextRemaingCountContainer: {
    marginStart: 2,
    flexShrink: 0,
    flexGrow: 0,
    alignSelf: 'center',
  },
  questionTextRemaningCount: {
    alignSelf: 'center',
  },
  questionTextRemaningCountDestructive: {
    color: '#cb4b10',
  },
});
