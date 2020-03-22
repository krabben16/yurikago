import axiosStatic from "axios"
import constant from "~/plugins/constant.js"

const axiosInstance = axiosStatic.create({
  baseURL: constant.API_URL
})

export default ({ app }, inject) => {
  inject("axios", axiosInstance)
}
