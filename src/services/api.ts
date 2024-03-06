import axios from 'axios'

import backendErrors from './erros'
import { Notify } from '../heslpers/notify'
import { RefreshToken } from './login'

const service = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  timeout: 20000
})

const handlerError = (err: any) => {
  const errorMsg = err?.response?.data?.error
  const beErros: any = backendErrors
  let error = 'Ocorreu um erro não identificado.'
  if (errorMsg) {
    if (beErros[errorMsg]) {
      error = beErros[errorMsg]
    } else {
      error = err.response.data.error
    }
  }
  Notify({
    position: 'top-right',
    type: 'warning',
    message: `${JSON.stringify(error)}`
  })
}

service.interceptors.request.use(
  config => {
    const tokenAuth = JSON.parse(localStorage.getItem('token')|| '{}')
    console.log('LALALA')
    const token = 'Bearer ' + tokenAuth
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response
    const status = res.status
    if (status.toString().substr(0, 1) !== '2') {
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    if (error?.response?.status === 403 && !error.config._retry) {
      error.config._retry = true
      RefreshToken().then(res => {
        if (res.data) {
          localStorage.setItem('token', JSON.stringify(res.data.token))
        }
      })
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      if (error.config.url.indexOf('logout') === -1) {
        handlerError(error)
      }
    } else if (error.response && error.response.status === 500) {
      handlerError(error)
    } 
    return Promise.reject(error.response)
  }
)

export default service
