export interface GooglePlacesStats {
  rating: number
  userRatingCount: number
}

export async function getGooglePlacesStats(): Promise<GooglePlacesStats | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) return null

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 86400 } } // 24h ISR cache
    )

    if (!res.ok) return null

    const data = await res.json()

    if (data.status !== 'OK' || !data.result) return null

    const { rating, user_ratings_total } = data.result

    if (typeof rating !== 'number' || typeof user_ratings_total !== 'number') return null

    return { rating, userRatingCount: user_ratings_total }
  } catch {
    return null
  }
}
