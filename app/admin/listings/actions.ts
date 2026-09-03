'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createListing(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const facility_name = formData.get('facility_name') as string
  const cost_per_night = formData.get('cost_per_night') as string
  const activities = formData.get('activities') as string
  const location = formData.get('location') as string
  const image_url = formData.get('image_url') as string
  const status = formData.get('status') as string

  const { error } = await supabase.from('listings_table').insert({
    facility_name,
    cost_per_night: cost_per_night ? Number(cost_per_night) : null,
    activities,
    location,
    image_url,
    status: status || 'draft',
    created_by: user?.id,
  })

  if (error) {
    redirect('/admin/listings/new?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/listings')
  revalidatePath('/admin/listings')
  redirect('/admin/listings')
}

export async function updateListing(id: string, formData: FormData) {
  const supabase = await createClient()

  const facility_name = formData.get('facility_name') as string
  const cost_per_night = formData.get('cost_per_night') as string
  const activities = formData.get('activities') as string
  const location = formData.get('location') as string
  const image_url = formData.get('image_url') as string
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('listings_table')
    .update({
      facility_name,
      cost_per_night: cost_per_night ? Number(cost_per_night) : null,
      activities,
      location,
      image_url,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    redirect(`/admin/listings/${id}/edit?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/listings')
  revalidatePath('/admin/listings')
  redirect('/admin/listings')
}

export async function deleteListing(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('listings_table')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/listings')
  revalidatePath('/admin/listings')
}