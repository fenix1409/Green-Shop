import Image from 'next/image'
import React from 'react'
import Button from './Button'
import { MoreIcon } from '@/public/icons/Icons'

const Sale = () => {
    return (
        <div className='p-10'>
            <ul className="flex items-center justify-between mb-[138px]">
                <div className='w-[586px] h-[250px] flex object-contain justify-between items-center bg-[#FBFBFB] px-[30px] py-[37px]'>
                    <Image style={{ width: "292px", height: "292px" }} src={'/images/succulents.png'} alt='image' priority width={292} height={292} />
                    <div>
                        <h2 className='text-[19px] leading-[24px] font-black mb-2'>Summer cactus & succulents</h2>
                        <p className='text-[14px] leading-[24px] text-[#727272] mb-[25px]'>We are an online plant shop offering a wide range of cheap and trendy plants</p>
                        <Button title='Find more' rightIcon={<MoreIcon />} type='button' extraStyle='w-[140px] p-3' />
                    </div>
                </div>
                <li className='w-[586px] h-[250px] flex items-center justify-between bg-[#FBFBFB] px-[30px] py-[37px]'>
                    <Image style={{ width: "292px", height: "292px", background: "transparent" }} src={'/images/trends.png'} alt='image' priority width={292} height={292} />
                    <div>
                        <h2 className='text-[19px] leading-[24px] font-black mb-2'>Summer cactus & succulents</h2>
                        <p className='text-[14px] leading-[24px] text-[#727272] mb-[25px]'>We are an online plant shop offering a wide range of cheap and trendy plants</p>
                        <Button title='Find more' rightIcon={<MoreIcon />} type='button' extraStyle='w-[140px] p-3' />
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Sale