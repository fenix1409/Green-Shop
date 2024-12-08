"use client"
import React from 'react'
import Button from '../../components/Button'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='flex items-center justify-between p-10 bg-[#F5F5F580]'>
        <div className='w-[557px]'>
            <strong className='text-[14px] leading-[16px] font-medium text-[#3D3D3D] mb-[7px]'>Welcome to GreenShop</strong>
            <h1 className='text-[70px] leading-[70px] font-black text-[#3D3D3D] mb-[5px]'>Let’s Make aBetter <span className='text-[70px] leading-[70px] font-black text-[#46A358]'>Planet</span></h1>
            <p className='text-[14px] leading-[24px] text-[#727272] mb-[44px]'>We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!</p>
            <Button type='button' extraStyle='!w-[140px]' title='SHOP NOW'/>
        </div>
        <Image src={'/images/hero-img.png'} alt='image' width={518} height={518}/>
    </div>
  )
}

export default Hero