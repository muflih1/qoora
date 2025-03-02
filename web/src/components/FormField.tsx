import * as stylex from '@stylexjs/stylex';
import BaseText from './Typography/BaseText';
import type { BaseTextInputType } from './BaseInput';
import { useId } from 'react';
import QSDTextInput from './QSDTextInput';

interface FormFieldProps {
  type: BaseTextInputType;
  name?: string;
  label?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
  onValueChange?: (value: string) => void;
}

export default function FormField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  onValueChange,
  ref,
}: FormFieldProps) {
  const id = useId();
  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.labelContainer)}>
        <BaseText
          elementType={'label'}
          htmlFor={id}
          color='primaryText'
          size='body2'
          weight='bold'
        >
          {label}
        </BaseText>
      </div>
      <QSDTextInput
        ref={ref}
        size='xLarge'
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onValueChange={onValueChange}
      />
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
  labelContainer: {
    marginBottom: 4,
  },
});
