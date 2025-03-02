import * as stylex from "@stylexjs/stylex"
import BaseTextInput from '../BaseInput';
import { useAutosizeTextArea } from "../QuestionComposerDialog/QuestionComposerTextArea";
import { useMergeRefs } from "../Signup/utils";

type Props = {
  ref?: React.Ref<HTMLTextAreaElement>
  value: string
  onValueChange: (value: string) => void
}

export default function AnswerComposerMarkdownTextArea({
  ref,
  value,
  onValueChange,
}: Props) {
  const textRef = useAutosizeTextArea(value)
  const mergredRef = useMergeRefs(textRef, ref)

  return (
    <BaseTextInput
      ref={mergredRef}
      type='textarea'
      placeholder='Write your answer. (Markdown)'
      value={value}
      onValueChange={onValueChange}
      xstyle={styles.textarea}
    />
  );
}

const styles = stylex.create({
  textarea: {
    width: '100%',
    resize: 'none',
    paddingTop: 8,
    paddingEnd:0,
    paddingStart: 0,
    fontSize: 15,
    lineHeight: '1.25'
  }
})
