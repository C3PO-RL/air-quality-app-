'use client'
import { useGlobalContext } from '@/app/context/GlobalContext'
import { eye } from '@/app/utils/icons'
import { kelvinToCelsius, unixToDay } from '@/app/utils/misc'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function ComponentsConcentration() {
  const { airQuality } = useGlobalContext()

  if (!airQuality || !airQuality.list) {
    return <Skeleton className='h-[12rem] w-full' />
  }
  const componentsNames = Object.keys(airQuality.list[0].components)

  return (
    <div
      className='dark:bg-dark-grey flex flex-1 flex-col justify-between rounded-lg border px-4
        pb-5 pt-6 shadow-sm dark:shadow-none'
    >
      <div>
        <h2 className='flex items-center gap-2 font-medium'>
          {eye} Today Components Concentration
        </h2>

        <div className='forecast-list pt-1'>
          {componentsNames.map((comp, i) => {
            return (
              <div
                key={comp}
                className='daily-forevast flex flex-col justify-evenly border-b-2 py-2'
              >
                <p className='min-w-[3.5rem] text-xl'>{comp} </p>
                <p className='min-w-[3.5rem] text-xl'>
                  concentration: {airQuality.list[0].components[comp]} μg/m3
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ComponentsConcentration
