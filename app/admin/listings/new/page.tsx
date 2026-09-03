import { createListing } from '@/app/admin/listings/actions'
import ImageUpload from '@/components/ImageUpload'

export default async function NewListingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-blue-950">Add Listing</h1>
      <p className="text-gray-600 mt-1">Enter the details manually below.</p>

      {params.error && (
        <p className="text-red-600 mt-4 text-sm">{params.error}</p>
      )}

      <form className="space-y-5 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Facility Name</label>
          <input name="facility_name" required className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cost per Night (KES)</label>
          <input name="cost_per_night" type="number" step="0.01" className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Activities <span className="text-gray-400">(comma-separated)</span>
          </label>
          <input name="activities" className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input name="location" className="w-full border rounded-md px-3 py-2" />
        </div>

        <ImageUpload folder="listings" />

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" className="w-full border rounded-md px-3 py-2">
            <option value="draft">Draft (hidden from public)</option>
            <option value="published">Published (visible to public)</option>
          </select>
        </div>

        <button
          formAction={createListing}
          className="bg-blue-900 text-white px-6 py-2 rounded-md font-semibold"
        >
          Save Listing
        </button>
      </form>
    </div>
  )
}