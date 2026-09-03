import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deleteRoadtrip } from '@/app/admin/roadtrips/actions'
import DeleteButton from '@/components/DeleteButton'
import { Pencil } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminRoadtripsPage() {
  const supabase = await createClient()

  const { data: roadtrips } = await supabase
    .from('roadtrips_table')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Road Trips</h1>
          <p className="text-gray-600 mt-1">Manage all road trips in the system.</p>
        </div>
        <Link
          href="/admin/roadtrips/new"
          className="bg-blue-900 text-white px-4 py-2 rounded-md font-semibold text-sm"
        >
          + Add Road Trip
        </Link>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm border-t min-w-[700px]">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Organizer</th>
              <th className="py-2">Destination</th>
              <th className="py-2">Departure</th>
              <th className="py-2">Fee</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roadtrips?.map((r) => {
              const deleteWithId = deleteRoadtrip.bind(null, r.id)
              return (
                <tr key={r.id} className="border-b">
                  <td className="py-2">{r.trip_organizer}</td>
                  <td className="py-2">{r.destination_name}</td>
                  <td className="py-2">
                    {r.departure_date} {r.departure_time}
                  </td>
                  <td className="py-2">{r.fee ? `KES ${r.fee}` : 'Free'}</td>
                  <td className="py-2 capitalize">{r.status}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/roadtrips/${r.id}/edit`}
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

      {(!roadtrips || roadtrips.length === 0) && (
        <p className="text-gray-500 text-center mt-10">No road trips yet.</p>
      )}
    </div>
  )
}