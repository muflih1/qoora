import baseAxios from "axios"

const BASE_API_URL = import.meta.env.VITE_APP_API_BASE_URI_V1

const axios = baseAxios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-Csrftoken'
})

export default axios