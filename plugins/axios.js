import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.yurikago-blog.com' : 'http://homestead.test'
})

export default ({ app }, inject) => {
  inject('axios', axiosInstance)
}
