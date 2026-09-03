import { createClient } from '@/lib/supabase/server'
import { updateListing } from '@/app/admin/listings/actions'
import { notFound } from 'next/navigation'
import ImageUpload from '@/components/ImageUpload'

export default async function EditListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from('listings_table')
    .select('*')
    .eq('id', id)
    .single()

  if (!listing) notFound()

  const updateWithId = updateListing.bind(null, id)

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-blue-950">Edit Listing</h1>

      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

      <form className="space-y-5 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Facility Name</label>
          <input name="facility_name" defaultValue={listing.facility_name ?? ''} required className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cost per Night (KES)</label>
          <input name="cost_per_night" type="number" step="0.01" defaultValue={listing.cost_per_night ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Activities <span className="text-gray-400">(comma-separated)</span>
          </label>
          <input name="activities" defaultValue={listing.activities ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input name="location" defaultValue={listing.location ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <ImageUpload folder="listings" defaultImageUrl={listing.image_url} />

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" defaultValue={listing.status} className="w-full border rounded-md px-3 py-2">
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