import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/";


class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    loginFormSubmit(username, password) {
        return axios.post(API_URL + 'users/login', { username, password })
            .then(response => {
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    register(username, email, password) {
        return axios.post(API_URL + "create", {
            username,
            email,
            password
        });
    }
}


export default new AuthService();
