import axios from "axios";

const USERS_KEY = "users";
const SPECIALS_KEY = "specials";

// Function to initialize local storage with user data if not already initialized
function initUsers() {
  if (localStorage.getItem(USERS_KEY) !== null) return;

  const users = [
    {
      id: generateUniqueId(), // New unique ID
      name: "Isaac",
      email: "ik@gmail.com",
      password: "Abcd1234!",
      joinDate: new Date().toISOString(),
    },
    {
      id: generateUniqueId(), // New unique ID
      name: "Test",
      email: "test@t.com",
      password: "Testpassword1!",
      joinDate: new Date().toISOString(),
    },
  ];

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Helper function to generate a unique ID
function generateUniqueId() {
  // Use a simple approach to create unique IDs, such as UUIDs, timestamps, or random numbers
  return (
    Math.floor(Math.random() * 1000000000).toString(16) + 
    '-' +
    new Date().getTime().toString(16)
  );
}

// Function to get all users from local storage
function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return JSON.parse(data);
}

// Function to add a new user to local storage with a unique ID
function addUser(newUser) {
  const users = getUsers() || [];

  newUser.id = generateUniqueId(); // Assign a unique ID to the new user
  users.push(newUser);

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


// // Function to verify user credentials
// function verifyUser(email, password) {
//     const users = getUsers() || []; // Retrieve users from local storage
//     console.log("verify email: " + email);
//     console.log("verify password: " + password);
  
//     // Find user by email
//     const user = users.find((user) => user.email === email);
  
//     // Verify if user exists and password matches
//     if (user && user.password === password) {
//       return user; // Return the user object if credentials are correct
//     } else {
//       return null; // Return null if credentials are incorrect
//     }
//   }

  const logoutUser = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  function deleteAccount(currentUser, logoutUser) {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.filter((user) => user.email !== currentUser.email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      logoutUser(); // Log the user out and redirect
    }
  }

  function formatDate(joinDate) {
    const date = new Date(joinDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Function to initialize local storage with specials data if not already initialized
function initSpecials() {
    // Stop if data is already initialized
    if (localStorage.getItem(SPECIALS_KEY) !== null) 
      return;
  
    // Initialize specials data with an empty array
    const specials = [
    {
      id: 1,
      name: "Apples",
      image: "apple.png",
      price: 2.99,
      description: "Fresh organic apples from local farms.",
      quantity: 0
    },
    {
      id: 2,
      name: "Spinach",
      image: "spinach.png",
      price: 3.49,
      description: "Tender organic spinach leaves, perfect for salads.",
      quantity: 0
    },
    {
      id: 3,
      name: "Freshly Baked Bread",
      image: "bread.png",
      price: 4.99,
      description: "Warm and crusty artisan bread, straight from the oven.",
      quantity: 0
    },
    {
      id: 4,
      name: "Handcrafted Soap",
      image: "soap.png",
      price: 6.99,
      description: "Natural and moisturizing soap made with essential oils.",
      quantity: 0
    },
    {
      id: 5,
      name: "Tomato Plant",
      image: "tomatoes.png",
      price: 7.99,
      description: "Healthy and robust tomato plant for your garden.",
      quantity: 0
    },
    {
      id: 6,
      name: "Free-Range Chicken",
      image: "hen.png",
      price: 9.99,
      description: "Humanely raised and organic free-range chicken.",
      quantity: 0
    },
    {
      id: 7,
      name: "Fresh Cookies",
      image: "cookies.png",
      price: 3.99,
      description: "Soft and chewy cookies baked with organic ingredients.",
      quantity: 0
    },
    {
      id: 9,
      name: "Herb Garden Kit",
      image: "growing-plant.png",
      price: 12.99,
      description: "Complete kit for growing your own organic herbs at home.",
      quantity: 0
    },
    {
      id: 10,
      name: "Grass-Fed Beef",
      image: "beef-steak.png",
      price: 13.99,
      description: "Lean and flavorful grass-fed beef, perfect for grilling.",
      quantity: 0
    },
    {
      id: 11,
      name: "Fresh Orange Juice",
      image: "juice.png",
      price: 5.49,
      description: "Pure and refreshing orange juice, squeezed from ripe oranges.",
      quantity: 0
    },
    {
      id: 12,
      name: "Flower Bouquet",
      image: "flower.png",
      price: 8.99,
      description: "Beautiful and fragrant bouquet of fresh-cut flowers.",
      quantity: 0
    },
  ];
  // Set data into local storage
  localStorage.setItem(SPECIALS_KEY, JSON.stringify(specials));
}



export { initUsers, getUsers, addUser, initSpecials, generateUniqueId, formatDate, logoutUser, deleteAccount };









// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getPosts, createPost,
  getUser, removeUser
}
