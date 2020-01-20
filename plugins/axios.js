import axios from 'axios'

export default ({ app }, inject) => {
  inject('axios', axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? '' : 'http://localhost:3000'
  }))
}
