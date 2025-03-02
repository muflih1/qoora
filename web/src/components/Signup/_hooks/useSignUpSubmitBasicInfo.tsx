import { useState } from 'react';
import { promiseDone } from '../utils';
import { sendSignUpConfirmationEmail } from '../../../services/SignUpAPI';
import { useStepperDispatch } from '../_context/FormContext';

export default function useSignUpSubmitBasicInfo() {
  const [loading, setLoading] = useState(false);
  const dispatch = useStepperDispatch()

  const onSubmitSendSignUpConfirmationEmail = (email: string) => {
    setLoading(true);
    promiseDone(
      sendSignUpConfirmationEmail(email),
      res => {
        setLoading(false);
        const data = res.data;
        if (data.status === 'ok') {
          dispatch({type: 'NEXT_STEP'})
        }
      },
      (err) => {
        setLoading(false);
        console.error(err.reponse.data)
      }
    );
  };

  return { loading, onSubmitSendSignUpConfirmationEmail };
}
