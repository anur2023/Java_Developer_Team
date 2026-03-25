import axios from "axios";

const BASE_URL = "http://localhost:5000/api/cart";

export const addToCartAPI = (data) => {
    return axios.post(`${BASE_URL}/add`, data);
};

export const removeFromCartAPI = (data) => {
    return axios.post(`${BASE_URL}/remove`, data);
};

export const getCartAPI = (userId) => {
    return axios.get(`${BASE_URL}/${userId}`);
};