import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await axios.post(API_HOST + "/api/users/login", {
    email,
    password,
  });
  console.log("response data", response.data);
  const user = response.data;

  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if (user !== null) setUser(user);

  return user;
}

// function to create a new user
async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

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

const carts = [
  {
    cartId: 1,
    cartLines: [
      {
        cartId: 1,
        cartLineId: 2,
        createdAt: "2024-06-02T07:42:49.000Z",
        product: {
          createdAt: "2024-06-02T06:45:50.000Z",
          imgUrl: "soap.png",
          price: "6.99",
          productDescription: "Natural and moisturizing soap made with essential oils.",
          productId: 4,
          productName: "Handcrafted Soap",
          special: false,
          specialPrice: null,
          updatedAt: "2024-06-02T06:45:50.000Z",
        },
        productId: 4,
        quantity: 3,
        updatedAt: "2024-06-02T07:42:49.000Z",
      },
      {
        cartId: 1,
        cartLineId: 1,
        createdAt: "2024-06-02T07:06:25.000Z",
        product: {
          productId: 1,
          productName: "Apples",
          productDescription: "Fresh organic apples from local farms.",
          price: "2.99",
          imgUrl: "apple.png",
          special: true,
          specialPrice: "2.50",
          createdAt: "2024-06-02T06:45:49.000Z",
          updatedAt: "2024-06-02T06:45:49.000Z",
        },
        productId: 1,
        quantity: 1,
        updatedAt: "2024-06-02T07:06:25.000Z",
      },
    ],
    createdAt: "2024-06-02T06:45:49.000Z",
    updatedAt: "2024-06-02T06:45:49.000Z",
    userId: 1,
  },
];

const users = [
  {
    userId: 1,
    username: "isaac",
    email: "isaac@gmail.com",
    password_hash:
      "$argon2id$v=19$m=65536,t=3,p=4$+H4jdJG+ojYglEc6HmscSw$iKla/BOXAvBTFFFJhwd/kfstAC/skLLyXi/iJLPCz/Y",
    createdAt: "2024-06-02T06:45:49.000Z",
    updatedAt: "2024-06-02T06:53:36.000Z",
  },
];

const reviews = [
  {
    reviewId: 1,
    productId: 1,
    userId: 1,
    rating: 5,
    content: "Great product!",
    createdAt: "2024-06-02T06:45:49.000Z",
    updatedAt: "2024-06-02T06:45:49.000Z",
    product: {
      productName: "Apples"
    },
    user: {
      username: "isaac"
    }
  }
];

function getCarts() {
  return carts;
}

function getUsers() {
  return users;
}

function getReviews() {
  return reviews;
}

export { getCarts, getUsers, getReviews };

