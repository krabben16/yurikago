import axiosStatic from 'axios'

const axiosInstance = axiosStatic.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.yurikago-blog.com' : 'http://homestead.test'
})

export default ({ app }, inject) => {
  inject('axios', axiosInstance)
}

export const axios = axiosInstance
