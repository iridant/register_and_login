import axios from "axios";

const API_URL = "http://localhost:3333/auth/";

const signUp = function(username: String, password: String){
    return axios.post(API_URL + "signup", {
        username,
        password,
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    });
};

const signIn = function(username: String, password: String){
    return axios.post(API_URL + "signin", {
        username,
        password,
    }).then((response) => {
        if (response.data.username) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    }).catch((err) => {
        return err.response.data;
    });
};

const signOut = function(){
    localStorage.removeItem("user");
    return axios.post(API_URL + "signout").then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data
    });
};

const getCurrentUser = function(){
    return JSON.parse(localStorage.getItem("user") || "{}");
};

const AuthService = {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
}

export default AuthService;