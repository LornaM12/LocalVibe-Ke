'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Clock, X, Check, Lightbulb, Ban } from 'lucide-react'

type Destination = {
  id: string
  destination_name: string
  vibe_tags: string | null
  county: string | null
  nearest_town: string | null
  entrance_fee: string | null
  activity_type: string | null
  open_hours: string | null
  about: string | null
  tips_and_tricks: string | null
  prohibited_items: string | null
  image_url: string | null
}

export default function DestinationCard({ destination }: { destination: Destination }) {
  const [open, setOpen] = useState(false)

  const activities = destination.activity_type
    ? destination.activity_type.split(',').map((a) => a.trim()).filter(Boolean)
    : []

  const tips = destination.tips_and_tricks
    ? destination.tips_and_tricks.split(',').map((t) => t.trim()).filter(Boolean)
    : []

  const prohibited = destination.prohibited_items
    ? destination.prohibited_items.split(',').map((p) => p.trim()).filter(Boolean)
    : []

  const locationLabel = [destination.county, destination.nearest_town]
    .filter(Boolean)
    .join(', ')

  return (
    <>
      <div className="rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
        <div className="relative w-full h-48 bg-gray-100">
          {destination.image_url ? (
            <Image
              src={destination.image_url}
              alt={destination.destination_name}
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
            {destination.destination_name}
          </h2>

          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <MapPin size={14} />
            <span>{locationLabel || 'Location not specified'}</span>
          </div>

          {destination.entrance_fee && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
              <p className="text-xs text-gray-600">Entrance Fee</p>
              <p className="text-sm font-semibold text-orange-700">{destination.entrance_fee}</p>
            </div>
          )}

          {activities.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Features &amp; Activities</p>
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

          {destination.open_hours && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-3">
              <Clock size={14} />
              <span>{destination.open_hours}</span>
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
            className="bg-white rounded-xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-56 bg-gray-100">
              {destination.image_url ? (
                <Image
                  src={destination.image_url}
                  alt={destination.destination_name}
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
                {destination.destination_name}
              </h2>

              <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                <MapPin size={14} />
                <span>{locationLabel || 'Location not specified'}</span>
              </div>

              {destination.entrance_fee && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mt-4">
                  <p className="text-xs text-gray-600">Entrance Fee</p>
                  <p className="text-base font-semibold text-orange-700">{destination.entrance_fee}</p>
                </div>
              )}

              {destination.open_hours && (
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-3">
                  <Clock size={14} />
                  <span>{destination.open_hours}</span>
                </div>
              )}

              {destination.about && (
                <div className="mt-5">
                  <h3 className="text-sm font-bold text-blue-950 mb-1">About This Place</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{destination.about}</p>
                </div>
              )}

              {activities.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-sm font-bold text-blue-950 mb-2">Fun Activities</h3>
                  <ul className="space-y-1.5">
                    {activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check size={14} className="text-green-700 mt-0.5 shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tips.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-sm font-bold text-blue-950 mb-2 flex items-center gap-1">
                    <Lightbulb size={14} /> Tips &amp; Tricks
                  </h3>
                  <ul className="space-y-1.5">
                    {tips.map((tip, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {prohibited.length > 0 && (
                <div className="mt-5 bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-red-800 mb-2 flex items-center gap-1">
                    <Ban size={14} /> Prohibited Items &amp; Activities
                  </h3>
                  <ul className="space-y-1">
                    {prohibited.map((item, i) => (
                      <li key={i} className="text-sm text-red-700">
                        ✗ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}