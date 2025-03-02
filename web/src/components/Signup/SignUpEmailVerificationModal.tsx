// import BaseDialog from '../Dialog/BaseDialog';
// import SignUpEmailConfirmationFormRenderer from './_components/SignUpEmailConfirmationFormRenderer';
// import useSignUpEmailConfirmation from './_hooks/useSignUpEmailConfirmation';

// export default function SignUpEmailVerificationModal({
//   onClose,
// }: {
//   onClose(): void;
// }) {
//   const { isDisabled, handleSubmit, ...restFormProps } =
//     useSignUpEmailConfirmation();
//   return (
//     <BaseDialog
//       titleText='Confirm your email'
//       primaryClickableProps={{
//         isDisabled,
//         label: 'Continue',
//         onPress: handleSubmit,
//       }}
//       onClose={onClose}
//     >
//       <SignUpEmailConfirmationFormRenderer {...restFormProps} />
//     </BaseDialog>
//   );
// }
