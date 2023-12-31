import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};


const UserService = {
  getPublicContent,
  getUserBoard
}

export default UserService;
