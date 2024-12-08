import React, { SetStateAction } from 'react'
import Button from '../Button'
import Input from '../Input'

interface LoginType{
    setIsLogin:React.Dispatch<SetStateAction<"login" | "register" | "verifyRegister" | "reset-password" | "forgotPassword">>
}
const LoginInputs:React.FC<LoginType> = ({setIsLogin}) => {
  return (
    <div>
        <p className='text-[13px] mb-[14px]'>Enter your username and password to login</p>
        <Input type="email" extraStyle='mt-[15px]' placeholder='enter email' name='email'/>
        <Input type="password" extraStyle='mt-[15px]' placeholder='enter password' name='password'/>
        <p onClick={() => setIsLogin("forgotPassword")} className='text-[14px] text-[#46A358] text-end mt-[14px] cursor-pointer'>Forgot Password?</p>
        <Button extraStyle='!w-full mt-[27px]' type='submit' title='Login'></Button>
    </div>
  )
}

export default LoginInputs