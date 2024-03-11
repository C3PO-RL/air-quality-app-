'use client'
import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useGlobalContext } from '@/app/context/GlobalContext'
import { Skeleton } from '@/components/ui/skeleton'

function FlyToActiveCity({ activeCityCords }: any) {
  const map = useMap()

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13
      const flyToOptions = {
        duration: 1.5,
      }

      map.flyTo(
        [activeCityCords.lat, activeCityCords.lon],
        zoomLev,
        flyToOptions
      )
    }
  }, [activeCityCords, map])

  return null
}

function Mapbox() {
  const { forecast } = useGlobalContext() // Your coordinates

  const activeCityCords = forecast?.coord

  if (!forecast || !forecast.coord || !activeCityCords) {
    return <Skeleton className='calc(100% - 2rem) w-full' />
  }

  return (
    <div className='flex-1 basis-[50%] rounded-lg border'>
      <MapContainer
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className='m-4 rounded-lg'
        style={{ height: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  )
}

export default Mapbox
