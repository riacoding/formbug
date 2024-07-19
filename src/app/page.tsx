import Image from 'next/image'

export default function Home() {
  return (
    <main className='w-full flex min-h-screen flex-col items-center p-10'>
      <h1 className='text-4xl font-bold'>Form action Bug</h1>
      <div className='w-full flex flex-col items-center gap-4'>
        <h3 className='text-1xl font-bold align-middle'>Steps to recreate</h3>
        <ol className='list-disc'>
          <li>Click Contact</li>
          <li>Inspect Form Element in devtools</li>
          <li>
            Notice form <span className='font-semibold'>action</span> has:
            <br />
            <p className='p-5 font-semibold'>
              javascript:throw new Error A React form was unexpectedly submitted. If you called form.submit manually,
              consider using form.requestSubmit instead. If youre trying to use event.stopPropagation in a submit event
              handler, consider also calling event.preventDefault
            </p>
          </li>
          <li>If you fill and submit the form it will fail with the above error</li>
          <li>Reload Page</li>
          <li>
            Notice form has <span className='font-semibold'>action</span> attribute and other hidden input elements
            injected
          </li>
          <li>Fill form and submit</li>
          <li>
            It Appears that form will only work when the injected attributes and elements are present. It appears to
            only happen on a page refresh and not on a route change. This is the case whether the form has just an
            action or an action and onSubmit
          </li>
        </ol>
      </div>
    </main>
  )
}
