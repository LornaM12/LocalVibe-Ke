'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Calendar, Clock, X } from 'lucide-react'

type Roadtrip = {
  id: string
  trip_organizer: string | null
  fee: number | null
  destination_name: string | null
  transport_mode: string | null
  pickup_point: string | null
  departure_date: string | null
  departure_time: string | null
  other_activities: string | null
  what_provided: string | null
  what_to_carry: string | null
  booking_amount: number | null
  payment_deadline: string | null
  image_url: string | null
}

export default function RoadtripCard({ roadtrip }: { roadtrip: Roadtrip }) {
  const [open, setOpen] = useState(false)

  const activities = roadtrip.other_activities
    ? roadtrip.other_activities.split(',').map((a) => a.trim()).filter(Boolean)
    : []

  const feeDisplay = roadtrip.fee ? `KES ${roadtrip.fee}` : 'Free'

  return (
    <>
      <div className="rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
        <div className="relative w-full h-48 bg-gray-100">
          {roadtrip.image_url ? (
            <Image
              src={roadtrip.image_url}
              alt={roadtrip.destination_name ?? 'Road trip'}
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
            {roadtrip.destination_name}
          </h2>

          <p className="text-sm text-gray-600 mt-1">
            Organized by {roadtrip.trip_organizer}
          </p>

          <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
            <Calendar size={14} />
            <span>{roadtrip.departure_date || 'Date TBA'}</span>
            <Clock size={14} className="ml-2" />
            <span>{roadtrip.departure_time || 'Time TBA'}</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
            <p className="text-xs text-gray-600">Fee</p>
            <p className="text-sm font-semibold text-orange-700">{feeDisplay}</p>
          </div>

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
              {roadtrip.image_url ? (
                <Image
                  src={roadtrip.image_url}
                  alt={roadtrip.destination_name ?? 'Road trip'}
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
                {roadtrip.destination_name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Organized by {roadtrip.trip_organizer}
              </p>

              <div className="flex items-center gap-1 text-sm text-gray-600 mt-3">
                <MapPin size={14} />
                <span>Pickup: {roadtrip.pickup_point || 'Not specified'}</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <Calendar size={14} />
                <span>{roadtrip.departure_date || 'Date TBA'}</span>
                <Clock size={14} className="ml-2" />
                <span>{roadtrip.departure_time || 'Time TBA'}</span>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Transport: {roadtrip.transport_mode || 'Not specified'}
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mt-4">
                <p className="text-xs text-gray-600">Fee</p>
                <p className="text-base font-semibold text-orange-700">{feeDisplay}</p>
              </div>

              {activities.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-1">Other Activities</p>
                  <p className="text-sm text-gray-800">{activities.join(', ')}</p>
                </div>
              )}

              {roadtrip.what_provided && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-1">What&apos;s Provided</p>
                  <p className="text-sm text-gray-800 whitespace-pre-line">{roadtrip.what_provided}</p>
                </div>
              )}

              {roadtrip.what_to_carry && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-1">What to Carry</p>
                  <p className="text-sm text-gray-800 whitespace-pre-line">{roadtrip.what_to_carry}</p>
                </div>
              )}

              {(roadtrip.booking_amount || roadtrip.payment_deadline) && (
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mt-4">
                  {roadtrip.booking_amount && (
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Booking Amount:</span> KES {roadtrip.booking_amount}
                    </p>
                  )}
                  {roadtrip.payment_deadline && (
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-semibold">Payment Deadline:</span> {roadtrip.payment_deadline}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}