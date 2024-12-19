import debounce from '@/hook/debounce'
import { Product, ProductType } from '@/service/Product'
import React, { useState } from 'react'
import ProductsList from './ProductCard'

const ListProduct = () => {
    const [page, setPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(10)
    const [price, setPrice] = useState<number[] | number>([39, 1230])
    const fullPrice = debounce(price, 1000)
    const [categoryName, setCategoryName] = useState<string | null>(null)
    const [tags, setTags] = useState<string | null>(null)
    const [size, setSize] = useState<string | null>(null)
    const products: ProductType[] = Product(categoryName, tags, page, setTotalPage, fullPrice, size)

    return (
        <div className="flex items-center gap-[100px] text-start mt-[44px]">
            {products ? products.map((item: ProductType) => <ProductsList item={item} key={item.product_id} />) : "Empty..."}
        </div>
    )
}

export default ListProduct