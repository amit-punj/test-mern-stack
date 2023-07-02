import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

const register = (username, email, password, confirm_password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    confirm_password
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      console.log('response', response.data)
      if (response.data.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  console.log('here in logout')
  return axios.post(API_URL + "signout").then((response) => {
    console.log('response', response)
    return response.data;
  });
};

const getCurrentUser = () => {
  console.log('getCurrentUser in auth', localStorage.getItem("user"))
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
