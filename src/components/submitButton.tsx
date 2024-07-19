'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus()
  console.log('submit Button', pending, text)
  return (
    <button
      disabled={pending}
      className='w-full h-10 md:w-48 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-orange-400'
      type='submit'
    >
      {pending === true ? 'Sending' : text === 'success' ? 'Sent' : 'Send'}
    </button>
  )
}
