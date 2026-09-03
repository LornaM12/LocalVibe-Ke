import { createClient } from '@/lib/supabase/server'
import RoadtripCard from '@/components/RoadtripCard'

export const dynamic = 'force-dynamic'

export default async function RoadtripsPage() {
  const supabase = await createClient()

  const { data: roadtrips, error } = await supabase
    .from('roadtrips_table')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-950">Road Trips</h1>
      <p className="text-gray-600 mt-2">
        Join an organized road trip and explore Kenya with others.
      </p>

      {error && (
        <p className="text-red-600 mt-6">
          Something went wrong loading road trips. Please try again later.
        </p>
      )}

      {!error && (!roadtrips || roadtrips.length === 0) && (
        <div className="mt-16 text-center text-gray-500">
          <p className="text-lg">No road trips have been added yet.</p>
          <p className="text-sm mt-1">Check back soon!</p>
        </div>
      )}

      {roadtrips && roadtrips.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {roadtrips.map((trip) => (
            <RoadtripCard key={trip.id} roadtrip={trip} />
          ))}
        </div>
      )}
    </div>
  )
}