import React from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../../Components/BottomNav'

const Saved = () => {
  const savedItems = []

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/95 px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Saved</h1>
            <p className="text-sm text-white/70">All saved reels and favorites in one place.</p>
          </div>
          <Link
            to="/"
            className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="px-4 py-8">
        {savedItems.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-4xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
            <p className="text-lg font-semibold mb-4">No saved reels yet</p>
            <p className="text-sm text-white/70 mb-6">
              Tap the bookmark icon on a reel to save it and come back here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Browse reels
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {savedItems.map((item) => (
              <article key={item._id} className="overflow-hidden rounded-4xl  border-white/10 bg-white/5 shadow-sm shadow-black/30">
                <div className="relative h-64 bg-zinc-900">
                  <video
                    className="h-full w-full object-cover"
                    src={item.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                <div className="space-y-3 p-5">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-sm text-white/70 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-white/70">
                    <span className="rounded-full bg-white/5 px-3 py-2">Likes {item.likeCount ?? 0}</span>
                    <span className="rounded-full bg-white/5 px-3 py-2">Saved {item.savedCount ?? 0}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}

export default Saved
