import type { Review } from '@/data/reviews'

export interface GooglePlacesStats {
  rating: number
  userRatingCount: number
  reviews: Review[]
}

export async function getGooglePlacesStats(): Promise<GooglePlacesStats | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) return null

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&language=it&key=${apiKey}`,
      { next: { revalidate: 86400 } } // 24h ISR cache
    )

    if (!res.ok) return null

    const data = await res.json()

    if (data.status !== 'OK' || !data.result) return null

    const { rating, user_ratings_total, reviews: rawReviews } = data.result

    if (typeof rating !== 'number' || typeof user_ratings_total !== 'number') return null

    const reviews: Review[] = Array.isArray(rawReviews)
      ? rawReviews.map((r: Record<string, unknown>, idx: number) => ({
          id: `google-${typeof r.time === 'number' ? r.time : idx}`,
          author: typeof r.author_name === 'string' ? r.author_name : 'Anonimo',
          rating: (Math.min(5, Math.max(1, Math.round(typeof r.rating === 'number' ? r.rating : 5))) as 1 | 2 | 3 | 4 | 5),
          text: typeof r.text === 'string' && r.text.length > 0 ? r.text : undefined,
          date: typeof r.relative_time_description === 'string' ? r.relative_time_description : '',
        }))
      : []

    return { rating, userRatingCount: user_ratings_total, reviews }
  } catch {
    return null
  }
}
