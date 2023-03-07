import axios from 'axios'

const instance = axios.create({
  baseURL: '/dev-api',
  timeout: 10000
})

// 2.1.请求拦截的作用
instance.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err)
})
// 2.2.响应拦截
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err)
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}

export const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.put(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}
