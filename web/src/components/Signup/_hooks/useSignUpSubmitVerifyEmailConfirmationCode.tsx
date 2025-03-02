// import { useCallback, useState } from "react";
// import { promiseDone } from "../utils";
// import { sendSignUpVerifyConfirmationCodeRequest } from "../../../services/SignUpAPI";
// import SignUpSetPasswordModal from "../SignUpSetPasswordModal";
// import { useDialog } from "../../../contexts/ModalFlowContext";

// export default function useSignUpSubmitVerifyEmailConfirmationCode() {
//   const [loading, setLoading] = useState(false)

//   const createDialog = useDialog()
//   const openSetPasswordDialog = useCallback(() => {
//     createDialog(SignUpSetPasswordModal, {}, null, {replaceCurrentDialog: true})
//   }, [createDialog])

//   const onSignUpSubmitVerifyEmailConfirmationCode = useCallback((email: string, code: string) => {
//     setLoading(true)
//     promiseDone(sendSignUpVerifyConfirmationCodeRequest(email, code), res => {
//       setLoading(false)
//       if (res.data.status === 'ok') {
//         openSetPasswordDialog()
//       }
//     })
//   }, [openSetPasswordDialog])

//   return {loading, onSignUpSubmitVerifyEmailConfirmationCode}
// }