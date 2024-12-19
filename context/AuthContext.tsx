"use client";
import React, { createContext, ReactNode, SetStateAction, useState, useContext } from "react";

interface ContextType {
    token: string | null;
    setToken: React.Dispatch<SetStateAction<null | string>>;
}

export const Context = createContext<ContextType>({
    token: null,
    setToken: () => "",
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);

    if (token) localStorage.setItem("token", token);
    return (
        <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
    );
};

export const useAuth = () => useContext(Context);