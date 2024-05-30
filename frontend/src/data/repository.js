import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await axios.post(API_HOST + "/api/users/login", { email, password });
  console.log('response data', response.data);
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

// function to create a new user
async function findUser(id) { 
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------


// function to create a new user
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

// function to create a new post
async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------

// function to create a new user
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// function to create a new user
function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

// function to create a new user
function removeUser() {
  localStorage.removeItem(USER_KEY);
}

// Exporting the functions
export {
  verifyUser, findUser,
  getPosts, createPost,
  getUser, removeUser
}
