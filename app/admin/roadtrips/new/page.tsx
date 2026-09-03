import { createRoadtrip } from '@/app/admin/roadtrips/actions'
import ImageUpload from '@/components/ImageUpload'

export default async function NewRoadtripPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-blue-950">Add Road Trip</h1>
      <p className="text-gray-600 mt-1">Enter the details manually below.</p>

      {params.error && (
        <p className="text-red-600 mt-4 text-sm">{params.error}</p>
      )}

      <form className="space-y-5 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Trip Organizer</label>
          <input name="trip_organizer" required className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fee (KES)</label>
          <input name="fee" type="number" step="0.01" className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Destination Name</label>
          <input name="destination_name" className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Transport Mode</label>
          <input name="transport_mode" placeholder="e.g. Bus, Van, Private car" className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pickup Point</label>
          <input name="pickup_point" className="w-full border rounded-md px-3 py-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Departure Date</label>
            <input name="departure_date" type="date" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Departure Time</label>
            <input name="departure_time" placeholder="e.g. 7:00 AM" className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Other Activities <span className="text-gray-400">(comma-separated)</span>
          </label>
          <input name="other_activities" className="w-full border rounded-md px-3 py-2" />
        </div>

                <div>
          <label className="block text-sm font-medium mb-1">
            What&apos;s Provided <span className="text-gray-400">(e.g. Transport, Lunch, Guide)</span>
          </label>
          <textarea
            name="what_provided"
            rows={3}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            What to Carry <span className="text-gray-400">(e.g. Water bottle, comfortable shoes)</span>
          </label>
          <textarea
            name="what_to_carry"
            rows={3}
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
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Deadline</label>
            <input
              name="payment_deadline"
              type="date"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        <ImageUpload folder="roadtrips" />

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" className="w-full border rounded-md px-3 py-2">
            <option value="draft">Draft (hidden from public)</option>
            <option value="published">Published (visible to public)</option>
          </select>
        </div>

        <button
          formAction={createRoadtrip}
          className="bg-blue-900 text-white px-6 py-2 rounded-md font-semibold"
        >
          Save Road Trip
        </button>
      </form>
    </div>
  )
}