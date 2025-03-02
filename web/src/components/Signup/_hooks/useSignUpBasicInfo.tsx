// import {
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import {
//   isStringEmail,
//   isStringNotNullAndNotWhitespaceOnly,
//   isStringOfMinLength,
// } from '../../../lib/validators';
// import useSignUpSubmitBasicInfo from './useSignUpSubmitBasicInfo';
// import { debounce } from 'lodash';
// import { promiseDone } from '../utils';
// import { signUpEmailExistsRequest } from '../../../services/SignUpAPI';

// function useDebounceEffect(
//   effect: React.EffectCallback,
//   deps?: React.DependencyList,
//   delay: number = 300
// ) {
//   const effectRef = useRef(effect);

//   useEffect(() => {
//     effectRef.current = effect;
//   }, [effect]);

//   useEffect(() => {
//     const debounced = debounce(() => effectRef.current(), delay);
//     debounced();

//     return () => {
//       debounced.cancel();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [...deps, delay]);
// }

// function useDebouncedIsEmailExists(email: string) {
//   const [available, setAvailable] = useState(false);

//   useDebounceEffect(() => {
//     if (isStringEmail(email)) {
//       promiseDone(signUpEmailExistsRequest(email), res => {
//         setAvailable(res.data.available);
//       });
//     }
//   }, [email]);

//   return available;
// }

// export default function useSignUpBasifInfo() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const nameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);

//   const syncInputValues = useCallback(() => {
//     if (nameRef.current != null) {
//       const value = nameRef.current.value;
//       if (!isStringNotNullAndNotWhitespaceOnly(value)) {
//         setName(value);
//       }
//     }
//     if (emailRef.current != null) {
//       const value = emailRef.current.value;
//       if (!isStringNotNullAndNotWhitespaceOnly(value)) {
//         setEmail(value);
//       }
//     }
//   }, [nameRef, setName, emailRef, setEmail]);

//   useLayoutEffect(() => {
//     syncInputValues();
//   }, [syncInputValues]);

//   const isEmailExists = useDebouncedIsEmailExists(email);

//   const isDisabled = useMemo(
//     () =>
//       !isStringNotNullAndNotWhitespaceOnly(name) ||
//       !isStringNotNullAndNotWhitespaceOnly(email),
//     [email, name]
//   );

//   const onNameChange = useCallback((name: string) => setName(name), [setName]);

//   const onEmailChange = useCallback(
//     (email: string) => setEmail(email),
//     [setEmail]
//   );

//   const { onSubmitSendSignUpConfirmationEmail } = useSignUpSubmitBasicInfo();

//   const handleSubmit = useCallback(() => {
//     if (!isStringNotNullAndNotWhitespaceOnly(name)) {
//       if (nameRef.current) {
//         nameRef.current.focus();
//       }
//       alert("Wha't your name.");
//       return;
//     }
//     if (!isStringOfMinLength(2)(name)) {
//       if (nameRef.current) {
//         nameRef.current.focus();
//       }
//       alert('Your name needs to be at least 2 characters long.');
//       return;
//     }
//     if (!isStringNotNullAndNotWhitespaceOnly(email)) {
//       if (emailRef.current) {
//         emailRef.current.focus();
//       }
//       alert('Enter your email.');
//       return;
//     }
//     if (!isStringEmail(email)) {
//       if (emailRef.current) {
//         emailRef.current.focus();
//       }
//       alert('Enter a valid email.');
//       return;
//     }
//     if (!isEmailExists) {
//       if (emailRef.current) {
//         emailRef.current.focus()
//       }
//       alert('Email already exists.');
//       return;
//     }

//     onSubmitSendSignUpConfirmationEmail(email);
//   }, [name, email, onSubmitSendSignUpConfirmationEmail, isEmailExists]);

//   return {
//     nameRef,
//     name,
//     onNameChange,
//     emailRef,
//     email,
//     onEmailChange,
//     isDisabled,
//     handleSubmit,
//   };
// }
