import axios from "axios";
const API_URL = "https://api.escuelajs.co/api/v1";

export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
};

export const getCategoryById = async (id) => {
  const res = await axios.get(`${API_URL}/categories/${id}`);
  return res.data;
}