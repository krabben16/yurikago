import axios from 'axios'

const defaultPort = (process.server && process.server.port) || 3000

let defaultHost = (process.server && process.server.host) || 'localhost'

if (defaultHost === '0.0.0.0') {
  defaultHost = 'localhost'
}

const https = Boolean(process.server && process.server.https)

const instance = axios.create({
  baseURL: (https ? 'https' : 'http') + `://${defaultHost}:${defaultPort}`
})

export default ({ app }, inject) => {
  inject('axios', instance)
}

export const axiosInstance = instance
