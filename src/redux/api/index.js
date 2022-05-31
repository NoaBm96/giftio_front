import axios from "axios";

const production  = 'https://giftio.herokuapp.com';
const development = 'http://localhost:5001';
const url = production;

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (sessionStorage.getItem("profile")) {
    const token = JSON.parse(sessionStorage.getItem("profile")).token;
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

//Auth

export const signin = (user) => API.post("/auth/signin", user);
export const signup = (user) => API.post("/auth/signup", user);

//Friends

export const getFriends = () => API.get("/friends");

export const createFriend = (newFriend) => API.post("/friends", newFriend);

export const deleteFriend = (id) => API.delete(`/friends/${id}`);

//Users

export const getUsers = () => API.get("/users");

//WishLists

export const getWishLists = () => API.get("/wishLists");
export const getFriendWishLists = (id) => API.get(`/wishLists/${id}`);

export const createWishList = (newWishList) =>
  API.post("/wishLists", newWishList);

export const updateWishList = (id, updatedWishList) =>
  API.patch(`/wishLists/${id}`, updatedWishList);

export const deleteWishList = (id) => API.delete(`/wishLists/${id}`);

//WishListCategories

export const getWishListCategories = () => API.get("/wishListCategories");

export const getFriendWishListCategories = (id) =>
  API.get(`/wishListCategories/${id}`);

export const createWishListCategory = (newWishListCategory) =>
  API.post("/wishListCategories", newWishListCategory);

export const updateWishListCategory = (id, updatedWishListCategory) =>
  API.patch(`/wishListCategories/${id}`, updatedWishListCategory);

export const deleteWishListCategory = (id) =>
  API.delete(`/wishListCategories/${id}`);

//PaymentMethods

export const getPaymentMethods = () => API.get("/paymentMethods");

export const createPaymentMethod = (newPaymentMethod) =>
  API.post("/paymentMethods", newPaymentMethod);
