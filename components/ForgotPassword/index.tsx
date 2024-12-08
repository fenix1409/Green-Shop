import React from 'react'
import Input from '../Input'
import Button from '../Button'

const ForgotPassword = () => {
  return (
    <div>
        <Input extraStyle='mt-[15px]' type="email" name='email' placeholder='Enter email'/>
        <Button extraStyle='!w-full mt-[27px]' type='submit' title='Get code'></Button>
    </div>
  )
}

export default ForgotPassword