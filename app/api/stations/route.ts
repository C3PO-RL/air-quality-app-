import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams

    const latlng = searchParams.get('latlng')
    const apiKey = process.env.WAQI_API_KEY

    const url = `https://api.waqi.info/v2/map/bounds?latlng=${latlng}&networks=all&token=${apiKey}`

    const res = await axios.get(url)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log('Error fetching stations data')
    return new Response('Error fetching stations data', { status: 500 })
  }
}
