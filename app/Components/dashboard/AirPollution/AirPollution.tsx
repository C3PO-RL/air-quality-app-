'use client'
import { useGlobalContext } from '@/app/context/GlobalContext'
import { thermo } from '@/app/utils/icons'
import { airQulaityIndexText } from '@/app/utils/misc'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import moment from 'moment'
import React, { FC } from 'react'

const AirPollution: FC = () => {
  const { airQuality } = useGlobalContext()

  // check if airQuality is available, check if necessary properties are available
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return <Skeleton className='col-span-2 h-[12rem] w-full md:col-span-full' />
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10

  const filteredIndex = airQulaityIndexText.find((item) => {
    return item.rating === airQualityIndex
  })

  return (
    <div
      className='air-pollution dark:bg-dark-grey sm-2:col-span-2 col-span-full flex h-[12rem] flex-col gap-4 rounded-lg
       border px-4 pt-6 shadow-sm dark:shadow-none md:col-span-2 xl:col-span-2'
    >
      <h2 className='flex items-center gap-2 font-medium'>
        {thermo}Air Pollusion
      </h2>
      <p className=' text-gray-300'>
        {moment().format('DD/MM/YYYY')}
      </p>
      <Progress value={airQualityIndex} max={300} className='progress' />
      <p className='text-sm'>Air quality is {filteredIndex?.description}. </p>
    </div>
  )
}

export default AirPollution
