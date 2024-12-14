"use client"
import { Context } from '@/context/AuthContext'
import { instance } from '@/hook/instance'
import { LikeIcon, SaveIcon } from '@/public/icons/Icons'
import { ProductType } from '@/service/Product'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useContext, useState } from 'react'

const ProductsList: React.FC<{ item: ProductType }> = ({ item }) => {
  const queryClient = useQueryClient()
  const { token } = useContext(Context)
  const [show, setShow] = useState<boolean>(false)

  // like part 
  const likeMutation = useMutation({
    mutationFn: (id: string) => instance().post(`/like/${id}`, {}, {
      headers: { "Authorization": `Bearer ${token}` }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  function handleLikeBtnClick(id: string) {
    if (!token) {
      alert("Logindan o'tish kerak!")
    }
    else {
      likeMutation.mutate(id)
    }
  }
  // like part 

  // basket part 
  const basketMutation = useMutation({
    mutationFn: (data: { productId: string }) => instance().post(`/basket`, data, {
      headers: { "Authorization": `Bearer ${token}` }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['basket_list'] })
    }
  })

  function handleBasketBtnClick(productId: string) {
    if (!token) {
      alert("Logindan o'tish kerak!")
    }
    else {
      const data = { productId }
      basketMutation.mutate(data)
    }
  }
  // basket part 

  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className='w-[300px] duration-300'>
      <div>
        <Image style={{ width: "258px", height: "300px" }} src={item.image_url ? item.image_url[0] : "/images/flower.png"} alt='image' width={258} height={300} priority />
        {show && (<div className="space-x-2">
          <button onClick={() => handleLikeBtnClick(item.product_id)} className={`text-[20px] font-bold ${item.liked ? "text-red-500" : ""}`}><LikeIcon /></button>
          <button onClick={() => handleBasketBtnClick(item.product_id)} className={`text-[20px] font-bold ${item.basket ? "text-green-500" : ""}`}><SaveIcon /></button>
        </div>)}
      </div>
      <div className="mt-[12px]">
        <h2 className='text-[16px] leading-[16px] text-[#3D3D3D] mb-[6px]'>{item.product_name}</h2>
        <div className="flex items-center gap-[17px]">
          <p className='text-[18px] leading-[16px] font-bold text-[#3D3D3D] line-through opacity-30'>{item.cost} $</p>
          {item.discount && <p className='text-[18px] leading-[16px] font-bold text-[#46A358]'>{item.discount} $</p>}
        </div>
      </div>
    </div>
  )
}

export default ProductsList