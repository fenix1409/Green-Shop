"use client"
import Button from '@/components/Button'
import Carusel from '@/components/Carusel/Carusel'
import { Context } from '@/context/AuthContext'
import debounce from '@/hook/debounce'
import { instance } from '@/hook/instance'
import { Facebook1, Korzina, LikeIcon, LinkedIn1, Messege, Twitter1 } from '@/public/icons/Icons'
import { Product, ProductType } from '@/service/Product'
import { decrement, increment } from '@/store/counterSlice'
import { RootState } from '@/store/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const page = () => {
  const { id }: any = useParams()
  const queryClient = useQueryClient()
  const { token } = useContext(Context)
  const dispatch = useDispatch()
  const count = useSelector((state: RootState) => state.order.items)

  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(10)
  const [price, setPrice] = useState<number[] | number>([39, 1230])
  const fullPrice = debounce(price, 1000)
  const [categoryName, setCategoryName] = useState<string | null>(null)
  const [tags, setTags] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const products: ProductType[] = Product(categoryName, tags, page, setTotalPage, fullPrice, size)

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
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const saveMutation = useMutation({
    mutationFn: (data: { productId: string }) => instance().post(`/basket`, data, {
      headers: { "Authorization": `Bearer ${token}` }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['basket_list'] })
    }
  })

  function handleSaveBtnClick(productId: string) {
    if (!token) {
      alert("Logindan o'tish kerak!")
    }
    else {
      const data = { productId }
      saveMutation.mutate(data)
    }
  }
  // basket part 

  // size part 
  const { data } = useQuery({
    queryKey: ['single_product'],
    queryFn: () => instance().get(`/product/${id}`).then(res => res.data)
  })

  function handleSizeClick(size: string) {
    setSelectedSize((item) => (item === size ? null : size));
  }
  // size part 

  return (
    <div className='max-sm:pb-0 sm:pb-[95px] max-sm:px-0 sm:px-8'>
      {data && (
        <div className="">
          <div className="max-sm:flex-col sm:flex items-center gap-[81px] mb-[95px]">
            <Image style={{ width: "444px", height: "444px" }} src={data.image_url[0]} alt='flower image' className='max-sm:356px max-sm:h-[356px]' width={444} height={444} priority />
            <div className='max-sm:w-full sm:w-[574px]'>
              <h1 className='max-sm:text-[20px] sm:text-[28px] leading-[16px] font-bold text-[#3D3D3D] mb-[21px]'>{data.product_name}</h1>
              <div className="flex items-center justify-between pb-[13px] border-[#46A35880] max-sm:border-none sm:border-b-[1px]">
                <p className='max-sm:text-[20px] sm:text-[22px] leading-[16px] font-bold text-[#46A358]'>{data.discount ? data.discount : data.cost} $</p>
                <Image className='max-sm:hidden' style={{ width: "239px", height: "16px" }} src={'/images/star.svg'} alt='star img' width={239} height={16} />
              </div>
              <strong className='text-[15px] leading-[16px] font-bold text-[#3D3D3D] mt-[15px] mb-[10pxs] inline-block'>Short Description:</strong>
              <p className='text-[14px] leading-[24px] mb-[24px] text-[#727272]'>{data.short_description}</p>
              <strong className='text-[15px] leading-[16px] font-bold text-[#3D3D3D] mb-[11px]'>Size:</strong>
              <div className="flex items-center gap-[10px]">
                <button onClick={() => handleSizeClick("S")} className={`w-[28px] p-2 flex justify-center text-[18px] leading-[16px] ${selectedSize === "S" ? "text-[#46A358] border-[#46A358]" : "text-[#727272] border-[#EAEAEA]"} rounded-full border-[1px]`}>S</button>
                <button onClick={() => handleSizeClick("M")} className={`w-[28px] p-2 flex justify-center text-[18px] leading-[16px] ${selectedSize === "M" ? "text-[#46A358] border-[#46A358]" : "text-[#727272] border-[#EAEAEA]"} rounded-full border-[1px]`}>M</button>
                <button onClick={() => handleSizeClick("L")} className={`w-[28px] p-2 flex justify-center text-[18px] leading-[16px] ${selectedSize === "L" ? "text-[#46A358] border-[#46A358]" : "text-[#727272] border-[#EAEAEA]"} rounded-full border-[1px]`}>L</button>
                <button onClick={() => handleSizeClick("XL")} className={`w-[28px] p-2 flex justify-center text-[18px] leading-[16px] ${selectedSize === "XL" ? "text-[#46A358] border-[#46A358]" : "text-[#727272] border-[#EAEAEA]"} rounded-full border-[1px]`}>XL</button>
              </div>
              <div className="max-sm:flex-col sm:flex items-center gap-[26px] mt-[23px]">
                <div className="flex items-center gap-[23px]">
                  <button onClick={() => dispatch(decrement(id))} className="w-[38px] flex items-center justify-center rounded-full border-[2px] border-[#46A358] text-[#46A358] text-[16px]">-</button>
                  <strong className='text-[20px] leading-[10px] text-[#3D3D3D]'>{count[id] || 0}</strong>
                  <button onClick={() => dispatch(increment(id))} className="w-[38px] flex items-center justify-center rounded-full border-[2px] border-[#46A358] text-[#46A358] text-[16px]">+</button>
                </div>
                <div className="flex items-center gap-[10px]">
                  <Button title='Buy now' type='button' extraStyle='max-sm:w-[196px] sm:w-[130px]' />
                  <button onClick={() => handleSaveBtnClick(data.product_id)} className={`max-sm:hidden w-[130px] bg-transparent text-[#46A358] border-[1px] border-[#46A358] py-[7px] rounded-md px-[17px] font-medium text-[16px] flex items-center justify-center gap-[4px]`}>Add to cart</button>
                  <button onClick={() => handleSaveBtnClick(data.product_id)} className='bg-[#F6F6F6] p-[20px] rounded-[40px] max-sm:block sm:hidden'><Korzina /></button>
                  <button onClick={() => handleLikeBtnClick(data.product_id)} className={`max-sm:hidden text-[20px] font-bold border-[1px] border-[#46A358] rounded-md p-[10px] ${data.liked ? "text-red-500 border-red-500" : ""}`}><LikeIcon /></button>
                </div>
              </div>
              <div className="space-y-[11px] mt-[24px]">
                <p className='text-[15px] leading-[16px] text-[#727272]'>SKU: 1995751877966</p>
                <p className='text-[15px] leading-[16px] text-[#727272]'>Categories: {data.product_status}</p>
                <p className='text-[15px] leading-[16px] text-[#727272]'>Tags: {data.tags[0 && 1]}</p>
                <div className="max-sm:hidden sm:flex items-center gap-[20px]">
                  <strong className='text-[16px] leading-[16px] font-bold'>Share this products:</strong>
                  <Link href={'#'}><Facebook1 /></Link>
                  <Link href={'#'}><Twitter1 /></Link>
                  <Link href={'#'}><LinkedIn1 /></Link>
                  <Link href={'#'}><Messege /></Link>
                </div>
              </div>
            </div>
          </div>
          <div className='max-sm:hidden mb-[127px]'>
            <h2 className='text-[17px] leading-[16px] font-bold text-[#46A358] border-b-[1px] pb-[12px] border-[#46A35880]'>Product Description</h2>
            <p className='text-[14px] leading-[24px] text-[#727272]'>{data.product_description}</p>
          </div>
          <div className="max-sm:hidden mb-[128px]">
            <h2 className='text-[17px] leading-[16px] font-bold text-[#46A358] pb-[12px] border-b-[1px] border-[#46A35880]'>Releted Products</h2>
            <div className='flex justify-between gap-[26px]'>
              <Carusel />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default page