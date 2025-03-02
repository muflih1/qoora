import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDialog } from '../../../contexts/ModalFlowContext';
import {
  isStringEmail,
  isStringNotNullAndNotWhitespaceOnly,
} from '../../../lib/validators';
import { pushToast } from '../../../contexts/Toast/pushToast';
import useSignInSubmit from './useSignInSubmit';
import SignUpMultiStepDialog from '../../Signup/SignUpMutiStepDialog';

export default function useSignIn() {
  const createDialogConfig = useDialog();

  const openSignUpDialog = useCallback(() => {
    createDialogConfig(SignUpMultiStepDialog, {}, null, {
      replaceCurrentDialog: true,
    });
  }, [createDialogConfig]);

  const submitRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const syncInputValues = useCallback(() => {
    if (emailRef.current != null) {
      const value = emailRef.current.value;
      if (isStringNotNullAndNotWhitespaceOnly(value)) {
        setEmail(value);
      }
    }

    if (passwordRef.current != null) {
      const value = passwordRef.current.value;
      if (isStringNotNullAndNotWhitespaceOnly(value)) {
        setPassword(value);
      }
    }
  }, [emailRef, setEmail, passwordRef, setPassword]);

  useLayoutEffect(() => {
    syncInputValues();
  }, [syncInputValues]);

  const isDisabled = useMemo(
    () =>
      !isStringNotNullAndNotWhitespaceOnly(email) ||
      !isStringNotNullAndNotWhitespaceOnly(password),
    [email, password]
  );

  const onEmailChange = useCallback((email: string) => setEmail(email), [setEmail]);

  const onPasswordChange = useCallback(
    (password: string) => setPassword(password),
    [setPassword]
  );

  const {onSubmitSignIn} = useSignInSubmit()

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isStringNotNullAndNotWhitespaceOnly(email)) {
        if (emailRef.current) {
          emailRef.current.focus();
        }
        pushToast('Enter your Quoora email.');
        return;
      }
      if (!isStringEmail(email)) {
        if (emailRef.current) {
          emailRef.current.focus();
        }
        alert('Enter a valid email.');
        return;
      }
      if (!isStringNotNullAndNotWhitespaceOnly(password)) {
        if (passwordRef.current) {
          passwordRef.current.focus();
        }
        alert('Enter your password.');
        return;
      }

      onSubmitSignIn(email, password)
    },
    [email, password, onSubmitSignIn]
  );

  return {
    submitRef,
    openSignUpDialog,
    handleSubmit,
    isDisabled,
    email,
    emailRef,
    onEmailChange,
    password,
    passwordRef,
    onPasswordChange,
  };
}
