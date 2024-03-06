import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4002/",
    // baseURL: "https://sawtooth-platform-rest-api.azurewebsites.net/",
    headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});

axiosInstance.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
    }
    return config;
});

export default axiosInstance;