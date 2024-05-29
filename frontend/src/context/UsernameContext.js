import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create UserContext
export const UsernameContext = createContext();

// UserContext Provider component

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
        const response = await axios.get("http://localhost:4000/api/users");
        setUser(response.data);
        };
        fetchUser();
    }, []);
    
    return (
        <UsernameContext.Provider value={{ user, setUser }}>
        {children}
        </UsernameContext.Provider>
    );
};
