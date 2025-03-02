import { useStepperState } from './_context/FormContext';
import SignUpBasicInfo from './SignUpBasicInfoModal';
import SignUpEmailVerificationModal from './SignUpEmailVerificationModal';
import SignUpSetPasswordModal from './SignUpSetPasswordModal';

const steps = [
  {
    id: 'basic_info',
    componet: SignUpBasicInfo,
  },
  {
    id: 'verify_email_confirmation_code',
    component: SignUpEmailVerificationModal
  },
  {
    id: 'set_password',
    component: SignUpSetPasswordModal
  }
];

export default function SignUpStepRenderer(props) {
  const { step } = useStepperState();
  const Comp = steps[step].componet;

  return <Comp {...props} />;
}
