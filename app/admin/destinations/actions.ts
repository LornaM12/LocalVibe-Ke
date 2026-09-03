'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createDestination(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const destination_name = formData.get('destination_name') as string
  const vibe_tags = formData.get('vibe_tags') as string
  const county = formData.get('county') as string
  const nearest_town = formData.get('nearest_town') as string
  const entrance_fee = formData.get('entrance_fee') as string
  const activity_type = formData.get('activity_type') as string
  const open_hours = formData.get('open_hours') as string
  const about = formData.get('about') as string
  const tips_and_tricks = formData.get('tips_and_tricks') as string
  const prohibited_items = formData.get('prohibited_items') as string
  const image_url = formData.get('image_url') as string
  const status = formData.get('status') as string

  const { error } = await supabase.from('destinations_table').insert({
    destination_name,
    vibe_tags,
    county,
    nearest_town,
    entrance_fee,
    activity_type,
    open_hours,
    about,
    tips_and_tricks,
    prohibited_items,
    image_url,
    status: status || 'draft',
    created_by: user?.id,
  })

  if (error) {
    redirect('/admin/destinations/new?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/destinations')
  revalidatePath('/')
  revalidatePath('/admin/destinations')
  redirect('/admin/destinations')
}

export async function updateDestination(id: string, formData: FormData) {
  const supabase = await createClient()

  const destination_name = formData.get('destination_name') as string
  const vibe_tags = formData.get('vibe_tags') as string
  const county = formData.get('county') as string
  const nearest_town = formData.get('nearest_town') as string
  const entrance_fee = formData.get('entrance_fee') as string
  const activity_type = formData.get('activity_type') as string
  const open_hours = formData.get('open_hours') as string
  const about = formData.get('about') as string
  const tips_and_tricks = formData.get('tips_and_tricks') as string
  const prohibited_items = formData.get('prohibited_items') as string
  const image_url = formData.get('image_url') as string
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('destinations_table')
    .update({
      destination_name,
      vibe_tags,
      county,
      nearest_town,
      entrance_fee,
      activity_type,
      open_hours,
      about,
      tips_and_tricks,
      prohibited_items,
      image_url,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    redirect(`/admin/destinations/${id}/edit?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/destinations')
  revalidatePath('/')
  revalidatePath('/admin/destinations')
  redirect('/admin/destinations')
}

export async function deleteDestination(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('destinations_table')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/destinations')
  revalidatePath('/')
  revalidatePath('/admin/destinations')
}