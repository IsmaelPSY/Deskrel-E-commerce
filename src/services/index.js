import axios from "axios";

const URL = 'https://morning-glade-2449.fly.dev/api/v1';


const getConfig = () => ({
    headers: {
        Authorization: `jwt ${localStorage.getItem('Token')}`
    }
})

export const loginUser = async (data) => {
    const req = await axios.post(`${URL}/login`, data)
    console.log("ESTOY EN LOGIN")
    console.log(req.data)
    return req.data
}

export const createUser = async (data) => {
    const req = await axios.post(`${URL}/register`, data)
    return req.data
}

export const getProducts = async () => {
    const req = await axios.get(`${URL}/product`, getConfig())
    return req.data
}

export const getProductById = async (id) => {
    const req = await axios.get(`${URL}/product/${id}/`, getConfig())
    return req.data
}

export const getFilterCategories = async () => {
    const req = await axios.get(`${URL}/categories/`, getConfig())
    return req.data
}

export const getFilterProducts = async (id) => {
    const req = await axios.get(`${URL}/product/?category=${id}`, getConfig())
    return req.data
}

export const addProductToCart = async (data) => {
    const req = await axios.post(`${URL}/product/add_to_cart/`, data, getConfig());
    return req.data
} 

export const getProductsFromCart = async () => {
    const req = await axios.get(`${URL}/cart/`, getConfig());
    return req.data
}

export const deleteProductFromCart = async (id) => {
    const req = await axios.delete(`${URL}/cart/${id}/remove_item/`, getConfig())
    return req.data
}

export const postCheckout = async () => {
    const req = await axios.post(`${URL}/cart/buy/`, {} ,getConfig());
    return req.data
}