import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Se encarga de enviar las funciones cuando se requiera
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token) {
        config.headers.Authorization = `Bearer ${token}` // Enviar token si existe 
    }
    return config
})

export default api
