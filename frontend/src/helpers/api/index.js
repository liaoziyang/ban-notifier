import axios from 'axios'

axios.defaults.baseURL = __API__
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

export function get(path){
  return axios.get(path).catch((error) => error.response)
}
export function post(path, body){
  return axios.post(path, body).catch((error) => error.response)
}
