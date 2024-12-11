"use client"
import React, { createContext, ReactNode, SetStateAction, useState } from "react"

interface ContextType {
    token: string | null,
    setToken: React.Dispatch<SetStateAction<null | string>>,
    likedList: string[], 
    setLikedList: React.Dispatch<SetStateAction<string[]>>
}

export const Context = createContext<ContextType>({
    token: null,
    setToken: () => "",
    likedList: [],
    setLikedList: () => {}
})

export const AuthContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null)
    const [likedList, setLikedList] = useState<string[]>([])

    if (token) localStorage.setItem("token", token)
    return (
        <Context.Provider value={{ token, setToken, likedList, setLikedList }}>{children}</Context.Provider>
    )
}