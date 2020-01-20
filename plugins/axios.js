import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://www.yurikago-blog.com' : 'http://localhost:3000'
})

export default ({ app }, inject) => {
  inject('axiosInstance', instance)
}

export const axiosInstance = instance
