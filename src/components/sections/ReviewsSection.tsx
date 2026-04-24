'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { REVIEWS_CONFIG, type Review } from '@/data/reviews'

const AVATAR_PALETTE = [
  { bg: 'var(--color-primary-100)', text: 'var(--color-primary-700)' },
  { bg: 'var(--color-secondary-100)', text: 'var(--color-secondary-700)' },
  { bg: 'var(--color-primary-50)', text: 'var(--color-primary-600)' },
  { bg: '#F0EBE3', text: '#7A5C3A' },
  { bg: '#EBF0E8', text: 'var(--color-primary-700)' },
  { bg: '#F5EEE8', text: '#8B5E3C' },
]

function getAvatarColor(name: string) {
  return AVATAR_PALETTE[name.charCodeAt(0) % AVATAR_PALETTE.length]!
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase()
  }
  return (parts[0]!.slice(0, 2)).toUpperCase()
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} stelle su 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill={i < rating ? 'var(--color-secondary-400)' : 'var(--color-neutral-200)'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function truncateText(text: string, maxLength = 200): { truncated: string; isTruncated: boolean } {
  if (text.length <= maxLength) return { truncated: text, isTruncated: false }
  return { truncated: text.slice(0, maxLength).trimEnd() + '…', isTruncated: true }
}

function ReviewCard({ review }: { review: Review }) {
  const colors = getAvatarColor(review.author)
  const initials = getInitials(review.author)
  const { truncated } = review.text
    ? truncateText(review.text)
    : { truncated: '' }

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 h-full select-none"
      style={{ backgroundColor: 'var(--color-surface-page)', border: '1px solid var(--color-neutral-100)' }}
    >
      {/* Header: avatar + nome + data */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold"
          style={{ backgroundColor: colors.bg, color: colors.text }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p
            className="text-label font-semibold truncate"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            {review.author}
          </p>
          <p
            className="text-caption"
            style={{ color: 'var(--color-neutral-400)' }}
          >
            {review.date}
          </p>
        </div>
      </div>

      {/* Stelle */}
      <StarRating rating={review.rating} />

      {/* Testo */}
      {truncated && (
        <p
          className="text-body-sm flex-1"
          style={{ color: 'var(--color-neutral-600)' }}
        >
          {truncated}
        </p>
      )}
    </div>
  )
}

function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const autoplay = Autoplay({ delay: 4500, stopOnMouseEnter: true, stopOnInteraction: false })

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  return (
    <div>
      {/* Viewport Embla */}
      <div ref={emblaRef} className="overflow-hidden" aria-label="Carousel recensioni">
        <div className="flex gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Controlli */}
      <div className="flex items-center justify-center gap-4 mt-6">
        {/* Freccia prev */}
        <button
          onClick={scrollPrev}
          aria-label="Recensione precedente"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: 'var(--color-primary-50)',
            color: 'var(--color-primary-700)',
            border: '1px solid var(--color-primary-200)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2" role="tablist" aria-label="Navigazione recensioni">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Vai alla recensione ${index + 1}`}
              onClick={() => scrollTo(index)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor:
                  index === selectedIndex
                    ? 'var(--color-primary-600)'
                    : 'var(--color-neutral-300)',
                transform: index === selectedIndex ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Freccia next */}
        <button
          onClick={scrollNext}
          aria-label="Recensione successiva"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: 'var(--color-primary-50)',
            color: 'var(--color-primary-700)',
            border: '1px solid var(--color-primary-200)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function ReviewsSection() {
  const { averageRating, totalCount, googleUrl, reviews } = REVIEWS_CONFIG

  if (reviews.length === 0) return null

  return (
    <section
      aria-labelledby="reviews-heading"
      style={{ backgroundColor: 'var(--color-surface-warm)' }}
      className="py-20"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <p
              className="text-label uppercase mb-3"
              style={{ color: 'var(--color-primary-600)' }}
            >
              Recensioni
            </p>
            <h2
              id="reviews-heading"
              className="text-heading-2 mb-4"
              style={{ color: 'var(--color-neutral-900)' }}
            >
              Cosa dicono i pazienti
            </h2>

            {/* Badge rating */}
            <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 mb-4"
              style={{ backgroundColor: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)' }}
            >
              <span className="text-heading-4" style={{ color: 'var(--color-neutral-900)' }}>
                {averageRating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-body-sm" style={{ color: 'var(--color-neutral-500)' }}>
                {totalCount} recensioni su Google
              </span>
            </div>
          </div>

          {/* Carousel */}
          <ReviewsCarousel reviews={reviews} />

          {/* Link Google */}
          <div className="text-center mt-8">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-body-sm font-medium hover:underline"
              style={{ color: 'var(--color-primary-600)' }}
              aria-label="Vedi tutte le recensioni su Google (apre nuova tab)"
            >
              Vedi tutte le recensioni su Google
              <span aria-hidden="true" className="text-xs">↗</span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
