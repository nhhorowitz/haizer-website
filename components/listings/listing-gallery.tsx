'use client'

import { useState, useEffect } from 'react'

interface Props {
  photos: string[]
  title: string
  listingId: string
  savesCount: number
}

export function ListingGallery({ photos, title, listingId, savesCount }: Props) {
  const [saved, setSaved] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const hasPhotos = photos.length > 0

  useEffect(() => {
    if (!lightbox) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') setLightboxIndex((c) => (c + 1) % photos.length)
      if (e.key === 'ArrowLeft') setLightboxIndex((c) => (c - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, photos.length])

  function openLightbox(index: number) {
    setLightboxIndex(index)
    setLightbox(true)
  }

  // Fill to 5 slots
  const slots = Array.from({ length: 5 }, (_, i) => photos[i] ?? null)

  return (
    <>
      {/* ── Desktop: Zillow-style grid ── */}
      <div className="hidden md:block">
        {hasPhotos ? (
          <div className="relative flex gap-1" style={{ height: 500 }}>

            {/* Big photo — left half */}
            <div
              className="flex-1 relative overflow-hidden cursor-zoom-in"
              onClick={() => openLightbox(0)}
            >
              <img
                src={slots[0]!}
                alt={`${title} — photo 1`}
                className="w-full h-full object-cover hover:brightness-95 transition-all duration-200"
              />
            </div>

            {/* Right side — 2×2 grid */}
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden cursor-zoom-in"
                  onClick={() => slots[i] ? openLightbox(i) : openLightbox(0)}
                >
                  {slots[i] ? (
                    <img
                      src={slots[i]!}
                      alt={`${title} — photo ${i + 1}`}
                      className="w-full h-full object-cover hover:brightness-95 transition-all duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E8ECF0]" />
                  )}
                </div>
              ))}
            </div>

            {/* Save heart */}
            <button
              onClick={() => setSaved((s) => !s)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all z-10 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 15.5S2 11 2 6a4 4 0 0 1 7-2.65A4 4 0 0 1 16 6c0 5-7 9.5-7 9.5z"
                  stroke={saved ? '#F43F5E' : '#64748B'}
                  strokeWidth="1.5"
                  fill={saved ? '#F43F5E' : 'none'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* See all photos — bottom right */}
            <button
              onClick={() => openLightbox(0)}
              className="absolute bottom-4 right-4 flex items-center gap-2 bg-white border border-[#E2E8F0] text-sm font-medium text-[#1A1A1A] px-4 py-2 rounded-full shadow-sm hover:border-[#CBD5E1] transition-colors z-10 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="#1A1A1A" strokeWidth="1.4"/>
                <rect x="9" y="1" width="6" height="6" rx="1" stroke="#1A1A1A" strokeWidth="1.4"/>
                <rect x="1" y="9" width="6" height="6" rx="1" stroke="#1A1A1A" strokeWidth="1.4"/>
                <rect x="9" y="9" width="6" height="6" rx="1" stroke="#1A1A1A" strokeWidth="1.4"/>
              </svg>
              See all {photos.length} photos
            </button>
          </div>
        ) : (
          <div className="h-[500px] bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] flex flex-col items-center justify-center gap-4">
            <svg width="56" height="56" viewBox="0 0 72 72" fill="none" className="opacity-20">
              <path d="M36 8L8 28v36h18V44h20v20h18V28L36 8z" fill="#064E3B"/>
            </svg>
            <p className="text-sm text-[#064E3B]/30 font-medium">No photos yet</p>
          </div>
        )}
      </div>

      {/* ── Mobile: single photo + arrows ── */}
      <div className="md:hidden relative bg-[#1A1A1A]">
        {hasPhotos ? (
          <>
            <MobileCarousel photos={photos} title={title} onOpenLightbox={openLightbox} saved={saved} onToggleSave={() => setSaved(s => !s)} />
          </>
        ) : (
          <div className="h-[280px] bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center">
            <p className="text-sm text-[#064E3B]/30">No photos yet</p>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <img
            src={photos[lightboxIndex]}
            alt={`${title} — photo ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg"
          />

          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((c) => (c - 1 + photos.length) % photos.length) }}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((c) => (c + 1) % photos.length) }}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {photos.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto">
              {photos.map((p, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                  className={`shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={p} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

function MobileCarousel({ photos, title, onOpenLightbox, saved, onToggleSave }: {
  photos: string[]
  title: string
  onOpenLightbox: (i: number) => void
  saved: boolean
  onToggleSave: () => void
}) {
  const [current, setCurrent] = useState(0)
  return (
    <div className="relative">
      <img
        src={photos[current]}
        alt={`${title} — photo ${current + 1}`}
        onClick={() => onOpenLightbox(current)}
        className="w-full h-[300px] object-cover cursor-zoom-in"
      />
      {photos.length > 1 && (
        <>
          <button onClick={() => setCurrent((c) => (c - 1 + photos.length) % photos.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => setCurrent((c) => (c + 1) % photos.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">{current + 1} / {photos.length}</div>
        </>
      )}
      <button onClick={onToggleSave} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M9 15.5S2 11 2 6a4 4 0 0 1 7-2.65A4 4 0 0 1 16 6c0 5-7 9.5-7 9.5z"
            stroke={saved ? '#F43F5E' : '#64748B'} strokeWidth="1.5"
            fill={saved ? '#F43F5E' : 'none'} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
