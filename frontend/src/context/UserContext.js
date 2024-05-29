import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create UserContext
export const UserContext = createContext();

// UserContext Provider component
export const UserProvider = ({ children }) => {
    console.log('UserProvider rendered');
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const loginUser = async (email, password) => {
        console.log('LOGIN USER')
        const response = await axios.post("http://localhost:4000/api/users/login", { email, password });
        console.log(response.data);
        setUser(response.data);
        setLoggedIn(true);
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