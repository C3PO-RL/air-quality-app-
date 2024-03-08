import { commandIcon } from '@/app/utils/icons'
import { Button } from '@/components/ui/button'
import { Command, CommandInput } from '@/components/ui/command'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DialogContent } from '@radix-ui/react-dialog'
import React from 'react'

const SearchDialog = () => {
  return (
    <div className='search-btn'>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='inline-flex items-center justify-center border text-sm font-medium duration-200 ease-in-out  hover:bg-slate-100 hover:dark:bg-[#131313]'
          >
            <p className='text-sm text-muted-foreground'>Search Here...</p>
            <div className='command ml-[10rem] flex  items-center gap-2 rounded-sm bg-slate-200 py-[2px] pl-[5px] pr-[7px] dark:bg-[#262626]'>
              {commandIcon}
              <span className='text-[9px]'>F</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className='p-0'>
          <Command className=' rounded-lg border shadow-md'>
            <CommandInput placeholder='Search...' />
            <ul className='px-3 pb-2'>
              <p className='p-2 text-sm text-muted-foreground'>Suggestions</p>
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchDialog
