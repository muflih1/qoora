import axios from "../lib/axios";

export function login({
  email,
  password
}: { email: string; password: string }) {
  const payload = { email, password }
  return axios.post('/auth/login', payload, { withCredentials: true })
}