"use client"
import React, { FormEvent, useContext, useState } from 'react'
import Button from './Button'
import { Basket, LoginIcon, Logo, Lupa, More } from '@/public/icons/Icons'
import { instance } from '@/hook/instance'
import Modal from './Modal'
import LoginInputs from './LoginInputs'
import RegisterInputs from './RegisterInputs'
import VerifyRegister from './RegisterInputs/VerifyRegister'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Link from 'next/link'
import { Context } from '@/context/AuthContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Badge } from '@nextui-org/badge'
import { useRouter } from 'next/navigation'
import Input from './Input'

const Header = () => {
    const { token } = useContext(Context)
    const [registerEmail, setRegisterEmail] = useState<string>("")
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const { setToken } = useContext(Context)
    const queryClient = useQueryClient()
    const router = useRouter()
    const [isLogin, setIsLogin] = useState<"login" | "register" | "verifyRegister" | "reset-password" | "forgotPassword">("login")
    const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false)

    function loginSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (isLogin == "login") {
            const data = {
                password: (e.target as HTMLFormElement).password.value,
                usernameoremail: (e.target as HTMLFormElement).email.value
            }
            instance().post("/login", data).then((res) => {
                setLoginModal(false)
                setToken(res.data.access_token)
                queryClient.invalidateQueries({ queryKey: ['products'] })
            })
        }
        else if (isLogin == "register") {
            const data = {
                firstName: (e.target as HTMLFormElement).username.value,
                lastName: (e.target as HTMLFormElement).username.value,
                email: (e.target as HTMLFormElement).email.value,
                password: (e.target as HTMLFormElement).password.value
            }
            if ((e.target as HTMLFormElement).password.value == (e.target as HTMLFormElement).confirm_password.value) {
                instance().post("/register", data).then(() => {
                    setRegisterEmail(data.email)
                    setIsLogin("verifyRegister")
                })
            }
            else {
                alert("xatolik bor!")
            }
        }
        else if (isLogin == "verifyRegister") {
            const data = {
                email: registerEmail,
                code: (e.target as HTMLFormElement).code.value
            }
            instance().post("/users/verify", {}, {
                params: data
            }).then(() => setIsLogin("login"))
        }
        else if (isLogin == "forgotPassword") {
            const email = (e.target as HTMLFormElement).email.value
            instance().post(`/forgot/${email}`, {}).then(() => {
                setRegisterEmail(email)
                setIsLogin("reset-password")
            })
        }
        else if (isLogin == "reset-password") {
            const data = {
                email: registerEmail,
                new_password: (e.target as HTMLFormElement).password.value,
                otp: (e.target as HTMLFormElement).otp.value
            }
            instance().put(`/reset-password`, data).then(() => setIsLogin("login"))
        }
    }

    // liked product 
    // const getLikedList = async () => {
    //     const data = await instance().get('/wishlist', {
    //         headers: {"Authorization" : `Bearer ${token}`},
    //         params:{page:1,limit:1000}
    //     }).then(res => res.data)
    //     return data
    // }

    // const {data:LikedProducts} = useQuery({
    //     queryKey:['liked_list'],
    //     queryFn: () => token ? getLikedList() : {}
    // })
    // liked product 

    // Saved basket 
    const { data: BasketProducts = [] } = useQuery({
        queryKey: ['basket_list'],
        queryFn: () => token ? instance().get(`/basket`, {
            headers: { 'Authorization': `Bearer ${token}` },
            params: { page: 1, limit: 1000 }
        }).then(res => res.data.ProductId) : []
    })
    // Saved basket 

    return (
        <header className='p-10 flex items-center max-sm:justify-center sm:justify-between bg-white'>
            <div className='hidden sm:flex items-center justify-between w-full'>
                <Logo />
                <ul className='flex items-center gap-[50px]'>
                    <li>
                        <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/shop'}>Shop</Link>
                    </li>
                    <li>
                        <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/plant-care'}>Plant Care</Link>
                    </li>
                    <li>
                        <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/blogs'}>Blogs</Link>
                    </li>
                </ul>
                <div className="flex items-center gap-[30px]">
                    <div className="cursor-pointer"><Lupa /></div>
                    <button onClick={() => router.push('/shop/shopping-cart')}>
                        <Badge color='success' content={token ? (BasketProducts.length ? BasketProducts.length : "") : ""}><Basket /></Badge>
                    </button>
                    <Button onClick={() => setLoginModal(true)} title='Login' type='button' leftIcon={<LoginIcon />} />
                </div>
            </div>
            <div className="flex items-center justify-center gap-[8px] sm:hidden">
                <Input extraStyle='!w-full' type='text' name='searchInput' placeholder='Find your plants' />
                <button onClick={() => setMoreMenuOpen(true)} className='bg-[#46A358] rounded-[14px] p-[11px]'><More /></button>
            </div>
            <Modal isOpen={loginModal} setIsOpen={setLoginModal} width={500}>
                <ul className='flex items-center justify-center gap-3 mb-[53px]'>
                    <li onClick={() => setIsLogin("login")} className={`${isLogin == "login" && "text-[#46A358]"} font-medium text-[20px] cursor-pointer`}>Login</li>
                    <li className='w-[1px] h-[16px] bg-black'></li>
                    <li onClick={() => setIsLogin("register")} className={`${isLogin == "register" && "text-[#46A358]"} font-medium text-[20px] cursor-pointer`}>Register</li>
                </ul>
                <form onSubmit={loginSubmit} className='w-[300px] mx-auto'>
                    {isLogin == "login" && <LoginInputs setIsLogin={setIsLogin} />}
                    {isLogin == "register" && <RegisterInputs />}
                    {isLogin == "verifyRegister" && <VerifyRegister registerEmail={registerEmail} />}
                    {isLogin == "forgotPassword" && <ForgotPassword />}
                    {isLogin == "reset-password" && <ResetPassword />}
                </form>
            </Modal>
            <Modal isOpen={moreMenuOpen} setIsOpen={setMoreMenuOpen} width={300}>
                <ul className='flex flex-col items-center gap-4'>
                    <li>
                        <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/shop'}>Shop</Link>
                    </li>
                    <li>
                        <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/plant-care'}>Plant Care</Link>
                    </li>
                    <li>
                        <Link className='text-[16px] leading-[20px] font-bold text-[#3D3D3D]' href={'/blogs'}>Blogs</Link>
                    </li>
                </ul>
                <div onClick={() => router.push('/shop/shopping-cart')} className="text-[16px] leading-[20px] font-bold text-[#3D3D3D] text-center mt-2">Shopping-Cart</div>
                <Button extraStyle='max-sm:mx-auto mt-3' onClick={() => setLoginModal(true)} title='Login' type='button' leftIcon={<LoginIcon />} />
            </Modal>
        </header>
    )
}

export default Header