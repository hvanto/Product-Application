import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create UserContext
export const UserContext = createContext();

// UserContext Provider component
export const UserProvider = ({ children }) => {
    // State variables
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);


    // Initialize user state from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setLoggedIn(true);
        }
    }, []);

    // Function to login user
    const loginUser = async (email, password) => {
        try {
            // Make a POST request to the backend
            const response = await axios.post("http://localhost:4000/api/users/login", { email, password });
            // Set user state variable
            setUser(response.data);
            setLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(response.data)); // Save to localStorage
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    // Function to logout user
    const logoutUser = () => {
        setUser(null);
        setLoggedIn(false);
        setCartItems([]);
        localStorage.removeItem('user'); // Remove from localStorage
    };

    // Function to update user
    const updateUser = async (id, user) => {
        try {
            // Make a PUT request to the backend
            const response = await axios.put(`http://localhost:4000/api/users/update/${id}`, user);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data)); // Update localStorage
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    // Function to delete user
    const deleteUser = async (id) => {
        try {
            // Make a DELETE request to the backend
            await axios.delete(`http://localhost:4000/api/users/delete/${id}`);
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem('user'); // Remove from localStorage
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };

    // Function to create user
    const createUser = async (user) => {
        try {
            // Make a POST request to the backend
            const response = await axios.post("http://localhost:4000/api/users", user);
            setUser(response.data);
            setLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    };

    // Return the UserContext Provider
    return (
        <UserContext.Provider value={{ user, loggedIn, loginUser, logoutUser, updateUser, deleteUser, createUser }}>
            {children}
        </UserContext.Provider>
    );
};
