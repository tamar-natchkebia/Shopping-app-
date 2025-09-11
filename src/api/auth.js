import axios from "axios";
const API_URL = "https://api.escuelajs.co/api/v1";

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
