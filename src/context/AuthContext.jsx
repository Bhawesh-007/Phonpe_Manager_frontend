import React from "react";
import { createContext , useState , useEffect } from "react";

export const AuthContext = createContext();

export const Authprovider = ({children}) => {
    const [token , setToken] = useState(localStorage.getItem('jwt_token') || null);
    const [isAuthenticated , setIsAuthenticated] = useState(!!token)
    const login = (newToken)=>{
        localStorage.setItem('jwt_token' , newToken)
        setIsAuthenticated(true)
        setToken(newToken)
    }
    const logout = ()=>{
        localStorage.removeItem('jwt_token')
        setIsAuthenticated(false)
        setToken(null)
    }
    return(
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

    

}