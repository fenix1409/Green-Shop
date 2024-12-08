import React from 'react'
import Button from '../Button'

interface VerifyRegisterType {
  registerEmail:string
}
const VerifyRegister:React.FC<VerifyRegisterType> = ({registerEmail}) => {
  return (
    <div>
        <p className='text-[13px] mb-[14px]'>Verify your email ({registerEmail})</p>
        <input type="text" name='code' className='mt-[15px]' placeholder='Enter Code'/>
        <Button extraStyle='!w-full mt-[27px]' type='submit' title='Verify'></Button>
    </div>
  )
}

export default VerifyRegister