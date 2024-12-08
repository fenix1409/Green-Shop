import React from 'react'
import Input from '../Input'
import Button from '../Button'

const ResetPassword = () => {
  return (
    <div>
        <Input extraStyle='mt-[15px]' type="password" name='password' placeholder='Enter password'/>
        <Input extraStyle='mt-[15px]' type="text" name='otp' placeholder='Enter code'/>
        <Button extraStyle='!w-full mt-[27px]' type='submit' title='Get code'></Button>
    </div>
  )
}

export default ResetPassword