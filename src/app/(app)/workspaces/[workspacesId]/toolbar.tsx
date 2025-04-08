import { Button } from '@/components/ui/button'
import { Info, Search } from 'lucide-react'
import React from 'react'

export default function Toolbar() {
  return (
    <nav className='bg-amber-300 flex items-center justify-between w-full h-10 px-4 py-3'>
        <div className='flex-1' />
        <div className='min-w-[280px] max-[642px] grow-[2] shrink'>
            <Button size='sm' className='bg-accent/25 hover:bg-accent-25 w-full justify-start '>
                <Search className='size-4 mr-2 text-white'></Search>
                <span className='text-white text-xs'>
                    Search workspaace
                </span>
            </Button>
        </div>
        <div className='ml-auto flex-1 flex items-center justify-end' >
            <Button variant='ghost' className='bg-amber-300 hover:bg-amber-300'>
                <Info className='size-4 text-white'></Info>
            </Button>
        </div>
    </nav>
  )
}
