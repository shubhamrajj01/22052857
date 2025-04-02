import axios from "axios";

const API_URL = "http://localhost:5000"; // Replace with actual backend URL

export const getTopUsers = async () => {
  const response = await axios.get(`${API_URL}/top-users`);
  return response.data;
};

export const getTrendingPosts = async () => {
  const response = await axios.get(`${API_URL}/trending-posts`);
  return response.data;
};

export const getFeed = async () => {
  const response = await axios.get(`${API_URL}/feed`);
  return response.data;
};
