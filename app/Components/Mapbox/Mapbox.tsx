'use client'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useGlobalContext } from '@/app/context/GlobalContext'
import { Skeleton } from '@/components/ui/skeleton'
import LocationMarker from './LocationMarker'
import FlyToActiveCity from './FlyToActiveCity'
import icon from './constants'

const Mapbox = () => {
  const { forecast, stations, activeCoords } = useGlobalContext() // Your coordinates

  const activeCityCords = forecast?.coord

  if (!activeCoords) {
    return <Skeleton className='calc(100% - 2rem) w-full' />
  }

  return (
    <div className='flex-1 basis-[50%] rounded-lg border'>
      <MapContainer
        center={activeCoords}
        zoom={10}
        scrollWheelZoom={false}
        className='z-0 m-4 rounded-lg'
        style={{ height: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FlyToActiveCity />
        <LocationMarker />
        {stations[0] && (
          <Marker
            title={`Station: ${stations[0]?.station.name}`}
            position={stations[0]?.position}
            icon={icon}
          />
        )}
      </MapContainer>
    </div>
  )
}

export default Mapbox
