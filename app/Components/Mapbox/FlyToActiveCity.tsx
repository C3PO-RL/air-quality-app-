import { useEffect } from 'react'
import { Marker, useMap } from 'react-leaflet'
import icon from './constants'
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from '@/app/context/GlobalContext'

const FlyToActiveCity = () => {
  const map = useMap()
  const { fetchStations } = useGlobalContextUpdate()
  const { activeCoords } = useGlobalContext()

  useEffect(() => {
    if (activeCoords) {
      const zoomLev = 10
      const flyToOptions = {
        duration: 1.5,
      }
      map.flyTo(activeCoords, zoomLev, flyToOptions)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCoords, map])

  return !activeCoords ? null : <Marker position={activeCoords} icon={icon} />
}

export default FlyToActiveCity
