import { createClient } from '@/lib/supabase/server'
import DestinationCard from '@/components/DestinationCard'

export const dynamic = 'force-dynamic'

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ vibe?: string }>
}) {
  const { vibe } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('destinations_table')
    .select('*')
    .eq('status', 'published')

  if (vibe) {
    query = query.ilike('vibe_tags', `%${vibe}%`)
  }

  const { data: destinations, error } = await query.order('created_at', { ascending: false })

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-950">
        {vibe ? `${vibe} Destinations` : 'Destinations'}
      </h1>
      <p className="text-gray-600 mt-2">
        Discover local gems and hidden spots across Kenya.
      </p>

      {error && (
        <p className="text-red-600 mt-6">
          Something went wrong loading destinations. Please try again later.
        </p>
      )}

      {!error && (!destinations || destinations.length === 0) && (
        <div className="mt-16 text-center text-gray-500">
          <p className="text-lg">No destinations found.</p>
          <p className="text-sm mt-1">Check back soon!</p>
        </div>
      )}

      {destinations && destinations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      )}
    </div>
  )
}