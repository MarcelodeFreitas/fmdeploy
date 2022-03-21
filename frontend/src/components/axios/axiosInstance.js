import axios from "axios"

const baseURL = process.env.REACT_APP_BACKEND_URL
console.log("baseURL: ", baseURL)
let headers = {}

if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`
}

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
})

axiosInstance.interceptors.response.use((response) => new Promise((resolve, reject) => {
    resolve(response)
}), (error) => {
    if (!error.response) {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }
    if (error.response.status === 401) {
        localStorage.removeItem("token")
        console.log("AxiosInstance: ERROR 401")
        window.location = "/auth"
    } else {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }
})

export default axiosInstance