import axios from 'axios'

const instance = axios.create({
  // .. where we make our configurations
  baseURL: 'http://ec2-13-209-32-113.ap-northeast-2.compute.amazonaws.com:8000'
})

export default instance