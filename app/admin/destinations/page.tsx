import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deleteDestination } from '@/app/admin/destinations/actions'
import DeleteButton from '@/components/DeleteButton'
import { Pencil } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDestinationsPage() {
  const supabase = await createClient()

  const { data: destinations } = await supabase
    .from('destinations_table')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Destinations</h1>
          <p className="text-gray-600 mt-1">Manage all destinations in the system.</p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="bg-blue-900 text-white px-4 py-2 rounded-md font-semibold text-sm"
        >
          + Add Destination
        </Link>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm border-t min-w-[600px]">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Town</th>
              <th className="py-2">Fee</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations?.map((d) => {
              const deleteWithId = deleteDestination.bind(null, d.id)
              return (
                <tr key={d.id} className="border-b">
                  <td className="py-2">{d.destination_name}</td>
                  <td className="py-2">{d.nearest_town}</td>
                  <td className="py-2">{d.entrance_fee ? `KES ${d.entrance_fee}` : 'Free'}</td>
                  <td className="py-2 capitalize">{d.status}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/destinations/${d.id}/edit`}
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

      {(!destinations || destinations.length === 0) && (
        <p className="text-gray-500 text-center mt-10">No destinations yet.</p>
      )}
    </div>
  )
}