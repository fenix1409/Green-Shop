"use client"
import Footer from '@/components/Footer'
import ProductsList from '@/components/ProductCard'
import debounce from '@/hook/debounce'
import Hero from '@/pages/Home pages/Hero'
import { Category, CategoryType } from '@/service/Category'
import { Product, ProductType } from '@/service/Product'
import { Pagination } from '@nextui-org/pagination'
import { Slider } from '@nextui-org/slider'
import React, { useState } from 'react'

export const HomePage = () => {
  const [categoryName, setCategoryName] = useState<string | null>(null)
  const [tags, setTags] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)

  const [price, setPrice] = useState<number[] | number>([39, 1230])
  const fullPrice = debounce(price, 1000)
  console.log(fullPrice);
  

  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(10)

  const categories: CategoryType[] = Category()
  const products: ProductType[] = Product(categoryName, tags, page, setTotalPage, fullPrice, size)
  return (
    <div>
      <Hero />
      <section className='flex gap-[50px] mt-[46px] p-10 mb-[94px]'>
        <ul className='w-[17%] h-auto p-5 space-y-5 bg-[#F5F5F580] rounded-lg'>
          {[{ category_name: "All", category_id: null }, ...categories].map((item: CategoryType) => <li onClick={() => setCategoryName(item.category_name)} className='cursor-pointer' key={item.category_id}>{item.category_name} (33)</li>)}
          <Slider
          onChange={(e) => setPrice(e)}
            className="max-w-md"
            defaultValue={[39, 1230]}
            formatOptions={{ style: "currency", currency: "USD" }}
            label="Range Price"
            maxValue={1230}
            minValue={39}
            step={2}
            size='sm'
            color='success'
          />
          <div className="">
            <strong>{fullPrice[0]}$ - {fullPrice[1]}$</strong>
          </div>
          <ul className='space-y-4'>
            <h2 className='text-[18px] leading-[16px] font-bold mb-[7px]'>Size</h2>
            <li onClick={() => setSize('Small')} className='cursor-pointer'>Small</li>
            <li onClick={() => setSize('Medium')} className='cursor-pointer'>Medium</li>
            <li onClick={() => setSize('Large')} className='cursor-pointer'>Large</li>
          </ul>
        </ul>
        <div className="w-[80%]">
          <ul className='flex items-center space-x-5'>
            <li className={`cursor-pointer ${tags === null && "text-green-500"}`} onClick={() => setTags(null)}>All Plants</li>
            <li className={`cursor-pointer ${tags === "new-arrivals" && "text-green-500"}`} onClick={() => setTags('new-arrivals')}>New Arrivals</li>
            <li className={`cursor-pointer ${tags === "sale" && "text-green-500"}`} onClick={() => setTags("sale")}>Sale</li>
          </ul>
          <div className='flex justify-between gap-5 flex-wrap'>
            {products ? products.map((item: ProductType) => <ProductsList key={item.product_id} item={item} />) : "Empty..."}
          </div>
        </div>
        <div className="flex justify-end p-10">
          <Pagination onChange={(e) => setPage(e)} color='success' size='lg' initialPage={page} total={totalPage / 6} />
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default HomePage