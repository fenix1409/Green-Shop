"use client"
import BlogPosts from '@/components/BlogPosts'
import Button from '@/components/Button'
import CreateModal from '@/components/CreateModal'
import ProductsList from '@/components/ProductCard'
import HeroCarusel from '@/components/ProductCarusel/ProductCarusel'
import Sale from '@/components/Sale'
import debounce from '@/hook/debounce'
import { HomeIcon, Korzina, Likes, Profile } from '@/public/icons/Icons'
import { Category, CategoryType } from '@/service/Category'
import { Product, ProductType } from '@/service/Product'
import { Pagination } from '@nextui-org/pagination'
import { Slider } from '@nextui-org/slider'
import Link from 'next/link'
import React, { useState } from 'react'

export const HomePage = () => {
  const [categoryName, setCategoryName] = useState<string | null>(null)
  const [tags, setTags] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [price, setPrice] = useState<number[] | number>([39, 1230])
  const fullPrice = debounce(price, 1000)
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(10)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


  const categories: CategoryType[] = Category()
  const products: ProductType[] = Product(categoryName, tags, page, setTotalPage, fullPrice, size)

  // modal part 
  function handleOpenModal() {
    setIsModalOpen(true)
  }
  function handleCloseModal() {
    setIsModalOpen(false)
  }
  // modal part 

  return (
    <div>
      <div><HeroCarusel /></div>
      <Button onClick={handleOpenModal} title='Create a Product' type='button' extraStyle='!w-[150px] mt-5' />
      <CreateModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <section className='flex gap-[50px] mt-[46px] p-10 mb-[94px]'>
        <ul className='max-sm:hidden w-[17%] h-auto p-5 space-y-5 bg-[#F5F5F580] rounded-lg'>
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
            <li onClick={() => setSize('Small')} className='cursor-pointer'>Small (119)</li>
            <li onClick={() => setSize('Medium')} className='cursor-pointer'>Medium (86)</li>
            <li onClick={() => setSize('Large')} className='cursor-pointer'>Large (78)</li>
          </ul>
        </ul>
        <div className="max-sm:w-full sm:w-[80%]">
          <ul className='flex items-center max-sm:justify-center max-sm:space-x-[30px] sm:space-x-5'>
            <li className={`cursor-pointer ${tags === null && "text-green-500 max-sm:text-[14px] max-sm:leading-[16px]"}`} onClick={() => setTags(null)}>All Plants</li>
            <li className={`cursor-pointer ${tags === "new-arrivals" && "text-green-500 max-sm:text-[14px] max-sm:leading-[16px]"}`} onClick={() => setTags('new-arrivals')}>New Arrivals</li>
            <li className={`cursor-pointer ${tags === "sale" && "text-green-500 max-sm:text-[14px] max-sm:leading-[16px]"}`} onClick={() => setTags("sale")}>Sale</li>
          </ul>
          <div className='flex max-sm:justify-center sm:justify-between gap-5 flex-wrap'>
            {products ? products.map((item: ProductType) => <ProductsList key={item.product_id} item={item} />) : "Empty..."}
          </div>
        </div>
        <div className="max-sm:hidden flex justify-end p-10">
          <Pagination onChange={(e) => setPage(e)} color='success' size='lg' initialPage={page} total={totalPage / 6} />
        </div>
      </section>
      <section className='max-sm:hidden'><Sale /></section>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white p-4 shadow-lg">
        <ul className='flex justify-around'>
          <li>
            <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/'}><HomeIcon /></Link>
          </li>
          <li>
            <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'#'}><Likes /></Link>
          </li>
          <li>
            <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/shop/shopping-cart'}><Korzina /></Link>
          </li>
          <li>
            <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'#'}><Profile /></Link>
          </li>
        </ul>
      </div>
      <section className='max-sm:hidden'><BlogPosts /></section>
    </div>
  )
}

export default HomePage