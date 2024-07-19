'use client'
import { useState, useEffect } from 'react'
import { FormFieldProps } from '@/types'
import { Input } from './input'

const FormField: React.FC<FormFieldProps> = ({
  displayRequired,
  placeholder,
  fieldname,
  register,
  error,
  value = '',
}) => {
  const [jsEnabled, setJsEnabled] = useState<boolean>(false)

  useEffect(() => {
    // This effect runs only if JavaScript is enabled
    setJsEnabled(true)
  }, [])
  return (
    <div>
      {displayRequired && <div className='ml-1 -mb-5 text-red-500'>*</div>}
      {jsEnabled ? (
        <Input placeholder={placeholder} {...register(fieldname)} />
      ) : (
        <Input placeholder={placeholder} {...register(fieldname)} defaultValue={value} />
      )}
      {error && <span className='text-red-500'>{error.message}</span>}
    </div>
  )
}
export default FormField
