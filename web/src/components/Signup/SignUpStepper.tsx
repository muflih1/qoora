import StepperProvider from './_context/FormContext';
import SignUpStepRenderer from './SignUpStepRenderer';

export default function SignUpStepper(props) {
  return (
    <StepperProvider initialFlowData={{ name: '', email: '' }}>
      <SignUpStepRenderer {...props} />
    </StepperProvider>
  );
}
