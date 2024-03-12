'use client'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/app/context/GlobalContext'
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from '@/app/utils/icons'
import { kelvinToCelsius } from '@/app/utils/misc'
import moment from 'moment'

function Temperature() {
  const { forecast, stations } = useGlobalContext()

  // State
  const [localTime, setLocalTime] = useState<string>('')
  const [currentDay, setCurrentDay] = useState<string>('')

  const { main, timezone, name, weather, coord } = forecast

  const temp = kelvinToCelsius(main?.temp)
  const minTemp = kelvinToCelsius(main?.temp_min)
  const maxTemp = kelvinToCelsius(main?.temp_max)

  const getIcon = () => {
    switch (weatherMain) {
      case 'Drizzle':
        return drizzleIcon
      case 'Rain':
        return rain
      case 'Snow':
        return snow
      case 'Clear':
        return clearSky
      case 'Clouds':
        return cloudy
      default:
        return clearSky
    }
  }

  // Live time update
  useEffect(() => {
    // upadte time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60)
      // custom format: 24 hour format
      const formatedTime = localMoment.format('HH:mm:ss')
      // day of the week
      const day = localMoment.format('dddd')

      setLocalTime(formatedTime)
      setCurrentDay(day)
    }, 1000)

    // clear interval
    return () => clearInterval(interval)
  }, [timezone])

  if (!forecast || !weather || !stations) {
    return <div>Loading...</div>
  }
  const { main: weatherMain, description } = weather[0]

  return (
    <div
      className='dark:bg-dark-grey flex flex-col justify-between rounded-lg border px-4 
        pb-5 pt-6 shadow-sm dark:shadow-none'
    >
      <p className='flex items-center justify-between'>
        <span className='font-medium'>{currentDay}</span>
        <span className='font-medium'>{localTime}</span>
      </p>
      <p className='flex gap-1 pt-2 font-bold'>
        <span>Location: {name}</span>
        <span>{navigation}</span>
      </p>
      <p className='flex gap-1 pt-2 font-bold'>
        <span>
          lat:{coord.lat} lon:{coord.lon}
        </span>
      </p>
      <p className='flex gap-1 pt-2 font-bold'>
        <span>Station: {stations[0]?.station.name}</span>
        <span>{navigation}</span>
      </p>
      <p className='flex gap-1 pt-2 font-bold'>
        <span>
          lat:{stations[0]?.lat} lon:{stations[0]?.lon}
        </span>
      </p>
      <p className='flex gap-1 pt-2 font-bold'>
        <span>
          Distance to station:{' '}
          {Math.round(stations[0]?.distanceToTarget / 1000)} km
        </span>
      </p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className='pt-2 text-lg font-medium capitalize'>{description}</p>
        </div>
        <p className='flex items-center gap-2'>
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
          <span>Current: {temp}°</span>
        </p>
      </div>
    </div>
  )
}

export default Temperature
