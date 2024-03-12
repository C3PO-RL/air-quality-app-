'use client'
import { useGlobalContext } from '@/app/context/GlobalContext'
import { wind } from '@/app/utils/icons'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import React from 'react'

function Wind() {
  const { forecast } = useGlobalContext()

  const windSpeed = forecast?.wind?.speed
  const windDir = forecast?.wind?.deg

  if (!windSpeed || !windDir) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  return (
    <div className='dark:bg-dark-grey flex h-[12rem] flex-col gap-3 rounded-lg border px-4 pb-5 pt-6 shadow-sm dark:shadow-none'>
      <h2 className='flex items-center gap-2 font-medium'>{wind} Wind</h2>

      <div className='compass relative flex items-center justify-center'>
        <div className='image relative'>
          <Image
            src='/compass_body.svg'
            alt='compass'
            width={110}
            height={110}
            className='h-auto w-auto'
            priority
          />
          <Image
            src='/compass_arrow.svg'
            alt='compass'
            className='absolute left-[50%] top-0 h-auto w-auto transition-all duration-500 ease-in-out dark:invert'
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: '100%',
            }}
            width={11}
            height={11}
          />
        </div>
        <p
          className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-xs
            font-medium dark:text-white'
        >
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  )
}

export default Wind
