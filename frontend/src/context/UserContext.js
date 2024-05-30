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

    return (
        <UserContext.Provider value={{ user, loggedIn, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
