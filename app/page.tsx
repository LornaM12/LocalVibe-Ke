import VibeSection from '@/components/VibeSection'
import HeroCarousel from '@/components/HeroCarousel'
import { createClient } from '@/lib/supabase/server'
import { Leaf, Binoculars, Sparkles, Users, CloudSun } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: featured } = await supabase
    .from('destinations_table')
    .select('id, destination_name, image_url')
    .eq('status', 'published')
    .not('image_url', 'is', null)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-950">Dashboard</h1>
      <p className="text-gray-600 mt-2">
        Discover local gems across Kenya, matched to your mood.
      </p>

      <div className="mt-6">
        <HeroCarousel slides={featured ?? []} />
      </div>

      <VibeSection
        title="Chill Greenery Spots"
        description="Perfect for peaceful nature escapes and relaxation"
        icon={<Leaf size={22} className="text-green-600" />}
        vibeKeyword="Chill"
      />

      <VibeSection
        title="Game Drives & Wildlife"
        description="Experience Kenya's incredible wildlife up close"
        icon={<Binoculars size={22} className="text-orange-600" />}
        vibeKeyword="Wildlife"
      />

      <VibeSection
        title="Other Fun Activities"
        description="Something different — from coffee tasting to art"
        icon={<Sparkles size={22} className="text-purple-600" />}
        excludeKeywords={['Chill', 'Wildlife']}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="border rounded-xl p-6 bg-white">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-blue-950" />
            <h2 className="text-lg font-bold text-blue-950">Find a Travel Group</h2>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Coming soon — connect with other travelers heading your way.
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <div className="flex items-center gap-2">
            <CloudSun size={20} className="text-blue-950" />
            <h2 className="text-lg font-bold text-blue-950">Local Weather</h2>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Coming soon — accurate forecasts for your destinations.
          </p>
        </div>
      </div>
    </div>
  )
}