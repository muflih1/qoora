import axios from "../lib/axios";

export function sendSignUpConfirmationEmail(email: string) {
  return axios.post('/auth/send_confirmation_email', {email})
}

export function signUpEmailExistsRequest(email: string) {
  return axios.get(`/auth/email_available?email=${email}`)
}

export function sendSignUpVerifyConfirmationCodeRequest(email: string, code: string) {
  return axios.post('/auth/verify_email_confirmation_code', {email, code})
}