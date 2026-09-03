import { createClient } from '@/lib/supabase/server'
import { updateDestination } from '@/app/admin/destinations/actions'
import { notFound } from 'next/navigation'
import ImageUpload from '@/components/ImageUpload'
import { KENYA_COUNTIES } from '@/lib/kenyaCounties'

export default async function EditDestinationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams
  const supabase = await createClient()

  const { data: destination } = await supabase
    .from('destinations_table')
    .select('*')
    .eq('id', id)
    .single()

  if (!destination) notFound()

  const updateWithId = updateDestination.bind(null, id)

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-blue-950">Edit Destination</h1>

      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

      <form className="space-y-5 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Destination Name</label>
          <input name="destination_name" defaultValue={destination.destination_name} required className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Vibe <span className="text-gray-400">(comma-separated)</span>
          </label>
          <input name="vibe_tags" defaultValue={destination.vibe_tags ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">County</label>
            <select name="county" defaultValue={destination.county ?? ''} required className="w-full border rounded-md px-3 py-2">
              <option value="">Select county</option>
              {KENYA_COUNTIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Town</label>
            <input name="nearest_town" defaultValue={destination.nearest_town ?? ''} className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Entrance Fee</label>
          <input name="entrance_fee" defaultValue={destination.entrance_fee ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Activities <span className="text-gray-400">(comma-separated)</span>
          </label>
          <input name="activity_type" defaultValue={destination.activity_type ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Open Hours</label>
          <input name="open_hours" defaultValue={destination.open_hours ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">About This Place</label>
          <textarea name="about" rows={4} defaultValue={destination.about ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tips &amp; Tricks <span className="text-gray-400">(comma-separated)</span>
          </label>
          <textarea name="tips_and_tricks" rows={3} defaultValue={destination.tips_and_tricks ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Prohibited Items <span className="text-gray-400">(comma-separated)</span>
          </label>
          <textarea name="prohibited_items" rows={2} defaultValue={destination.prohibited_items ?? ''} className="w-full border rounded-md px-3 py-2" />
        </div>

        <ImageUpload folder="destinations" defaultImageUrl={destination.image_url} />

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" defaultValue={destination.status} className="w-full border rounded-md px-3 py-2">
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