import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create UserContext
export const UserContext = createContext();

// UserContext Provider component
export const UserProvider = ({ children }) => {
    // State variables
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);


    // Function to login user
    const loginUser = async (email, password) => {
        try {
            // Make a POST request to the backend
            const response = await axios.post("http://localhost:4000/api/users/login", { email, password });
            // Set user state variable
            setUser(response.data);
            setLoggedIn(true);
        // Catch for error in login
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    // Function to logout user
    const logoutUser = () => {
        setUser(null);
        setLoggedIn(false);
    };

    // Function to update user
    const updateUser = async (id, user) => {
        try {
            // Make a PUT request to the backend
            const response = await axios.put(`http://localhost:4000/api/users/update/${id}`, user);
            setUser(response.data);
        } catch (error) {
            // Catch for error in updating user
            console.error('Error updating user:', error);
            throw error;
        }
    }

    // Function to delete user
    const deleteUser = async (id) => {
        try {
            // Make a DELETE request to the backend
            const response = await axios.delete(`http://localhost:4000/api/users/delete/${id}`);
            // Set user state variable
            setUser(null);
            setLoggedIn(false);
        } catch (error) {
            // Catch for error in deleting user
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    // Function to create user
    const createUser = async (user) => {
        try {
            // Make a POST request to the backend
            console.log('user', user)
            const response = await axios.post("http://localhost:4000/api/users", user);
            // Set user state variable
            setUser(response.data);
            setLoggedIn(true);
        } catch (error) {
            // Catch for error in creating user
            console.error('Error creating user:', error);
            throw error;
        }
    }


    // Return the UserContext Provider
    return (
        <UserContext.Provider value={{ user, loggedIn, loginUser, logoutUser, updateUser, deleteUser, createUser }}>
            {children}
        </UserContext.Provider>
    );
};
