"use client"
import React from 'react'
import Button from '../../components/Button'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='w-full flex items-center justify-between p-10 bg-[#F5F5F580] max-sm:bg-[url("/images/mobile-img.png")] max-sm:bg-cover max-sm:bg-center'>
        <div className='max-sm:w-[206px] sm:w-[557px] text-start'>
            <strong className='max-sm:text-[11px] sm:text-[14px] leading-[16px] font-medium text-[#3D3D3D] mb-[7px]'>Welcome to GreenShop</strong>
            <h1 className='max-sm:text-[24px] sm:text-[70px] max-sm:leading-[29px] sm:leading-[70px] font-black text-[#3D3D3D] mb-[5px]'>Let’s Make a Better <span className='max-sm:text-[24px] sm:text-[70px] max-sm:leading-[29px] sm:leading-[70px] font-black text-[#46A358]'>Planet</span></h1>
            <p className='max-sm:text-[12px] sm:text-[14px] max-sm:leading-[18px] sm:leading-[24px] text-[#727272] mb-[44px]'>We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!</p>
            <Button type='button' extraStyle='max-sm:!w-[86px] sm:!w-[140px] max-sm:text-[12px] max-sm:leading-[14px] max-sm:font-bold' title='SHOP NOW'/>
        </div>
        <Image className='max-sm:!hidden' style={{width:"518px", height:"518px"}} src={'/images/hero-img.png'} alt='image' width={518} height={518} priority/>
    </div>
  )
}

export default Hero