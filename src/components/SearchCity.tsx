import React, { useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useSearchLocation } from '@/hooks/useWeather'
import { useNavigate } from 'react-router-dom'


function SearchCity() {
const [open,setOpen] = useState(false)
const [query,setQuery] = useState('');
const {data} = useSearchLocation(query);
const navigate = useNavigate();
const onSelectHandler = (cityData:any)=>{
const [lat,lon,name,country] = cityData.split('|');
setOpen(false);
navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
}
  return (
    <div>
        <Button variant='outline' className='border border-gray-500 border-solid ' onClick={()=>setOpen(prev=>!prev)}>
            <Search></Search>
           Search cities...
        </Button>
<CommandDialog open={open} onOpenChange={()=>setOpen(false)}>
      <CommandInput 
      value={query}
      onValueChange={setQuery}
       placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
         {data?.map((val: any)=> <CommandItem key={val.id} value={`${val.lat}|${val.lon}|${val.name}|${val.country}`}
         onSelect={onSelectHandler}
         >{val?.name}</CommandItem>)}
          
        </CommandGroup>
      </CommandList>
    </CommandDialog>

    </div>
  )
}

export default SearchCity