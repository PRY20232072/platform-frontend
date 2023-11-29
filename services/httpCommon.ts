import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:4000/",
    baseURL: "https://sawtooth-platform-rest-api.azurewebsites.net/",
    headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});
