import moment from 'moment'

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15)
}

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format('HH:mm')
}

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format('ddd')
}

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  } else {
    return num
  }
}

export const airQulaityIndexText = [
  {
    rating: 10,
    description: 'excellent',
  },
  {
    rating: 20,
    description: 'good',
  },
  {
    rating: 30,
    description: 'satisfactory',
  },
  {
    rating: 40,
    description: 'fair',
  },
  {
    rating: 50,
    description: 'moderate',
  },
  {
    rating: 60,
    description: 'moderate',
  },
  {
    rating: 70,
    description: 'poor',
  },
  {
    rating: 80,
    description: 'poor',
  },
  {
    rating: 90,
    description: 'very poor',
  },
  {
    rating: 100,
    description: 'very poor',
  },
]

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371
  const p1 = (lat1 * Math.PI) / 180
  const p2 = (lat2 * Math.PI) / 180
  const deltaLon = lon2 - lon1
  const deltaLambda = (deltaLon * Math.PI) / 180
  const d =
    Math.acos(
      Math.sin(p1) * Math.sin(p2) +
        Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda)
    ) * R
  return d
}
