import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'localhost:5000/user'
})


export default axiosInstance;
