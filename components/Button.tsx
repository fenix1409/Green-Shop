import React, { ReactNode } from 'react'

interface ButtonType {
    leftIcon?:ReactNode
    rightIcon?:ReactNode
    title:string
    extraStyle?:string
    onClick?:() => void
    type:"submit" | "button" | "reset"
}
const Button:React.FC<ButtonType> = ({leftIcon, rightIcon, title, extraStyle, onClick, type}) => {
  return (
    <button type={type} onClick={onClick} className={`${extraStyle} bg-[#46A358] text-white py-[7px] rounded-md px-[17px] font-medium text-[16px] flex items-center justify-center gap-[4px]`}>
        {leftIcon && leftIcon}
        <span>{title}</span>
        {rightIcon && rightIcon}
    </button>
  )
}

export default Button