//what this will do is that just add the jwt token with every network request by the user
import axios from 'axios'
const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        'Content-Type': 'application/json'
    }
})
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');

        // If we have a token, stamp it onto the request header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default apiClient