import { LayoutDashboard, Mountain, Car, Store, Settings } from 'lucide-react'

export const NAV_LINKS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'destinations', label: 'Destinations', href: '/destinations', icon: Mountain },
  { key: 'roadtrips', label: 'Upcoming Trips', href: '/roadtrips', icon: Car },
  { key: 'listings', label: 'Listings', href: '/listings', icon: Store },
  { key: 'settings', label: 'Settings', href: '/profile', icon: Settings },
]