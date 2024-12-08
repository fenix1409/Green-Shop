"use client"
import { ShowIcon } from '@/public/icons/Icons'
import React, { useState } from 'react'

interface InputType {
    placeholder: string
    name:string
    extraStyle:string
    type:"text" | "password" | "email" | "number"
}
const Input:React.FC<InputType> = ({name, placeholder, extraStyle, type}) => {
    const [showPass, setShowPass] = useState<boolean>(false)
  return (
    <label className='relative'>
        <input className={`${extraStyle} w-full pl-[14px] py-3 rounded-md outline-none focus:border-[#46A358] border-[1px] border-[#EAEAEA]`} required type={type == "password" ? (showPass ? "text" : "password"): type} placeholder={placeholder} name={name}/>
        {type == "password" &&
          <div onClick={() => setShowPass(!showPass)} className="flex items-center justify-center absolute top-0 right-[10px] cursor-pointer">
            <button type='button' className={`${showPass ? "" : "hidden"}`}><ShowIcon/></button>
            <button type='button' className={`${showPass ? "hidden" : ""}`}><ShowIcon/></button>
          </div>
        }
    </label>
  )
}

export default Input