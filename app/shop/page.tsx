"use client"
import Carusel from '@/components/Carusel/Carusel'
import React from 'react'

const page = () => {
  return (
    <div className="mb-[128px]">
      <h2 className='text-[17px] leading-[16px] font-bold text-[#46A358] pb-[12px] border-b-[1px] border-[#46A35880]'>Releted Products</h2>
      <div className='flex justify-between gap-[26px]'>
        <Carusel />
      </div>
    </div>
  )
}

export default page