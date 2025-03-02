import { useState } from 'react';
import { promiseDone } from '../../Signup/utils';
import { login } from '../../../services/LoginApi';
import { useSearchParams } from 'react-router';

export default function useSignInSubmit() {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams()

  const onSubmitSignIn = (email: string, password: string) => {
    setLoading(true);
    promiseDone(
      login({
        email,
        password,
      }),
      res => {
        const data = res.data;
        if (data.authenticated) {
          window.location.href = decodeURIComponent(searchParams.get('next') || '%2F');
        }
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  };
  return { loading, onSubmitSignIn };
}
