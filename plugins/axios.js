import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

export default ({ app }, inject) => {
  inject('axiosInstance', instance)
}

export const axiosInstance = instance
