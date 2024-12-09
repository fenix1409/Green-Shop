"use client"
import { instance } from "@/hook/instance";
import { useEffect, useState } from "react";


export interface ProductType {
    product_id: string;
    product_name: string;
    category_id: string;
    short_description: string;
    product_description: string;
    product_status: string;
    size: string[];
    count: number;
    cost: number;
    discount: number;
    tags: string[];
    liked: boolean;
    basket: boolean;
    image_url: string[];
}

export const Product = () => {
    const [data, setData] = useState<ProductType[]>([])

    useEffect(() => {
        instance().get('/products?page=1&limit=100').then(res => {
            setData(res.data.products);
        })
    }, [])
    return data
}