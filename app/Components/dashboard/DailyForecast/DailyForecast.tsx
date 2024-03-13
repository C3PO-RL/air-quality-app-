'use client'
import React, { FC } from 'react'
import { useGlobalContext } from '@/app/context/GlobalContext'
import { Skeleton } from '@/components/ui/skeleton'
import { thermo } from '@/app/utils/icons'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import moment from 'moment'
import { airQulaityIndexText } from '@/app/utils/misc'
import { Progress } from '@/components/ui/progress'

const DailyForecast: FC = () => {
  const { airQuality, airQualityForecast } = useGlobalContext()
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
  const { data } = airQualityForecast
  const formattedairQualityForecast = data?.map((aqi: any) => {
    return {
      ...aqi,
      filteredIndex: airQulaityIndexText.find((item) => {
        return item.rating === aqi.main.aqi * 10
      }),
    }
  })

  return (
    <div
      className='dark:bg-dark-grey sm-2:col-span-2 col-span-full flex h-[12rem] flex-col gap-8 rounded-lg
       border px-4 pt-6 shadow-sm dark:shadow-none md:col-span-2 xl:col-span-2'
    >
      <div className='flex h-full gap-10 overflow-hidden'>
        {airQualityForecast.length < 1 ? (
          <div className='flex items-center justify-center'>
            <h1 className='text-[3rem] text-rose-500 line-through'>
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className='w-full'>
            <Carousel>
              <CarouselContent>
                {formattedairQualityForecast &&
                  formattedairQualityForecast?.map((aqi: any) => {
                    return (
                      <CarouselItem
                        key={aqi.dt}
                        className='flex cursor-grab flex-col items-center justify-center gap-4'
                      >
                        <h2 className='gap- flex items-center font-medium'>
                          {thermo}Air Pollusion
                        </h2>
                        <p className=' text-gray-300'>
                          {moment(aqi.dt * 1000).format('DD/MM/YYYY')}
                        </p>
                        <Progress
                          value={aqi.main.aqi * 10}
                          max={300}
                          className='progress'
                        />
                        <p className='text-sm'>
                          Air quality is {aqi?.filteredIndex.description}.
                        </p>
                      </CarouselItem>
                    )
                  })}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyForecast
