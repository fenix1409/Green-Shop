"use client"
import { instance } from "@/hook/instance";
import { useQuery } from "@tanstack/react-query";


export interface CategoryType {
    category_id: string | null;
    category_name: string;
}

export const Category = () => {
    const params: { page: number, limit: number } = { page: 1, limit: 100 }
    const { data = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: () => instance().get("/categories", { params }).then(res => res.data?.categories)
    })
    return data
}