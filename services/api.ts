import axios from "axios"

// Crea una instancia de Axios con una baseUrl
const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000,
})

export default api
