'use client'
import axios from 'axios'
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  ChangeEvent,
} from 'react'
import defaultPlaces from '../utils/defaultPlaces'

import { debounce } from 'lodash'

interface GlobalContextProps {}
interface GlobalContextUpdateProps {}

export const GlobalContext = createContext({} as any)

export const GlobalContextUpdate = createContext({} as any)

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [forecast, setForecast] = useState({})
  const [geoCodedList, setGeoCodedList] = useState(defaultPlaces)
  const [inputValue, setInputValue] = useState('')

  const [activeCityCoords, setActiveCityCoords] = useState([
    51.752021, -1.257726,
  ])

  const [airQuality, setAirQuality] = useState({})
  const [fiveDayForecast, setFiveDayForecast] = useState({})
  const [uvIndex, seUvIndex] = useState({})

  const fetchForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`)

      setForecast(res.data)
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error fetching forecast data: ', error.message)
      }
    }
  }

  // Air Quality
  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`)
      setAirQuality(res.data)
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error fetching air quality data: ', error.message)
      }
    }
  }

  // five day forecast
  const fetchFiveDayForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`)

      setFiveDayForecast(res.data)
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error fetching five day forecast data: ', error.message)
      }
    }
  }

  //geocoded list
  const fetchGeoCodedList = async (search: string) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`)

      setGeoCodedList(res.data)
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error fetching geocoded list: ', error.message)
      }
    }
  }

  //fetch uv data
  const fetchUvIndex = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`)

      seUvIndex(res.data)
    } catch (error) {
      console.error('Error fetching the forecast:', error)
    }
  }

  // handle input
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    if (e.target.value === '') {
      setGeoCodedList(defaultPlaces)
    }
  }

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search)
    }, 500)

    if (inputValue) {
      debouncedFetch(inputValue)
    }

    // cleanup
    return () => debouncedFetch.cancel()
  }, [inputValue])

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1])
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1])
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1])
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1])
  }, [activeCityCoords])

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)
