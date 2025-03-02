import * as stylex from '@stylexjs/stylex';
import BaseText from '../components/Typography/BaseText';
import FormField from '../components/FormField';
import { useCallback, useRef, useState } from 'react';
import Button from '../components/Button/Button';
import BaseTextLink from '../components/Button/BaseTextLink';
import {
  isStringEmail,
  isStringNotNullAndNotWhitespaceOnly,
} from '../lib/validators';
import { promiseDone } from '../components/Signup/utils';
import axios from '../lib/axios';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitRef = useRef<HTMLInputElement>(null);

  const isDisabled =
    !isStringNotNullAndNotWhitespaceOnly(name) ||
    !isStringNotNullAndNotWhitespaceOnly(email) ||
    !isStringNotNullAndNotWhitespaceOnly(password);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isStringNotNullAndNotWhitespaceOnly(name)) {
        alert('Name cannot be blank');
        return;
      }
      if (!isStringNotNullAndNotWhitespaceOnly(email)) {
        alert('Email cannot be blank');
        return;
      }
      if (!isStringNotNullAndNotWhitespaceOnly(password)) {
        alert('Password cannot be blank');
        return;
      }
      if (!isStringEmail(email)) {
        alert('Please enter a valid email');
        return;
      }

      promiseDone(
        axios.post('/auth/signup', { given_name: name, email, password }),
        res => {
          if (res.data.status === 'ok') {
            window.location.href = '/';
          }
        }
      );
    },
    [email, name, password]
  );

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.heading)}>
          <BaseText
            size='headline1'
            color='primaryText'
            weight='bold'
            textAlign='center'
          >
            Create account
          </BaseText>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <FormField
            // ref={emailRef}
            label='Name'
            type='text'
            placeholder='Your name'
            value={name}
            onValueChange={setName}
          />
          <FormField
            // ref={emailRef}
            label='Email'
            type='email'
            placeholder='Your email'
            value={email}
            onValueChange={setEmail}
          />
          <FormField
            // ref={passwordRef}
            label='Password'
            type='password'
            placeholder='Your password'
            value={password}
            onValueChange={setPassword}
          />
          <input
            ref={submitRef}
            type='submit'
            hidden
          />
          <Button
            isDisabled={isDisabled}
            label='Sign up'
            type='primary'
            onPress={() => submitRef.current?.click()}
          />
          <div {...stylex.props(styles.seperator)} />
          <BaseText>
            Have an account?{' '}
            <BaseTextLink
              weight='semibold'
              underlineOnHover
              href='/login'
            >
              Sign in
            </BaseTextLink>
          </BaseText>
        </form>
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heading: {
    marginBottom: 24,
  },
  card: {
    width: 600,
  },
  seperator: {
    marginTop: 16,
    marginBottom: 16,
    borderTopColor: '#dee0e1',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
  },
});
