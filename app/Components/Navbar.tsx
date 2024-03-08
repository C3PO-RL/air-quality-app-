'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { github } from '../utils/icons'
import { ThemeDropdown } from './ThemeDropdown/ThemeDropdown'
import SearchDialog from './SearchDialog/SearchDialog'

const Navbar = () => {
  const router = useRouter()
  return (
    <div className='flex w-full items-center justify-between py-4'>
      <div className='left'></div>
      <div className='search-container flex w-full shrink-0 gap-2 sm:w-fit'>
        <SearchDialog />
        <div className='btn-group flex items-center gap-2'>
          <ThemeDropdown />
          <Button
            className='source-code flex items-center gap-2'
            onClick={() =>
              router.push('https://github.com/C3PO-RL?tab=repositories')
            }
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
