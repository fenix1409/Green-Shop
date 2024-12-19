import { ArrowIcon } from '@/public/icons/Icons'
import Image from 'next/image'
import React from 'react'

const BlogPosts = () => {
    return (
        <div className="">
            <h2 className='text-[30px] leading-[16px] font-bold text-[#3D3D3D] mb-[15px] text-center'>Our Blog Posts</h2>
            <p className='text-[14px] leading-[24px] text-[#727272] mb-[35px] text-center'>We are an online plant shop offering a wide range of cheap and trendy plants. </p>
            <ul className='flex items-center justify-center gap-[43px]'>
                <li className='w-[268px]'>
                    <Image src={'/images/1.png'} alt='image' width={268} height={195} style={{width:"268", height:"195"}} priority/>
                    <div className="bg-[#FBFBFB] p-[12px]">
                        <span className='text-[14px] leading-[16px] font-medium text-[#46A358] mb-1'>September 12  I Read in 6 minutes</span>
                        <h3 className='text-[20px] leading-[26px] font-bold text-[#3D3D3D] mb-1'>Cactus & Succulent Care Tips</h3>
                        <p className='text-[14px] leading-[22px] text-[#727272] mb-[9px]'>Cacti are succulents are easy care plants for any home or patio. </p>
                        <button className='flex items-center gap-[3px] text-[14px] leading-[16px] font-medium text-[#3D3D3D] hover:text-[#46A358]'>Read more <ArrowIcon/></button>
                    </div>
                </li>
                <li className='w-[268px]'>
                    <Image src={'/images/2.png'} alt='image' width={268} height={195} style={{width:"268", height:"195"}} priority/>
                    <div className="bg-[#FBFBFB] p-[12px]">
                        <span className='text-[14px] leading-[16px] font-medium text-[#46A358] mb-1'>September 13  I Read in 2 minutes</span>
                        <h3 className='text-[20px] leading-[26px] font-bold text-[#3D3D3D] mb-1'>Top 10 Succulents for Your Home</h3>
                        <p className='text-[14px] leading-[22px] text-[#727272] mb-[9px]'>Top 10 Succulents for Your Home</p>
                        <button className='flex items-center gap-[3px] text-[14px] leading-[16px] font-medium text-[#3D3D3D] hover:text-[#46A358]'>Read more <ArrowIcon/></button>
                    </div>
                </li>
                <li className='w-[268px]'>
                    <Image src={'/images/3.png'} alt='image' width={268} height={195} style={{width:"268", height:"195"}} priority/>
                    <div className="bg-[#FBFBFB] p-[12px]">
                        <span className='text-[14px] leading-[16px] font-medium text-[#46A358] mb-1'>September 15  I Read in 3 minutes</span>
                        <h3 className='text-[20px] leading-[26px] font-bold text-[#3D3D3D] mb-1'>Cacti & Succulent Care Tips</h3>
                        <p className='text-[14px] leading-[22px] text-[#727272] mb-[9px]'>Cacti are succulents are easy care plants for any home or patio. </p>
                        <button className='flex items-center gap-[3px] text-[14px] leading-[16px] font-medium text-[#3D3D3D] hover:text-[#46A358]'>Read more <ArrowIcon/></button>
                    </div>
                </li>
                <li className='w-[268px]'>
                    <Image src={'/images/4.png'} alt='image' width={268} height={195} style={{width:"268", height:"195"}} priority/>
                    <div className="bg-[#FBFBFB] p-[12px]">
                        <span className='text-[14px] leading-[16px] font-medium text-[#46A358] mb-1'>September 15  I Read in 2 minutes</span>
                        <h3 className='text-[20px] leading-[26px] font-bold text-[#3D3D3D] mb-1'>Best Houseplants Room by Room</h3>
                        <p className='text-[14px] leading-[22px] text-[#727272] mb-[9px]'>The benefits of houseplants are endless. In addition to..</p>
                        <button className='flex items-center gap-[3px] text-[14px] leading-[16px] font-medium text-[#3D3D3D] hover:text-[#46A358]'>Read more <ArrowIcon/></button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default BlogPosts