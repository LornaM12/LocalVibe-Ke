import { createDestination } from '@/app/admin/destinations/actions'
import ImageUpload from '@/components/ImageUpload'
import { KENYA_COUNTIES } from '@/lib/kenyaCounties'

export default async function NewDestinationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-blue-950">Add Destination</h1>
      <p className="text-gray-600 mt-1">Enter the details manually below.</p>

      {params.error && (
        <p className="text-red-600 mt-4 text-sm">{params.error}</p>
      )}

      <form className="space-y-5 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Destination Name</label>
          <input name="destination_name" required className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Vibe <span className="text-gray-400">(comma-separated, e.g. Chill, Nature)</span>
          </label>
          <input name="vibe_tags" className="w-full border rounded-md px-3 py-2" placeholder="Chill, Wildlife, Adventure..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">County</label>
            <select name="county" required className="w-full border rounded-md px-3 py-2">
              <option value="">Select county</option>
              {KENYA_COUNTIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Town</label>
            <input name="nearest_town" className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Entrance Fee <span className="text-gray-400">(e.g. Ksh 100 (Adults), Ksh 50 (Children))</span>
          </label>
          <input name="entrance_fee" className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Activities <span className="text-gray-400">(comma-separated)</span>
          </label>
          <input name="activity_type" className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Open Hours <span className="text-gray-400">(e.g. 6:00 AM - 6:00 PM)</span>
          </label>
          <input name="open_hours" className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">About This Place</label>
          <textarea name="about" rows={4} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tips &amp; Tricks <span className="text-gray-400">(comma-separated)</span>
          </label>
          <textarea name="tips_and_tricks" rows={3} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Prohibited Items <span className="text-gray-400">(comma-separated)</span>
          </label>
          <textarea name="prohibited_items" rows={2} className="w-full border rounded-md px-3 py-2" />
        </div>

        <ImageUpload folder="destinations" />

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" className="w-full border rounded-md px-3 py-2">
            <option value="draft">Draft (hidden from public)</option>
            <option value="published">Published (visible to public)</option>
          </select>
        </div>

        <button
          formAction={createDestination}
          className="bg-blue-900 text-white px-6 py-2 rounded-md font-semibold"
        >
          Save Destination
        </button>
      </form>
    </div>
  )
}