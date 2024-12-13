"use client"
import { Context } from "@/context/AuthContext";
import { instance } from "@/hook/instance";
import { useQuery } from "@tanstack/react-query";
import React, { SetStateAction, useContext } from "react";


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

interface ParamsType {
    page: number,
    limit: number,
    category?: string | null,
    tags?: string | null,
    min_price: number,
    max_price: number,
    size:string | null
}
export const Product = (categoryName: string | null, tags: string | null, page: number, setTotalPage: React.Dispatch<SetStateAction<number>>, fullPrice: number[], size:string | null) => {
    const { token } = useContext(Context)
    const params: ParamsType = {
        page,
        limit: 6,
        category: categoryName == "All" ? null : categoryName,
        tags: tags,
        min_price: fullPrice[0],
        max_price: fullPrice[1],
        size
    };
    const { data = [] } = useQuery({
        queryKey: ['products', categoryName, tags, page, fullPrice, size],
        enabled: true,
        queryFn: () => instance().get("/products", {
            headers: token ? { "Authorization": `Bearer ${token}` } : {},
            params: params
        }).then((res) => {
            setTotalPage(res.data.total_count)
            return res.data.products
        })
    });
    return data
}