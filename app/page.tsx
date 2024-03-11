'use client'
import Image from 'next/image'
import Navbar from './Components/Navbar'
import Mapbox from './Components/Mapbox/Mapbox'
import defaultPlaces from './utils/defaultPlaces'
import { useGlobalContextUpdate } from '@/app/context/GlobalContext'
import AirPollution from './Components/AirPollution/AirPollution'
import DailyForecast from './Components/DailyForecast/DailyForecast'
import FiveDayForecast from './Components/FiveDayForecast/FiveDayForecast'
import FeelsLike from './Components/FeelsLike/FeelsLike'
import Humidity from './Components/Humidity/Humidity'
import Population from './Components/Population/Population'
import Pressure from './Components/Pressure/Pressure'
import Wind from './Components/Wind/Wind'
import Visibility from './Components/Visibility/Visibility'
import UvIndex from './Components/UvIndex/UvIndex'
import Temperature from './Components/Temperature/Temperature'
import Sunset from './Components/Sunset/Sunset'

const Home = () => {
  const { setActiveCityCoords } = useGlobalContextUpdate()

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon])

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <main className='m-auto mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem]'>
      <Navbar />
      <div className='flex flex-col gap-4 pb-4 md:flex-row'>
        <div className='flex w-full min-w-[18rem] flex-col gap-4 md:w-[35rem]'>
          <FiveDayForecast />
          <Temperature />
        </div>
        <div className='flex w-full flex-col'>
          <div className='instruments sm-2:col-span-2 col-span-full grid h-full gap-4 lg:grid-cols-3 xl:grid-cols-4'>
            <AirPollution />
            <DailyForecast />
            <FeelsLike />
            <Humidity />
            <Population />
            <Pressure />
            <Wind />
            <Visibility />
            <UvIndex />
            <Sunset />
          </div>
          <div className='mapbox-con mt-4 flex gap-4'>
            <Mapbox />
            <div className='states flex flex-1 flex-col gap-3'>
              <h2 className='flex items-center gap-2 font-medium'>
                Top Large Cities
              </h2>
              <div className='flex flex-col gap-4'>
                {defaultPlaces.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className='dark:bg-dark-grey cursor-pointer rounded-lg border shadow-sm dark:shadow-none'
                      onClick={() => getClickedCityCords(state.lat, state.lon)}
                    >
                      <p className='px-6 py-4'>{state.name}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className='flex justify-center py-4 pb-8'>
        <p className='footer-text flex items-center gap-1 text-sm'>Made by</p>
      </footer>
    </main>
  )
}
export default Home
