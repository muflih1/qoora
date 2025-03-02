import * as stylex from '@stylexjs/stylex';
import { useCallback, useEffect, useRef } from 'react';
import { useMergeRefs } from './utils';
import CircleButton from '../Button/CircleButton';
import CloseSvgIcon from '../Icons/CloseIcon.svg';
import BaseText from '../Typography/BaseText';
import Button from '../Button/Button';

interface BaseDialogProps {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  onClose: () => void;
  withCloseButton?: boolean;
  primaryClickableProps: {
    isDisabled?: boolean;
    onPress?: (e: React.MouseEvent<HTMLDivElement>) => void;
    label?: string;
  };
  secondaryClickableProps?: {
    isDisabled?: boolean;
    onPress?: (e: React.MouseEvent<HTMLDivElement>) => void;
    label?: string;
  };
  titleText: React.ReactNode;
  subtitleText?: React.ReactNode;
  closeWithMask?: boolean;
}

export default function BaseDialog({
  children,
  ref,
  onClose,
  withCloseButton = true,
  primaryClickableProps,
  secondaryClickableProps,
  titleText,
  closeWithMask = true,
}: // subtitleText,
BaseDialogProps) {
  const nodeRef = useRef(null);
  const mergedRef = useMergeRefs(nodeRef, ref);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const disaptchClose = useCallback(() => {
    onCloseRef.current();
  }, []);

  useEffect(() => {
    const target = nodeRef.current;
    if (target !== null) {
      const focusableElements = [
        ...target.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ),
      ].filter(
        el =>
          el instanceof HTMLElement &&
          el.offsetParent !== null &&
          getComputedStyle(el).visibility !== 'hidden' &&
          !el.hasAttribute('aria-hidden')
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      target.addEventListener('keydown', handleTabKeyPress);

      return () => {
        target.removeEventListener('keydown', handleTabKeyPress);
      };
    }
  }, []);

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.anchor)}>
        <div
          {...stylex.props(styles.mask)}
          onClick={closeWithMask !== true ? undefined : disaptchClose}
        />
        <div
          ref={mergedRef}
          role='dialog'
          {...stylex.props(styles.dialog)}
        >
          <div {...stylex.props(styles.dialogContainer)}>
            <div {...stylex.props(styles.dialogNavbar)}>
              {withCloseButton && (
                <CircleButton onPress={disaptchClose}>
                  <CloseSvgIcon />
                </CircleButton>
              )}
            </div>
            {titleText && (
              <div {...stylex.props(styles.dialogHeader)}>
                <BaseText
                  color='primaryText'
                  size='title'
                  weight='bold'
                >
                  {titleText}
                </BaseText>
              </div>
            )}
            <div {...stylex.props(styles.dialogContent)}>
              <div {...stylex.props(styles.dialogContentInner)}>
                <div {...stylex.props(styles.wrapper)}>{children}</div>
              </div>
              <div {...stylex.props(styles.dialogFooter)}>
                <div {...stylex.props(styles.dialogFooterInner)}>
                  <div {...stylex.props(styles.dialogFooterRow)}>
                    {secondaryClickableProps != null && (
                      <Button
                        type='tertiary'
                        size='large'
                        isDisabled={secondaryClickableProps.isDisabled}
                        label={secondaryClickableProps.label}
                        onPress={secondaryClickableProps.onPress}
                        // @ts-expect-error [marginEnd exists]
                        xstyle={styles.secondaryButton}
                      />
                    )}
                    <Button
                      isDisabled={primaryClickableProps.isDisabled}
                      size='large'
                      label={primaryClickableProps.label}
                      onPress={primaryClickableProps.onPress}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    position: 'fixed',
    top: 0,
    start: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2025,
  },
  anchor: {
    position: 'fixed',
    top: 0,
    end: 0,
    bottom: 0,
    start: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  mask: {
    position: 'absolute',
    top: 0,
    end: 0,
    bottom: 0,
    start: 0,
    backgroundColor: 'rgba(244,244,244,.85)',
  },
  dialog: {
    position: 'relative',
    boxSizing: 'border-box',
    alignSelf: 'center',
    maxHeight: '80vh',
    maxWidth: '90vw',
    width: 620,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    backgroundColor: '#fff',
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
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    minHeight: 400,
    animationName: stylex.keyframes({
      from: {
        opacity: 0,
        transform: 'scale(.95)',
      },
      to: {
        opacity: 1,
        transform: 'none',
      },
    }),
    animationDuration: '.2s',
    animationTimeline: 'ease-out',
  },
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    overflowX: 'hidden',
    overflowY: 'hidden',
    height: '100%',
    flexBasis: 0,
  },
  dialogNavbar: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8,
    paddingStart: 8,
    paddingBottom: 8,
    paddingEnd: 8,
  },
  dialogHeader: {
    paddingEnd: 16,
    paddingBottom: 8,
    paddingStart: 16,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    maxWidth: '100%',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  dialogContentInner: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minHeight: 0,
    flexDirection: 'column',
  },
  dialogFooter: {
    borderTopColor: '#dee0e1',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
  },
  dialogFooterInner: {
    paddingTop: 8,
    paddingEnd: 16,
    paddingBottom: 8,
    paddingStart: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  dialogFooterRow: {
    display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  wrapper: {
    paddingEnd: 16,
    paddingBottom: 16,
    paddingStart: 16,
    paddingTop: 8,
  },
  secondaryButton: {
    marginEnd: 4,
  },
});
