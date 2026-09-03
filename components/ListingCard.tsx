'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, X } from 'lucide-react'

type Listing = {
  id: string
  facility_name: string | null
  cost_per_night: number | null
  activities: string | null
  location: string | null
  image_url: string | null
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const [open, setOpen] = useState(false)

  const activities = listing.activities
    ? listing.activities.split(',').map((a) => a.trim()).filter(Boolean)
    : []

  const costDisplay = listing.cost_per_night
    ? `KES ${listing.cost_per_night} / night`
    : 'Contact for pricing'

  return (
    <>
      <div className="rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
        <div className="relative w-full h-48 bg-gray-100">
          {listing.image_url ? (
            <Image
              src={listing.image_url}
              alt={listing.facility_name ?? 'Listing'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-bold text-blue-950">
            {listing.facility_name}
          </h2>

          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <MapPin size={14} />
            <span>{listing.location || 'Location not specified'}</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
            <p className="text-xs text-gray-600">Cost per Night</p>
            <p className="text-sm font-semibold text-orange-700">{costDisplay}</p>
          </div>

          {activities.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Activities</p>
              <div className="flex flex-wrap gap-2">
                {activities.slice(0, 3).map((activity, i) => (
                  <span
                    key={i}
                    className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded-full"
                  >
                    {activity}
                  </span>
                ))}
                {activities.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    +{activities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => setOpen(true)}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2 rounded-lg transition-colors"
          >
            Explore Details
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-56 bg-gray-100">
              {listing.image_url ? (
                <Image
                  src={listing.image_url}
                  alt={listing.facility_name ?? 'Listing'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No image
                </div>
              )}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-950">
                {listing.facility_name}
              </h2>

              <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                <MapPin size={14} />
                <span>{listing.location || 'Location not specified'}</span>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mt-4">
                <p className="text-xs text-gray-600">Cost per Night</p>
                <p className="text-base font-semibold text-orange-700">{costDisplay}</p>
              </div>

              {activities.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-1">Activities</p>
                  <p className="text-sm text-gray-800">{activities.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}