import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL
})

export default api