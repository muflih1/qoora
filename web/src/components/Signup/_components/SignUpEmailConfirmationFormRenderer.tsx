// import * as stylex from '@stylexjs/stylex';
// import BaseText from '../../Typography/BaseText';
// import FormField from '../../FormField';
// import CometClickable from '../../Button/CometClickable';

// export default function SignUpEmailConfirmationFormRenderer({
//   email,
//   code,
//   onEmailConfirmationCodeChange
// }) {
//   return (
//     <>
//       <BaseText
//         color='primaryText'
//         size='body'
//         weight='normal'
//         xstyle={styles.helperText}
//       >
//         Please enter the code we sent to {email}
//       </BaseText>
//       <FormField
//         type='text'
//         value={code}
//         onValueChange={onEmailConfirmationCodeChange}
//       />
//       <CometClickable display='inline' xstyle={styles.resendCode}>
//         <BaseText
//           color='secondaryText'
//           size='body2'
//           weight='normal'
//         >
//           Didn't receive an email or somthing went wrong? Resend code
//         </BaseText>
//       </CometClickable>
//     </>
//   );
// }

// const styles = stylex.create({
//   helperText: {
//     marginBottom: 16,
//   },
//   resendCode: {
//     textDecoration: {
//       default: 'none',
//       ':hover': 'underline'
//     }
//   }
// });
