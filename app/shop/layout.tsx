"use client"
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout:React.FC<{children:ReactNode}> = ({children}) => {
    const path = usePathname()
    
    
  return (
    <div className='p-8 bg-white'>
        <div className='max-sm:hidden text-[15px] leading-[16px] font-bold mb-[43px]'>Home / Shop {path?.includes("shopping-cart") && "/ Shopping Cart"}</div>
        {children}
    </div>
  )
}

export default layout