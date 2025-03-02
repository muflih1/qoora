import baseAxios from "axios"

const BASE_API_URL = '/api/'

const axios = baseAxios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-Csrftoken'
})

export default axios