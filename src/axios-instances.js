import axios from 'axios'
import store from './store/index'
import { fetchToken } from './functions'

const axiosInstance = axios.create({
    baseURL:'https://e-combackend.herokuapp.com'
})

axiosInstance.interceptors.request.use(config=>{
    config.headers['token'] = getToken()
    return config
})

function getToken(){
    return store.getters['auth/token'] || fetchToken()
}

export default axiosInstance