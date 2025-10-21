import React from 'react'
import type { Color } from "../types/Color"
import { Loader } from '@mantine/core'
interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    id?: string,
    type?: "submit" | "reset" | "button",
    label?: string,
    color?: Color,
    isLoading?: boolean,
}

export default function ButtonCustom({
    label,
    color = 'default',
    className,
    isLoading = false,
    disabled,
    ...props
} : ButtonCustomProps) {

  return (
    <div className=''>
      {
        isLoading ? <Loader color="white" type='bars' size={'sm'}/> : label
      }
    </div>
  )
}
