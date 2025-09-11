import axios from "axios";
const API_URL = "https://api.escuelajs.co/api/v1";

export const createUser = async (name, email, password, avatar) => {
  const res = await axios.post(`${API_URL}/users`, {
    name,
    email,
    password,
    avatar,
  });
  return res.data;
};
