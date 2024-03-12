import { useEffect, useState } from 'react'
import { Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import icon from './constants'
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from '@/app/context/GlobalContext'

const LocationMarker = () => {
  const [position, setPosition] = useState(null)
  const { getDataFromCurrentLocation, fetchStations } = useGlobalContextUpdate()
  const { activeCoords } = useGlobalContext()
  const map = useMap()

  useEffect(() => {
    map.locate().on('locationfound', function (e: any) {
      setPosition(e.latlng)
      getDataFromCurrentLocation(e.latlng.lat, e.latlng.lng)
      map.flyTo(e.latlng, map.getZoom())
      const radius = e.accuracy
      const circle = L.circle(e.latlng, radius)
      circle.addTo(map)
    })
    map.on('moveend', function () {
      const bounds = map.getBounds()
      fetchStations(bounds)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  return activeCoords === null ? null : (
    <Marker position={activeCoords} icon={icon} />
  )
}

export default LocationMarker
