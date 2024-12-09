"use client"
import { instance } from "@/hook/instance";
import { useEffect, useState } from "react";


export interface CategoryType {
    category_id:   string;
    category_name: string;
}

export const Category = () => {
    const [data, setData] = useState<CategoryType[]>([])

    useEffect(() => {
        instance().get('/categories?page=1&limit=100').then(res => {
            setData(res.data.categories);
        })
    }, [])
    return data
}