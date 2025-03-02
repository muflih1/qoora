import * as stylex from '@stylexjs/stylex';
import BaseTextInput, { BaseTextInputType } from './BaseInput';

type Props = {
  type?: BaseTextInputType;
  ref?: React.Ref<HTMLInputElement>;
  size?: 'small' | 'medium' | 'large' | 'xLarge';
  xstyle?: stylex.StyleXStyles;
  value?: string;
  onValueChange?: (value: string) => void;
  id?: string;
  placeholder?: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
};

export default function QSDTextInput({
  type,
  ref,
  size = "medium",
  xstyle,
  ...props
}: Props) {
  return (
    <div {...stylex.props(styles.root, styles[size], xstyle)}>
      <BaseTextInput
        ref={ref}
        type={type}
        xstyle={styles.control}
        {...props}
      />
    </div>
  );
}

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    zIndex: 0,
    position: 'relative',
    transitionDuration: 180,
    transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
    borderTopColor: {
      default: '#dee0e1',
      ':hover': '#1877f0',
      ':focus-within': '#1877f0',
    },
    borderEndColor: {
      default: '#dee0e1',
      ':hover': '#1877f0',
      ':focus-within': '#1877f0',
    },
    borderStartColor: {
      default: '#dee0e1',
      ':hover': '#1877f0',
      ':focus-within': '#1877f0',
    },
    borderBottomColor: {
      default: '#dee0e1',
      ':hover': '#1877f0',
      ':focus-within': '#1877f0',
    },
    borderTopStyle: 'solid',
    borderEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderStartStyle: 'solid',
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderStartWidth: 1,
    borderTopStartRadius: 3,
    borderTopEndRadius: 3,
    borderBottomEndRadius: 3,
    borderBottomStartRadius: 3,
    color: '#282829',
    fontSize: 14,
    alignItems: 'center',
    paddingTop: 8,
    paddingEnd: 8,
    paddingBottom: 8,
    paddingStart: 8,
    backgroundColor: '#ffffff',
    ':focus-within': {
      boxShadow: 'rgb(235, 240, 255) 0px 0px 0px 2px',
    },
  },
  small: {
    height: 32,
  },
  medium: {
    height: 36,
  },
  large: {
    height: 40,
  },
  xLarge: {
    height: 44,
  },
  control: {
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    outline: 'none',
    borderTopStyle: 'none',
    borderEndStyle: 'none',
    borderBottomStyle: 'none',
    borderStartStyle: 'none',
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    lineHeight: 20 / 15,
    fontSize: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
  },
});
