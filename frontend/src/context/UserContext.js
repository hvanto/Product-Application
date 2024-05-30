import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create UserContext
export const UserContext = createContext();

// UserContext Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);


    const loginUser = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:4000/api/users/login", { email, password });
            console.log('response data', response.data);
            setUser(response.data);
            setLoggedIn(true);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logoutUser = () => {
        setUser(null);
        setLoggedIn(false);
    };

    const updateUser = async (id, user) => {
        try {
            console.log('userID', id);
            console.log('user', user);
            const response = await axios.put(`http://localhost:4000/api/users/update/${id}`, user);
            setUser(response.data);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/users/delete/${id}`);
            setUser(null);
            setLoggedIn(false);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    const createUser = async (user) => {
        try {
            const response = await axios.post("http://localhost:4000/api/users", user);
            setUser(response.data);
            setLoggedIn(true);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }


    return (
        <UserContext.Provider value={{ user, loggedIn, loginUser, logoutUser, updateUser, deleteUser, createUser }}>
            {children}
        </UserContext.Provider>
    );
};
