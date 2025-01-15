import debounce from '@/hook/debounce'
import { Product, ProductType } from '@/service/Product'
import React, { useState } from 'react'
import ProductsList from './ProductCard'

const ListProduct = () => {
    const [page] = useState<number>(1)
    const [, setTotalPage] = useState<number>(10)
    const [price] = useState<number[] | number>([39, 1230])
    const fullPrice = debounce(price, 1000)
    const [categoryName] = useState<string | null>(null)
    const [tags] = useState<string | null>(null)
    const [size] = useState<string | null>(null)
    const products: ProductType[] = Product(categoryName, tags, page, setTotalPage, fullPrice, size)

    return (
        <div className="flex items-center gap-[100px] text-start mt-[44px]">
            {products ? products.map((item: ProductType) => <ProductsList item={item} key={item.product_id} />) : "Empty..."}
        </div>
    )
}

export default ListProduct