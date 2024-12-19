import Image from 'next/image'
import React from 'react'
import Button from './Button'
import { Facebook, Insta, LinkedIn, LocationIcon, Logo, MessegeIcon, PhoneIcon, Plant, Twitter, Youtube } from '@/public/icons/Icons'

const Footer = () => {
    return (
        <div className='px-10 max-sm:hidden'>
            <footer className='p-10'>
                <div className="p-[25px] bg-[#FBFBFB] flex items-center gap-[80px]">
                    <div className="w-[204px]">
                        <div className="mb-[18px]"><Plant /></div>
                        <strong className='text-[17px] leading-[16px] font-bold mb-[9px] text-[#3D3D3D]'>Garden Care</strong>
                        <p className='text-[14px] leading-[22px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
                    </div>
                    <div className="w-[223px] px-[26px] border-x-1 border-[#46A3581A]">
                        <div className="mb-[18px]"><Plant /></div>
                        <strong className='text-[17px] leading-[16px] font-bold mb-[9px] text-[#3D3D3D]'>Plant Renovation</strong>
                        <p className='text-[14px] leading-[22px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
                    </div>
                    <div className="w-[204px]">
                        <div className="mb-[18px]"><Plant /></div>
                        <strong className='text-[17px] leading-[16px] font-bold mb-[9px] text-[#3D3D3D]'>Watering Graden</strong>
                        <p className='text-[14px] leading-[22px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
                    </div>
                    <div className="w-[354px]">
                        <strong className='text-[18px] leading-[16px] font-bold mb-[18px] inline-block'>Would you like to join newsletters?</strong>
                        <label className='relative flex items-center flex-row-reverse mb-[17px]'>
                            <input className={`w-[354px] pl-[14px] py-3 rounded-md outline-none focus:border-[#46A358] border-[1px] border-[#EAEAEA]`} required placeholder="enter your email address..." />
                            <Button extraStyle='py-[12px] w-[87px] absolute h-[48px]' title='Join' type='button' />
                        </label>
                        <p className='text-[13px] leading-[22px] text-[#727272]'>We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours! </p>
                    </div>
                </div>
                <div className="flex items-center gap-[70px] pt-[25px] pb-[19px] bg-[#46A3581A] pl-[23px]">
                    <Logo />
                    <div className="flex items-center gap-[9px]">
                        <LocationIcon />
                        <p className='text-[14px] leading-[22px] text-[#3D3D3D]'>70 West Buckingham Ave. Farmingdale, NY 11735</p>
                    </div>
                    <div className="flex items-center gap-[9px]">
                        <MessegeIcon />
                        <a href='mailto:contact@greenshop.com' className='text-[14px] leading-[22px] text-[#3D3D3D] cursor-pointer'>contact@greenshop.com</a>
                    </div>
                    <div className="flex items-center gap-[9px]">
                        <PhoneIcon />
                        <a className='text-[14px] leading-[22px] text-[#3D3D3D] cursor-pointer' href="tel:+8801911717490">+88 01911 717 490</a>
                    </div>
                </div>
                <div className="bg-[#FBFBFB] flex items-start gap-[180px] p-[25px]">
                    <ul className='flex flex-col space-y-2'>
                        <strong className='text-[18px] leading-[16px] font-bold text-[#3D3D3D]'>My Account</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>My Account</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Our stores</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Contact us</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Career</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Specials</strong>
                    </ul>
                    <ul className='flex flex-col space-y-2'>
                        <strong className='text-[18px] leading-[16px] font-bold text-[#3D3D3D]'>Help & Guide</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Help center</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>How to buy</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Shipping & Delivery</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Products Policy</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>How to return</strong>
                    </ul>
                    <ul className='flex flex-col space-y-2'>
                        <strong className='text-[18px] leading-[16px] font-bold text-[#3D3D3D]'>Categories</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>House Plants</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Potter Plants</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Seeds</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Small plants</strong>
                        <strong className='text-[14px] leading-[30px] text-[#727272]'>Accessories</strong>
                    </ul>
                    <div>
                        <strong className='text-[18px] leading-[16px] font-bold text-[#3D3D3D] mb-5 inline-block'>Social Media</strong>
                        <div className="flex items-center gap-[10px] mb-[33px]">
                            <a href="#"><Facebook /></a>
                            <a href="#"><Insta /></a>
                            <a href="#"><Twitter /></a>
                            <a href="#"><LinkedIn /></a>
                            <a href="#"><Youtube /></a>
                        </div>
                        <strong className='text-[18px] leading-[16px] font-bold text-[#3D3D3D] mb-[13px] inline-block'>We accept</strong>
                        <Image style={{ width: "224px", height: "26px" }} src={'/images/accept.png'} alt='image' width={224} height={26} priority/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer