import * as stylex from '@stylexjs/stylex';
import Button from '../../Button/Button';
import FormField from '../../FormField';
import useSignIn from '../_hooks/useSignIn';
import BaseText from '../../Typography/BaseText';
import BaseTextLink from '../../Button/BaseTextLink';

export default function SignInFormRenderer() {
  const {
    submitRef,
    handleSubmit,
    emailRef,
    email,
    onEmailChange,
    passwordRef,
    password,
    onPasswordChange,
    isDisabled,
  } = useSignIn();

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
    >
      <FormField
        ref={emailRef}
        label='Email'
        type='email'
        placeholder='Your email'
        value={email}
        onValueChange={onEmailChange}
      />
      <FormField
        ref={passwordRef}
        label='Password'
        type='password'
        placeholder='Your password'
        value={password}
        onValueChange={onPasswordChange}
      />
      <input
        ref={submitRef}
        type='submit'
        hidden
      />
      <Button
        isDisabled={isDisabled}
        label='Log in'
        type='primary'
        onPress={() => submitRef.current?.click()}
      />
      <div {...stylex.props(styles.seperator)} />
      <BaseText>
        Don't have an account?{' '}
        <BaseTextLink
          weight='semibold'
          underlineOnHover
          href='/signup'
        >
          Sign up
        </BaseTextLink>
      </BaseText>
    </form>
  );
}

const styles = stylex.create({
  seperator: {
    marginTop: 16,
    marginBottom: 16,
    borderTopColor: '#dee0e1',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
  },
});
