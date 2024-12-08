"use client"
import React, { FormEvent, useState } from 'react'
import Button from './Button'
import { Basket, LoginIcon, Logo, Lupa } from '@/public/icons/Icons'
import { instance } from '@/hook/instance'
import Modal from './Modal'
import LoginInputs from './LoginInputs'
import RegisterInputs from './RegisterInputs'
import VerifyRegister from './RegisterInputs/VerifyRegister'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Link from 'next/link'

const Header = () => {
    const [registerEmail, setRegisterEmail] = useState<string>("")
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<"login" | "register" | "verifyRegister" | "reset-password" | "forgotPassword">("login")

    function loginSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (isLogin == "login") {
            const data = {
                password: (e.target as HTMLFormElement).password.value,
                usernameoremail: (e.target as HTMLFormElement).email.value
            }
            instance().post("/login", data).then(() => {
                setLoginModal(false)
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
                instance().post("register", data).then(() => {
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
                password: (e.target as HTMLFormElement).password.value,
                otp: (e.target as HTMLFormElement).otp.value
            }
            instance().put(`/reset-password`, data).then(() => setIsLogin("login"))
        }
    }

    return (
        <header className='p-10 flex items-center justify-between'>
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
                <div className="cursor-pointer"><Lupa/></div>
                <Link href={'/shop'}><Basket /></Link>
                <Button onClick={() => setLoginModal(true)} title='Login' type='button' leftIcon={<LoginIcon />} />
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
        </header>
    )
}

export default Header