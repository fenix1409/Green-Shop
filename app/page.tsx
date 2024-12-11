"use client"
import ProductsList from '@/components/ProductCard'
import Hero from '@/pages/Home pages/Hero'
import { Category, CategoryType } from '@/service/Category'
import { Product, ProductType } from '@/service/Product'
import { Pagination } from '@nextui-org/pagination'
import React, { useState } from 'react'

export const HomePage = () => {
  const [categoryName, setCategoryName] = useState<string | null>(null)
  const [tags, setTags] = useState<string | null>(null)

  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(10)

  const categories: CategoryType[] = Category()
  const products: ProductType[] = Product(categoryName, tags, page, setTotalPage)
  return (
    <div>
      <Hero />
      <section className='flex justify-between'>
        <ul className='w-[20%] p-5 space-y-5'>
          {[{ category_name: "All", category_id: null }, ...categories].map((item: CategoryType) => <li onClick={() => setCategoryName(item.category_name)} className='cursor-pointer' key={item.category_id}>{item.category_name}</li>)}
        </ul>
        <div className="w-[80%]">
          <ul className='flex items-center space-x-5'>
            <li className={`cursor-pointer ${tags === null && "text-green-500"}`} onClick={() => setTags(null)}>All Plants</li>
            <li className={`cursor-pointer ${tags === "new-arrivals" && "text-green-500"}`} onClick={() => setTags('new-arrivals')}>New Arrivals</li>
            <li className={`cursor-pointer ${tags === "sale" && "text-green-500"}`} onClick={() => setTags("sale")}>Sale</li>
          </ul>
          <div className='flex justify-between gap-5 flex-wrap'>
            {products ? products.map((item:ProductType) => <ProductsList key={item.product_id} item={item}/>) : "Empty..."}
          </div>
        </div>
        <div className="flex justify-end p-10">
          <Pagination onChange={(e) => setPage(e)} color='success' size='lg' initialPage={page} total={totalPage / 6} />
        </div>
      </section>
    </div>
  )
}

export default HomePage