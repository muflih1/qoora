import * as stylex from '@stylexjs/stylex';
import { useCallback } from 'react';

export type BaseTextInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea';

interface BaseTextInputProps<Type extends BaseTextInputType>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size'
  > {
  type?: Type;
  ref?: React.Ref<
    Type extends 'textarea' ? HTMLTextAreaElement : HTMLInputElement
  >;
  onChange?: (
    event: React.ChangeEvent<
      Type extends 'textarea' ? HTMLTextAreaElement : HTMLInputElement
    >
  ) => void;
  onValueChange?: (value: string) => void;
  xstyle?: stylex.StyleXStyles;
  rows?: Type extends 'textarea' ? number : never;
  size?: 'small' | 'medium' | 'large' | 'xLarge';
}

export default function BaseTextInput<Type extends BaseTextInputType>({
  name,
  onChange,
  onValueChange,
  placeholder,
  ref,
  type,
  value,
  rows,
  xstyle,
  ...props
}: BaseTextInputProps<Type>) {
  const Component = type === 'textarea' ? 'textarea' : 'input';

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<
        Type extends 'textarea' ? HTMLTextAreaElement : HTMLInputElement
      >
    ) => {
      if (onChange) {
        onChange(event);
      }
      if (onValueChange) {
        onValueChange(event.target.value);
      }
    },
    [onChange, onValueChange]
  );

  return (
    <Component
      //@ts-expect-error [incompactable]
      ref={ref}
      type={type === 'textarea' ? undefined : type}
      rows={type !== 'textarea' ? undefined : rows}
      name={name}
      value={value}
      placeholder={placeholder}
      // @ts-expect-error [onChange incopactable]
      onChange={handleChange}
      {...stylex.props(
        styles.base,
        // type === 'textarea' && styles.control_TEXTAREA,
        xstyle
      )}
      {...props}
    />
  );
}

const styles = stylex.create({
  base: {
    borderTopStyle: 'none',
    borderEndStyle: 'none',
    borderBottomStyle: 'none',
    borderStartStyle: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  },
});
