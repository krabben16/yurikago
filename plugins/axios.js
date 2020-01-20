import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV == 'production' ? '' : 'http://localhost:3000'
})

export default ({ app }, inject) => {
  inject('axios', instance)
}

export const axiosInstance = instance
