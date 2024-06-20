import React, { createContext, useState } from "react";


const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState("");
    const [recipes, setRecipes] = useState("")
    
    return (
        <UserContext.Provider value={{ userId, setUserId, recipes, setRecipes }}>
            {children}
        </UserContext.Provider>
    );
    };
    
    export { UserContext, UserProvider };