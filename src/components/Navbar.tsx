import { Link } from 'react-router-dom'
import SearchCity from './SearchCity'
import ThemeContainer from './ThemeContainer'

function Navbar() {
   
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 px-5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
<div  className='flex items-center justify-between py-2 w-full mx-2'>
    <Link to='/'>
       <img className='w-20 h-16' src='./logo.png' alt='logo'></img>
    </Link>
    <div className='flex justify-center items-center gap-4'>

       <SearchCity/>
     <ThemeContainer/>
          
            </div>
        </div>
       
    </header> 
  )
}

export default Navbar