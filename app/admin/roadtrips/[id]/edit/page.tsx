import { createClient } from '@/lib/supabase/server'
import { updateRoadtrip } from '@/app/admin/roadtrips/actions'
import { notFound } from 'next/navigation'
import ImageUpload from '@/components/ImageUpload'

export default async function EditRoadtripPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams
  const supabase = await createClient()

  const { data: roadtrip } = await supabase
    .from('roadtrips_table')
    .select('*')
    .eq('id', id)
    .single()

  if (!roadtrip) notFound()

  const updateWithId = updateRoadtrip.bind(null, id)

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-blue-950">Edit Road Trip</h1>

      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

      <form className="space-y-5 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Trip Organizer</label>
          <input name="trip_organizer" defaultValue={roadtrip.trip_organizer ?? ''} required className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fee (KES)</label>
          <input name="fee" type="number" step="0.01" defaultValue={roadtrip.fee ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Destination Name</label>
          <input name="destination_name" defaultValue={roadtrip.destination_name ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Transport Mode</label>
          <input name="transport_mode" defaultValue={roadtrip.transport_mode ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pickup Point</label>
          <input name="pickup_point" defaultValue={roadtrip.pickup_point ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Departure Date</label>
            <input name="departure_date" type="date" defaultValue={roadtrip.departure_date ?? ''} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Departure Time</label>
            <input name="departure_time" defaultValue={roadtrip.departure_time ?? ''} className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Other Activities <span className="text-gray-400">(comma-separated)</span>
          </label>
          <input name="other_activities" defaultValue={roadtrip.other_activities ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

                <div>
          <label className="block text-sm font-medium mb-1">What&apos;s Provided</label>
          <textarea
            name="what_provided"
            rows={3}
            defaultValue={roadtrip.what_provided ?? ''}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">What to Carry</label>
          <textarea
            name="what_to_carry"
            rows={3}
            defaultValue={roadtrip.what_to_carry ?? ''}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Booking Amount (KES)</label>
            <input
              name="booking_amount"
              type="number"
              step="0.01"
              defaultValue={roadtrip.booking_amount ?? ''}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Deadline</label>
            <input
              name="payment_deadline"
              type="date"
              defaultValue={roadtrip.payment_deadline ?? ''}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        <ImageUpload folder="roadtrips" defaultImageUrl={roadtrip.image_url} />

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" defaultValue={roadtrip.status} className="w-full border rounded-md px-3 py-2">
            <option value="draft">Draft (hidden from public)</option>
            <option value="published">Published (visible to public)</option>
          </select>
        </div>

        <button
          formAction={updateWithId}
          className="bg-blue-900 text-white px-6 py-2 rounded-md font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}