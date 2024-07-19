import React from 'react'
import Link from 'next/link'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <header className='w-full flex items-center justify-between px-4 py-3 bg-background shadow-sm sm:px-6'>
      <nav className='w-full flex items-center justify-normal gap-4'>
        <Link href='/' className='flex items-center' prefetch={false}>
          Home
          <span className='sr-only'>Bug home</span>
        </Link>
        <Link href='/contact' className='flex items-center' prefetch={false}>
          Contact
          <span className='sr-only'>Bug contact</span>
        </Link>
      </nav>
    </header>
  )
}
