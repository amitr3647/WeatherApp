import { useTheme } from '@/context/theme-provider';
import { Moon, Sun } from 'lucide-react';
import React from 'react'

function ThemeContainer() {
    const {theme,setTheme} = useTheme();
    const isDark = theme ==='dark';
  return (
    <div className='theme'>
    {isDark? <Sun className='text-yellow-300' onClick={()=>setTheme('light')}></Sun>:  <Moon className='text-blue-500' onClick={()=>setTheme('dark')}></Moon>}
               
        </div>
  )
}

export default ThemeContainer