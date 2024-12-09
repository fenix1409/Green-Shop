"use client"
import { Product } from '@/service/Product'
import Image from 'next/image'
import React from 'react'

const ProductsList = () => {
  const products = Product()
  // console.log(products.image_url);
  
  return (
    <div className='ml-[50px]'>
      <ul className='flex items-center gap-[33px] flex-wrap'>
        {products.map(item => (
          <li key={item.product_id} className='w-[258px]'>
            {/* <Image style={{width:"258px", height:"300px"}} src={item.image_url[0]} alt='image' width={258} height={300} /> */}
            <div className="mt-[12px]">
              <h2 className='text-[16px] leading-[16px] text-[#3D3D3D] mb-[6px]'>{item.product_name}</h2>
              <div className="flex items-center gap-[17px]">
                <p className='text-[18px] leading-[16px] font-bold text-[#3D3D3D] line-through opacity-30'>{item.cost} $</p>
                <p className='text-[18px] leading-[16px] font-bold text-[#46A358]'>{item.discount} $</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsList