import axios from "axios";

const API_URL = "http://localhost:3333/auth/";

const roleOrder = [
    "user", // least privs
    "mod",
    "admin" // most privs
]

const signUp = function(username: String, password: String){
    return axios.post(API_URL + "signup", {
        username,
        password,
    }).then((response) => {
        return response;
    }).catch((err) => {
        return err.response;
    });
};

const signIn = function(username: String, password: String){
    return axios.post(API_URL + "signin", {
        username,
        password,
    }).then((response) => {
        if (response.data.user)
            localStorage.setItem("user", JSON.stringify(response.data));

        return response;
    }).catch((err) => {
        return err.response;
    });
};

const signOut = function(){
    localStorage.removeItem("user");
    return axios.post(API_URL + "signout").then((response) => {
        return response;
    }).catch((err) => {
        return err.response;
    });
};

const getCurrentUser = function(){
    return JSON.parse(localStorage.getItem("user") || "{}");
};

const authService = {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    roleOrder
}

export default authService;