'use client'
import axios from 'axios'
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import defaultPlaces from '../utils/defaultPlaces'

import { debounce, set } from 'lodash'
import { getDistanceFromLatLonInKm } from '../utils/misc'

export const GlobalContext = createContext({} as any)

export const GlobalContextUpdate = createContext({} as any)

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [forecast, setForecast] = useState({})
  const [geoCodedList, setGeoCodedList] = useState(defaultPlaces)
  const [inputValue, setInputValue] = useState<string>('')
  const [stations, setStations] = useState([])
  const [airQuality, setAirQuality] = useState({})
  const [fiveDayForecast, setFiveDayForecast] = useState({})
  const [uvIndex, seUvIndex] = useState({})
  const [activeCoords, setActiveCoords] = useState([0, 0])

  const fetchForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`)

      setForecast(res.data)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching forecast data: ', error.message)
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
        console.error('Error fetching air quality data: ', error.message)
      }
    }
  }
  // Air Quality Stations
  const fetchStations = async (bounds: any) => {
    const latlng = `${bounds._northEast.lat},${bounds._northEast.lng},${bounds._southWest.lat},${bounds._southWest.lng}`
    setStations([])
    try {
      const res = await axios.get(`api/stations?latlng=${latlng}`)
      const formattedData = res.data.data
        .map((station: any) => {
          return {
            station: station.station,
            aqi: station.aqi,
            lat: station.lat,
            lon: station.lon,
            position: [station.lat, station.lon],
            distanceToTarget: getDistanceFromLatLonInKm(
              activeCoords[0],
              activeCoords[1],
              station.lat,
              station.lon
            ),
          }
        })
        .toSorted(
          (a: any, b: any) =>
            Number(a.distanceToTarget) - Number(b.distanceToTarget)
        )

      setStations(formattedData)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching stations data: ', error.message)
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
        console.error('Error fetching five day forecast data: ', error.message)
      }
    }
  }

  //geocoded list
  const fetchGeoCodedList = async (search: string) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`)

      if (res.data.status === 'ok') {
        setGeoCodedList([res.data.data.city])
      } else {
        setGeoCodedList([])
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching geocoded list: ', error.message)
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
  const handleInput = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
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

  const getDataFromCurrentLocation = async (lat: number, lon: number) => {
    fetchForecast(lat, lon)
    fetchAirQuality(lat, lon)
    fetchFiveDayForecast(lat, lon)
    fetchUvIndex(lat, lon)
    setActiveCoords([lat, lon])
  }

  return (
    <GlobalContext.Provider
      value={{
        activeCoords,
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        stations,
        handleInput,
        getDataFromCurrentLocation,
        fetchStations,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          fetchStations,
          getDataFromCurrentLocation,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)
