"use client"
import Button from '@/components/Button'
import Carusel from '@/components/Carusel/Carusel'
import Modal from '@/components/Modal'
import { Context } from '@/context/AuthContext'
import { instance } from '@/hook/instance'
import { Arrow, DeleteIcon } from '@/public/icons/Icons'
import { ProductType } from '@/service/Product'
import { decrement, increment } from '@/store/counterSlice'
import { RootState } from '@/store/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const page = () => {
    const { token } = useContext(Context)
    const queryClient = useQueryClient()
    const router = useRouter()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const dispatch = useDispatch()
    const count = useSelector((state: RootState) => state.order.items)

    queryClient.invalidateQueries({ queryKey: ['product'] })
    queryClient.invalidateQueries({ queryKey: ['basket_get_all'] })

    // get all part 
    const { data = [] } = useQuery({
        queryKey: ['basket_get_all'],
        queryFn: () => token ? instance().get(`/basket`, {
            headers: { 'Authorization': `Bearer ${token}` },
            params: { page: 1, limit: 1000 }
        }).then(res => res.data.ProductId) : [],
    })
    const [basketProducts, setBasketProducts] = useState<ProductType[]>([])

    useEffect(() => {
        if (data.length > 0) {
            const updatedProducts = data.map((item: ProductType) => {
                item.count = count[item.product_id] || 1
                item.totalPrice = item.count * item.cost
                return item
            })
            setBasketProducts(updatedProducts)
        }
    }, [data, count])
    // get all part 

    // delete part 
    const deleteProduct = useMutation({
        mutationFn: (data: { productId: string }) => instance().post(`/basket`, data, {
            headers: { "Authorization": `Bearer ${token}` }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] })
            queryClient.invalidateQueries({ queryKey: ['basket_get_all'] })
        }
    })

    function handleDeleteProduct(productId: string) {
        const data = { productId }
        deleteProduct.mutate(data)
    }
    // delete part 

    // increment part 
    const handleIncrement = (productId: string) => {
        setBasketProducts(item => item.map(product =>
            product.product_id === productId ? { ...product, count: product.count + 1, totalPrice: (product.count + 1) * product.cost } : product)
        )
        dispatch(increment(productId))
    }

    const handleDecrement = (productId: string) => {
        setBasketProducts(price => price.map(product =>
            product.product_id === productId && product.count > 1 ? { ...product, count: product.count - 1, totalPrice: (product.count - 1) * product.cost } : product)
        )
        dispatch(decrement(productId))
    }
    // increment part 


    // subtotal fixed  part 
    const shiping = 16
    const subtotal = useMemo(() => {
        return basketProducts.reduce((acc, item) => acc + (item.totalPrice || 0), 0)
    }, [basketProducts])
    // subtotal fixed  part

    // Order part 
    function handleOrderBtn() {
        toast.success('Successfully ordered!')
        setOpenModal(false)
    }
    // Order part 

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <div onClick={() => router.push('/')}><Arrow /></div>
            <div className='max-sm:flex-col flex justify-between mb-[87px]'>
                <div className='max-sm:w-full sm:w-[70%]'>
                    <div className='max-sm:hidden flex items-center font-bold text-[#3D3D3D] text-[16px] leading-[16px] border-b-[1px] pb-[11px]'>
                        <div className='w-[20%] text-start'>Products</div>
                        <div className='w-[20%] text-center'>Price</div>
                        <div className='w-[20%] text-center'>Quantity</div>
                        <div className='w-[20%] text-center'>Total</div>
                    </div>
                    <ul>
                        {basketProducts.map((item: ProductType) => (
                            <li key={item.product_id} className="max-sm:w-full flex items-center bg-[#FBFBFB] mt-[10px]">
                                <div className='w-[20%] text-center flex items-center gap-[14px]'>
                                    <Image src={item.image_url[0]} alt='product image' width={77} height={77} priority />
                                    <div className="flex-col">
                                        <div className="text-[16px] leading-[16px] font-medium text-[#3D3D3D]">{item.product_name}</div>
                                        <div className="text-[14px] leading-[16px] text-[#727272]">SKU: 1995751877966</div>
                                    </div>
                                </div>
                                <div className='w-[20%] text-center text-[16px] leading-[16px] font-medium text-[#727272]'>{item.cost}.00$</div>
                                <div className='w-[20%] text-start flex items-center justify-center gap-[11px]'>
                                    <button onClick={() => handleDecrement(item.product_id)} className="w-[38px] flex items-center justify-center rounded-full border-[2px] border-[#46A358] text-[#46A358] text-[16px]">-</button>
                                    <strong className='text-[16px] leading-[16px] font-medium text-[#727272]'>{item.count}</strong>
                                    <button onClick={() => handleIncrement(item.product_id)} className="w-[38px] flex items-center justify-center rounded-full border-[2px] border-[#46A358] text-[#46A358] text-[16px]">+</button>
                                </div>
                                <div className='w-[20%] text-center text-[16px] leading-[16px] font-bold text-[#46A358]'>{item.totalPrice}.00$</div>
                                <button onClick={() => handleDeleteProduct(item.product_id)}><DeleteIcon /></button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="max-sm:w-full sm:w-[25%] max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:bg-white max-sm:p-4 max-sm:shadow-2xl rounded-t-[40px]">
                    <h2 className='max-sm:hidden text-[18px] leading-[16px] font-bold text-[#3D3D3D] pb-[11px] border-b-[1px]'>Cart Totals</h2>
                    <strong className='max-sm:hidden text-[14px] leading-[16px] text-[#3D3D3D] mt-[11px] inline-block mb-2'>Coupon Apply</strong>
                    <label className='relative flex items-center flex-row-reverse mb-[30px]'>
                        <input className={`max-sm:w-full sm:w-[360px] pl-[9px] py-[13px] max-sm:rounded-[40px] sm:rounded-md outline-none focus:border-[#46A358] border-[1px] border-[#EAEAEA]`} required placeholder="Enter coupon code here..." />
                        <Button extraStyle='py-[12px] w-[102px] absolute h-[49px] max-sm:rounded-[40px]' title='Apply' type='button' />
                    </label>
                    <div className="max-sm:flex max-sm:items-start max-sm:flex-col space-y-[15px] text-center">
                        <div className="flex items-center gap-[190px]">
                            <strong className='text-[15px] leading-[16px] text-[#3D3D3D]'>Subtotal</strong>
                            <strong className='text-[15px] leading-[16px] text-[#3D3D3D]'>{subtotal}.00$</strong>
                        </div>
                        <div className="flex items-center gap-[151px]">
                            <strong className='text-[15px] leading-[16px] text-[#3D3D3D]'>Coupon Discount</strong>
                            <strong className='text-[15px] leading-[16px] text-[#3D3D3D]'>(-) 00.00</strong>
                        </div>
                        <div className="flex items-center gap-[225px]">
                            <strong className='text-[15px] leading-[16px] text-[#3D3D3D]'>Shiping</strong>
                            <strong className='text-[15px] leading-[16px] text-[#3D3D3D]'>{shiping}.00$</strong>
                        </div>
                        <div className="flex items-center gap-[211px] pb-[14px]">
                            <strong className='text-[16px] leading-[16px] text-[#3D3D3D] font-bold'>Total</strong>
                            <strong className='max-sm:text-[16px] sm:text-[18px] leading-[16px] text-[#46A358] font-bold'>{subtotal + shiping}.00$</strong>
                        </div>
                        <Button onClick={() => setOpenModal(true)} title='Procced' type='button' extraStyle='max-sm:w-full max-sm:rounded-[40px] sm:w-[332px] py-[12px]' />
                        <button className='max-sm:hidden text-[15px] leading-[16px] text-[#46A358]'>Continue Shopping</button>
                    </div>
                </div>
            </div>
            <div className={`max-sm:hidden ${openModal ? 'hidden' : ''}`}>
                <Carusel />
            </div>
            <Modal isOpen={openModal} setIsOpen={setOpenModal} width={700}>
                <div className=' mx-auto'>
                    <div className='flex items-center justify-around font-bold text-[#3D3D3D] text-[16px] leading-[16px] border-b-[1px] pb-[11px]'>
                        <div className='w-[20%] text-start'>Products</div>
                        <div className='w-[20%] text-center'>Quantity</div>
                        <div className='w-[20%] text-center'>Total</div>
                    </div>
                    <ul>
                        {basketProducts.map((item: ProductType) => (
                            <li key={item.product_id} className="flex items-center bg-[#FBFBFB] mt-[10px]">
                                <div className='w-[34%] text-center flex items-center gap-[14px]'>
                                    <Image src={item.image_url[0]} alt='product image' width={77} height={77} priority />
                                    <div className="flex-col">
                                        <div className="text-[16px] leading-[16px] font-medium text-[#3D3D3D]">{item.product_name}</div>
                                    </div>
                                </div>
                                <div className='w-[34%] text-start flex items-center justify-center gap-[11px]'>
                                    <strong className='text-[16px] leading-[16px] font-medium text-[#727272]'>(x{item.count})</strong>
                                </div>
                                <div className='w-[34%] text-center text-[16px] leading-[16px] font-bold text-[#46A358]'>{item.totalPrice}.00$</div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-around gap-[225px] mt-[20px] mb-[25px]">
                        <strong className='text-[15px] leading-[16px] text-[#3D3D3D]'>Shiping</strong>
                        <strong className='text-[15px] leading-[16px] text-[#3D3D3D]'>{shiping}.00$</strong>
                    </div>
                    <div className="flex items-center gap-[211px] justify-around pb-[21px] border-b-[1px]">
                        <strong className='text-[16px] leading-[16px] text-[#3D3D3D] font-bold'>Total</strong>
                        <strong className='text-[18px] leading-[16px] text-[#46A358] font-bold'>{subtotal + shiping}.00$</strong>
                    </div>
                    <p className='text-[14px] leading-[22px] text-[#727272] mb-[49px] w-[483px] text-center mt-[18px]'>Your order is currently being processed. You will receive an order confirmation email shortly with the expected delivery date for your items.</p>
                    <Button onClick={handleOrderBtn} title='Track your order' type='button' extraStyle='w-[162px] mx-auto' />
                </div>
            </Modal>
        </div>
    )
}

export default page