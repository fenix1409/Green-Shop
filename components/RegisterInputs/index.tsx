import React from 'react'
import Input from '../Input'
import Button from '../Button'

const RegisterInputs = () => {
  return (
    <div>
        <p className='text-[13px] mb-[14px]'>Enter your email and password to register.</p>
        <Input type="text" name='username' placeholder='Username' extraStyle='mt-[15px]'/>
        <Input type="email" name='email' placeholder='Enter your email address' extraStyle='mt-[15px]'/>
        <Input type="password" name='password' placeholder='Password' extraStyle='mt-[15px]'/>
        <Input type="password" name='confirm_password' placeholder='Confirm Password' extraStyle='mt-[15px]'/>
        <Button extraStyle='!w-full mt-[27px]' type='submit' title='Register'></Button>
    </div>
  )
}

export default RegisterInputs