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
            localStorage.setItem("user", JSON.stringify(response.data.user));

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
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    if(userData.user && userData.roles && userData.userId)
        return userData;

    return null;
};

const isAdmin = function(){
    const currentUser = getCurrentUser();

    if(currentUser)
        return currentUser.roles.includes("admin")

    return false;
}

const isMod = function(){
    const currentUser = getCurrentUser();

    if(currentUser)
        return ["mod", "admin"].some(i => currentUser.roles.includes(i))

    return false;
}

const isUser = function(){
    const currentUser = getCurrentUser();

    if(currentUser)
        return ["user", "mod", "admin"].some(i => currentUser.roles.includes(i))

    return false;
}

const verifyLogin = function(){
    return axios.post(API_URL + "verifylogin", getCurrentUser()).then((response) => {
        return response;
    }).catch((err) => {
        localStorage.removeItem("user");

        return err.response
    });
}

const authService = {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    isAdmin,
    isMod,
    isUser,
    verifyLogin,
    roleOrder
}

export default authService;