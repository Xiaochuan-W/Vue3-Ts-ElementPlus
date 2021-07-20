import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import store from '@/store'

// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    /* if (store.getters.token) {
      config.headers['base_token'] = getToken()
    } */
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    if (response.status !== 201) {
      ElMessage({
        message: response.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      /* if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } */
      return Promise.reject(new Error(response.data.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
