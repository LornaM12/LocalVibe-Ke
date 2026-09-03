import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'

export const dynamic = 'force-dynamic'

export default async function ListingsPage() {
  const supabase = await createClient()

  const { data: listings, error } = await supabase
    .from('listings_table')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-950">Listings</h1>
      <p className="text-gray-600 mt-2">
        Places to stay
      </p>

      {error && (
        <p className="text-red-600 mt-6">
          Something went wrong loading listings. Please try again later.
        </p>
      )}

      {!error && (!listings || listings.length === 0) && (
        <div className="mt-16 text-center text-gray-500">
          <p className="text-lg">No listings have been added yet.</p>
          <p className="text-sm mt-1">Check back soon!</p>
        </div>
      )}

      {listings && listings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}