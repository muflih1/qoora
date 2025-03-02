import axios from "axios";

export function login({
  email,
  password
}: { email: string; password: string }) {
  const payload = { email, password }
  return axios.post('http://localhost:3000/api/v1/auth/login', payload, { withCredentials: true })
}