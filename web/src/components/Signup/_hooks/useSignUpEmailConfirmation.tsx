// import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
// import { isStringNotNullAndNotWhitespaceOnly } from "../../../lib/validators";
// import useSignUpSubmitVerifyEmailConfirmationCode from "./useSignUpSubmitVerifyEmailConfirmationCode";
// import useSignUpBasifInfo from "./useSignUpBasicInfo";

// export default function useSignUpEmailConfirmation() {
//   const { email } = useSignUpBasifInfo()
//   const [code, setCode] = useState("")
//   const codeRef = useRef<HTMLInputElement>(null)

//   const syncStateWithInputValue = useCallback(() => {
//     if (codeRef.current) {
//       const value = codeRef.current.value
//       if (isStringNotNullAndNotWhitespaceOnly(value)) {
//         setCode(value)
//       }
//     }
//   }, [codeRef, setCode])

//   useLayoutEffect(() => {
//     syncStateWithInputValue()
//   }, [syncStateWithInputValue])

//   const isDisabled = useMemo(() => !isStringNotNullAndNotWhitespaceOnly(code), [code])

//   const onEmailConfirmationCodeChange = useCallback((code: string) => {
//     if (code.length > 6) return
//     const sanitized = code.replace(/[^0-9]/g, '')
//     setCode(sanitized)
//   }, [setCode])

//   const {onSignUpSubmitVerifyEmailConfirmationCode} = useSignUpSubmitVerifyEmailConfirmationCode()

//   const handleSubmit = useCallback(() => {
//     if (!/^\d{6}$/.test(code)) {
//       if (codeRef.current) {
//         codeRef.current.focus()
//       }
//       alert('Your confirmation code should be 6 digits without spaces.')
//       return
//     }
//     onSignUpSubmitVerifyEmailConfirmationCode(email, code)
//   }, [code, onSignUpSubmitVerifyEmailConfirmationCode, email])

//   return {isDisabled, code, codeRef, onEmailConfirmationCodeChange, email, handleSubmit}
// }