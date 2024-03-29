import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams

    const city = searchParams.get('search')
    const apiKey = process.env.WAQI_API_KEY

    const url = `https://api.waqi.info/feed/${city}/?token=${apiKey}`

    const res = await axios.get(url)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log('Error fetching geocoded data')
    return new Response('Error fetching geocoded data', { status: 500 })
  }
}
