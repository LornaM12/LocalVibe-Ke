import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deleteListing } from '@/app/admin/listings/actions'
import DeleteButton from '@/components/DeleteButton'
import { Pencil } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminListingsPage() {
  const supabase = await createClient()

  const { data: listings } = await supabase
    .from('listings_table')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Listings</h1>
          <p className="text-gray-600 mt-1">Manage all business listings in the system.</p>
        </div>
        <Link
          href="/admin/listings/new"
          className="bg-blue-900 text-white px-4 py-2 rounded-md font-semibold text-sm"
        >
          + Add Listing
        </Link>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm border-t min-w-[600px]">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Facility</th>
              <th className="py-2">Location</th>
              <th className="py-2">Cost/Night</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings?.map((l) => {
              const deleteWithId = deleteListing.bind(null, l.id)
              return (
                <tr key={l.id} className="border-b">
                  <td className="py-2">{l.facility_name}</td>
                  <td className="py-2">{l.location}</td>
                  <td className="py-2">{l.cost_per_night ? `KES ${l.cost_per_night}` : 'Free'}</td>
                  <td className="py-2 capitalize">{l.status}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/listings/${l.id}/edit`}
                        className="text-gray-600 hover:text-blue-900"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton onDelete={deleteWithId} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {(!listings || listings.length === 0) && (
        <p className="text-gray-500 text-center mt-10">No listings yet.</p>
      )}
    </div>
  )
}