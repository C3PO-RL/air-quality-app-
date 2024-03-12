'use client'
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from '@/app/context/GlobalContext'
import { commandIcon, search } from '@/app/utils/icons'
import { Button } from '@/components/ui/button'
import { Command } from '@/components/ui/command'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React from 'react'

function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext()
  const { getDataFromCurrentLocation } = useGlobalContextUpdate()

  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0)

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
            <div className='flex items-center border-b px-3'>
              {search}
              <input
                className={cn(
                  'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                )}
                value={inputValue}
                onChange={handleInput}
                placeholder='Type a command or search...'
              />
            </div>
            <ul className='px-3 pb-2'>
              {geoCodedList.length === 0 ? (
                <p>No Results</p>
              ) : (
                <p className='p-2 text-sm text-muted-foreground'>Suggestions</p>
              )}

              {geoCodedList &&
                geoCodedList.map(
                  (
                    item: {
                      name: string
                      geo: [number, number]
                    },
                    index: number
                  ) => {
                    const { name } = item
                    return (
                      <li
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`cursor-default rounded-sm px-2  py-3 text-sm
                        ${hoveredIndex === index ? 'bg-accent' : ''}
                      `}
                        onClick={() => {
                          getDataFromCurrentLocation(item.geo[0], item.geo[1])
                        }}
                      >
                        <p className=' text'>{name}</p>
                      </li>
                    )
                  }
                )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchDialog
