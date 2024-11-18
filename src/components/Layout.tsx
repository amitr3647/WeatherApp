import  { PropsWithChildren } from 'react'
import Navbar from './Navbar'

function Layout({children}: PropsWithChildren) {
  return (
    <div className='w-full min-h-screen  '>
<Navbar></Navbar>
<main className='px-2'>{children}</main>
<footer >this is the footer</footer>
    </div>
  )
}

export default Layout