"use client"
import { Context } from '@/context/AuthContext'
import { instance } from '@/hook/instance'
import { LikeIcon, SaveIcon } from '@/public/icons/Icons'
import { ProductType } from '@/service/Product'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useContext } from 'react'

const ProductsList: React.FC<{ item: ProductType }> = ({ item }) => {
  const queryClient = useQueryClient()
  const { token, setLikedList, likedList } = useContext(Context)

  const handleSave = () => {
    if (likedList.includes(item.product_id)) {
      // Agar mahsulot likedList'da bo'lsa, uni olib tashlash
      setLikedList(likedList.filter(id => id !== item.product_id))
    } else {
      // Aks holda, ro'yxatga qo'shish
      setLikedList([...likedList, item.product_id])
    }

    // Agar serverga yuborish kerak bo'lsa, quyidagi kodni ishlating:
    if (token) {
      likeMutation.mutate(item.product_id)
    }
  }

  const likeMutation = useMutation({
    mutationFn: (id: string) => instance().post(`/like/${id}`, {}, {
      headers: { "Authorization": `Bearer ${token}` }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const basketMutation = useMutation({
    mutationFn: (id: string) => instance().post(`/basket/${id}`, {}, {
      headers: { "Authorization": `Bearer ${token}` }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  return (
    <div className='w-[300px]'>
      <Image style={{ width: "258px", height: "300px" }} src={item.image_url ? item.image_url[0] : "/images/flower.png"} alt='image' width={258} height={300} priority />
      <div className="mt-[12px]">
        <h2 className='text-[16px] leading-[16px] text-[#3D3D3D] mb-[6px]'>{item.product_name}</h2>
        <div className="flex items-center gap-[17px]">
          <p className='text-[18px] leading-[16px] font-bold text-[#3D3D3D] line-through opacity-30'>{item.cost} $</p>
          {item.discount && <p className='text-[18px] leading-[16px] font-bold text-[#46A358]'>{item.discount} $</p>}
        </div>
      </div>
      <div className="space-x-2">
        <button onClick={() => token ? basketMutation.mutate(item.product_id) : {}} className={`text-[20px] font-bold ${item.liked && "text-red-500"}`}><LikeIcon/></button>
        <button onClick={handleSave} className={`text-[20px] font-bold ${item.basket && "text-green-500"}`}><SaveIcon/></button>
      </div>
    </div>
  )
}

export default ProductsList