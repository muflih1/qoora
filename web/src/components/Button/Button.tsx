import * as stylex from '@stylexjs/stylex';
import CometClickable from './CometClickable';
import Spinner from '../Spinner';

type ButtonProps = {
  'aria-label'?: React.HTMLAttributes<HTMLDivElement>['aria-label'];
  role?: React.HTMLAttributes<HTMLDivElement>['role'];
  label?: React.ReactNode;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  type?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  onPress?: (event: React.MouseEvent<HTMLDivElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
  size?: 'small' | 'large' | 'xLarge';
  xstyle?: stylex.StyleXStyles;
};

export default function Button({
  isDisabled = false,
  isLabelHidden = false,
  isLoading = false,
  icon,
  label,
  onPress,
  ref,
  type = 'primary',
  size,
  xstyle,
  ...props
}: ButtonProps) {
  return (
    <CometClickable
      disabled={isDisabled}
      onPress={onPress}
      ref={ref}
      xstyle={[
        styles.root,
        type && styles[type],
        size && styles[size],
        xstyle,
        isDisabled && styles.disabled,
      ]}
      {...props}
    >
      {icon && <span {...stylex.props(styles.iconContainer)}>{icon}</span>}
      {isLabelHidden ? null : (
        <div {...stylex.props(styles.labelContainer)}>{label}</div>
      )}
      {isLoading && (
        <div {...stylex.props(styles.spinnerWrapper)}>
          <Spinner size='small' />
        </div>
      )}
    </CometClickable>
  );
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    boxSizing: 'border-box',
    fontWeight: 600,
    height: 36,
    maxWidth: '100%',
    paddingStart: 16,
    paddingEnd: 16,
    display: 'flex',
    justifyContent: 'center',
    transitionProperty: 'background-color',
    transitionDuration: '.2s',
    transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    fontSize: 14,
    ':active:not([aria-disabled="true"]) > *': { opacity: 0.6 },
  },
  iconContainer: {
    marginStart: 2,
    marginEnd: 2,
    width: 24,
    height: 24,
    display: 'inline-block'
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  primary: {
    backgroundColor: {
      default: '#1877f0',
      ':hover:not([aria-disabled="true"])': '#2066f2',
    },
    borderTopColor: {
      default: '#1877f0',
      ':hover:not([aria-disabled="true"])': '#2066f2',
    },
    borderEndColor: {
      default: '#1877f0',
      ':hover:not([aria-disabled="true"])': '#2066f2',
    },
    borderBottomColor: {
      default: '#1877f0',
      ':hover:not([aria-disabled="true"])': '#2066f2',
    },
    borderStartColor: {
      default: '#1877f0',
      ':hover:not([aria-disabled="true"])': '#2066f2',
    },
    borderTopStyle: 'solid',
    borderEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderStartStyle: 'solid',
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderStartWidth: 1,
    color: '#fff',
  },
  secondary: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not([aria-disabled="true"])': 'rgba(0,0,0,0.03)',
    },
    borderTopColor: 'rgba(99,100,102,0.2)',
    borderEndColor: 'rgba(99,100,102,0.2)',
    borderBottomColor: 'rgba(99,100,102,0.2)',
    borderStartColor: 'rgba(99,100,102,0.2)',
    borderTopStyle: 'solid',
    borderEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderStartStyle: 'solid',
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderStartWidth: 1,
    color: '#000',
  },
  tertiary: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not([aria-disabled="true"])': 'rgba(0,0,0,0.03)',
    },
    borderTopColor: 'transparent',
    borderEndColor: 'transparent',
    borderBottomColor: 'transparent',
    borderStartColor: 'transparent',
    borderTopStyle: 'none',
    borderEndStyle: 'none',
    borderBottomStyle: 'none',
    borderStartStyle: 'none',
    color: '#000',
  },
  destructive: {
    backgroundColor: {
      default: '#b92b27',
      ':hover:not([aria-disabled="true"])': '#a82723',
      ':active:not([aria-disabled="true"])': '#9b2420',
    },
    borderTopColor: {
      default: '#b92b27',
      ':hover:not([aria-disabled="true"])': '#a82723',
      ':active:not([aria-disabled="true"])': '#9b2420',
    },
    borderEndColor: {
      default: '#b92b27',
      ':hover:not([aria-disabled="true"])': '#a82723',
      ':active:not([aria-disabled="true"])': '#9b2420',
    },
    borderBottomColor: {
      default: '#b92b27',
      ':hover:not([aria-disabled="true"])': '#a82723',
      ':active:not([aria-disabled="true"])': '#9b2420',
    },
    borderStartColor: {
      default: '#b92b27',
      ':hover:not([aria-disabled="true"])': '#a82723',
      ':active:not([aria-disabled="true"])': '#9b2420',
    },
    borderTopStyle: 'solid',
    borderEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderStartStyle: 'solid',
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderStartWidth: 1,
    color: '#fff',
  },
  small: {
    height: 32,
  },
  large: {
    height: 40,
  },
  xLarge: {
    height: 44,
  },
  labelContainer: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    marginStart: 2,
    marginEnd: 2,
  },
  spinnerWrapper: {
    position: 'absolute',
    top: 'calc(50% - 9px)',
    start: 'calc(50% - 9px)',
  },
});
