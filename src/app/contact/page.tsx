import { Suspense } from 'react'
import Link from 'next/link'
import ContactForm from '@/components/contactForm'

const initialState = {
  message: '',
  errors: {},
}

export default function Contact() {
  return (
    <div className='w-11/12 max-w-5xl mx-auto py-12 md:py-24'>
      <div className='space-y-6 text-center'>
        <h1 className='text-4xl font-bold'>Contact Us</h1>
        <p className='max-w-[600px] mx-auto text-muted-foreground'>
          Have a question or need assistance? Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </p>
      </div>
      <div className='w-full flex flex-col justify-center items-center'>
        <div className='w-full md:w-1/2 min-h-[400px] space-y-4'>
          <Suspense fallback={null}>
          <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
