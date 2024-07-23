'use client'
import React, { useRef, useTransition, useEffect, RefObject, FormEventHandler } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormDataCustom,ContactSchema } from '@/types'//

import FormField from './formField'
import { SubmitButton } from './submitButton'
import Textarea from './textarea'
import { sendMessage } from '@/app/contact/_actions'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
  message: '',
  errors: [],
  fields: {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
  issues: [],
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction] = useFormState(sendMessage, initialState)
  console.log(formAction)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formState,
    trigger,
    setError,
  } = useForm<FormDataCustom>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      subject: '',
      email: '',
      message: '',
      ...(state?.fields ?? {}),
    },
  })

  useEffect(() => {
    async function resetForm() {
      if (state.message === 'success') {
        await reset()
      }
    }

    resetForm()
  }, [state, reset])

  // Custom submit handler to access the event
  const onSubmit = async (
    data: FormDataCustom,
    event: React.BaseSyntheticEvent<object, any, any> | undefined,
    formRef: any
  ): Promise<void> => {
    event?.preventDefault()
    console.log('Form Data:', data)
    console.log('Form Event:', event) // Access the event object

    const isValid = await trigger() // Perform async validation
    //debugger
    if (isValid) {
      // Manual form submission
      // formRef.current?.requestSubmit()
      const form = new FormData()

      form.append('name', data.name) 
      form.append('email', data.email)
      form.append('subject', data.subject)
      form.append('message', data.message) 
      formAction(form)
    } else {
      console.log('Form is invalid')
    }
  }

  const onError = (errors: any) => {
    console.log('Validation Errors:', errors)
  }

  return (
    <>
      {state.message !== 'success' ? (
        <form
          ref={formRef}
          // action={formAction}
          onSubmit={handleSubmit((data, event) => onSubmit(data, event, formRef))}
        >
          <div className='grid col-auto gap-4'>
            {state?.message !== 'success' && <div className='text-red-500'>{state.message}</div>}
            {state.errors && (
              <div className='text-red-500'>
                <ul>
                  {state?.errors?.map((err: any, index) => {
                    const { message } = err
                    return (
                      <li key={index}>
                        <strong>{err.path[0]}:</strong> {message}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            <div className='grid md:grid-cols-2 gap-4'>
              <FormField
                displayRequired
                type='text'
                placeholder='Name'
                fieldname='name'
                register={register}
                error={errors.name}
                value={state.fields?.name}
              />
              <FormField
                displayRequired
                type='email'
                placeholder='Email'
                fieldname='email'
                register={register}
                error={errors.email}
                value={state.fields?.email}
              />
            </div>
            <FormField
              type='text'
              placeholder='Subject'
              fieldname='subject'
              register={register}
              error={errors.subject}
              value={state.fields?.subject}
            />

            <Textarea
              displayRequired
              className='min-h-[150px]'
              placeholder='Message'
              fieldname='message'
              register={register}
              error={errors.message}
              value={state.fields?.message}
            />
            <div className='md:justify-self-end'>
              <SubmitButton text={state.message} />
            </div>
          </div>
        </form>
      ) : (
        <div className=' text-2xl semi-bold flex flex-col flex-1 justify-center items-center'>
          <p>Thank you for your message!</p>
          <p>We will contact you soon.</p>
        </div>
      )}
    </>
  )
}

export default ContactForm
