import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DestinationCard from '@/components/DestinationCard'

export default async function VibeSection({
  title,
  description,
  icon,
  vibeKeyword,
  excludeKeywords,
}: {
  title: string
  description: string
  icon: React.ReactNode
  vibeKeyword?: string
  excludeKeywords?: string[]
}) {
  const supabase = await createClient()

  let query = supabase
    .from('destinations_table')
    .select('*')
    .eq('status', 'published')

  if (vibeKeyword) {
    query = query.ilike('vibe_tags', `%${vibeKeyword}%`)
  }

  if (excludeKeywords) {
    for (const keyword of excludeKeywords) {
      query = query.or(`vibe_tags.is.null,vibe_tags.not.ilike.%${keyword}%`)
    }
  }

  const { data: destinations } = await query
    .order('created_at', { ascending: false })
    .limit(3)

  if (!destinations || destinations.length === 0) {
    return null
  }

  const viewAllHref = vibeKeyword
    ? `/destinations?vibe=${encodeURIComponent(vibeKeyword)}`
    : '/destinations'

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <h2 className="text-xl font-bold text-blue-950">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <Link
          href={viewAllHref}
          className="text-orange-600 text-sm font-semibold hover:underline flex items-center gap-1"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </section>
  )
}