"use client"
import { Category } from '@/service/Category';
import React from 'react'

const CategoryList = () => {
    const categories = Category()
    return (
        <div className='w-[310px] p-[20px] bg-[#FBFBFB]'>
            <h2 className='text-[18px] leading-[16px] font-bold text-[#3D3D3D] mb-[7px]'>Categories</h2>
            <ul className='space-y-[15px]'>
                {categories.map(item => (
                    <li key={item.category_id} className='text-[15px] leading-[40px] text-[#3D3D3D]'>
                        {item.category_name}
                        <span className='text-[15px] leading-[40px] text-[#3D3D3D]'>(33)</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryList