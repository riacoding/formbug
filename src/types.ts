import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { z, ZodType } from 'zod' // Add new import

export type FormDataCustom = {
  name: string
  email: string
  subject: string
  message: string
}

export const ContactSchema: ZodType<FormDataCustom> = z.object({
  name: z.string().trim().min(3, { message: 'Name is too short' }),
  email: z.string().trim().email(),
  subject: z.string().trim(),
  message: z.string().trim().min(5, { message: 'Message is too short' }),
})

export type FormFieldProps = {
  displayRequired?: boolean
  type: string
  placeholder: string
  fieldname: ValidFieldNames
  register: UseFormRegister<FormDataCustom>
  error: FieldError | undefined
  valueAsNumber?: boolean
  value?: any
}

export type ValidFieldNames = 'name' | 'email' | 'subject' | 'message'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  displayRequired?: boolean
  fieldname: ValidFieldNames
  register: UseFormRegister<FormDataCustom>
  error: FieldError | undefined
}
