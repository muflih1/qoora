import BaseDialog from '../Dialog/BaseDialog';
import SignUpBasicInfoFormRenderer from './_components/SignUpBasicInfoFormRenderer';
import useSignUpFlow from './_hooks/useSignUpBasicInfo';

interface SignupBasicInfoModalProps {
  onClose: () => void;
  ref?: React.Ref<HTMLDivElement>;
  withCloseButton?: boolean;
}

export default function SignUpBasicInfo({
  onClose,
  ref,
  withCloseButton = true,
}: SignupBasicInfoModalProps) {
  const { handleSubmit, isDisabled, ...restFormProps } = useSignUpFlow();
  return (
    <BaseDialog
      onClose={onClose}
      withCloseButton={withCloseButton}
      titleText='Sign up'
      primaryClickableProps={{
        isDisabled,
        label: 'Continue',
        onPress: handleSubmit,
      }}
      ref={ref}
    >
      <SignUpBasicInfoFormRenderer {...restFormProps} />
    </BaseDialog>
  );
}
