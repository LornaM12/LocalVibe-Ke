'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createRoadtrip(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const trip_organizer = formData.get('trip_organizer') as string
  const fee = formData.get('fee') as string
  const destination_name = formData.get('destination_name') as string
  const transport_mode = formData.get('transport_mode') as string
  const pickup_point = formData.get('pickup_point') as string
  const departure_date = formData.get('departure_date') as string
  const departure_time = formData.get('departure_time') as string
  const other_activities = formData.get('other_activities') as string
  const what_provided = formData.get('what_provided') as string
  const what_to_carry = formData.get('what_to_carry') as string
  const booking_amount = formData.get('booking_amount') as string
  const payment_deadline = formData.get('payment_deadline') as string
  const image_url = formData.get('image_url') as string
  const status = formData.get('status') as string

  const { error } = await supabase.from('roadtrips_table').insert({
    trip_organizer,
    fee: fee ? Number(fee) : null,
    destination_name,
    transport_mode,
    pickup_point,
    departure_date: departure_date || null,
    departure_time,
    other_activities,
    what_provided,
    what_to_carry,
    booking_amount: booking_amount ? Number(booking_amount) : null,
    payment_deadline: payment_deadline || null,
    image_url,
    status: status || 'draft',
    created_by: user?.id,
  })

  if (error) {
    redirect('/admin/roadtrips/new?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/roadtrips')
  revalidatePath('/admin/roadtrips')
  redirect('/admin/roadtrips')
}

export async function updateRoadtrip(id: string, formData: FormData) {
  const supabase = await createClient()

  const trip_organizer = formData.get('trip_organizer') as string
  const fee = formData.get('fee') as string
  const destination_name = formData.get('destination_name') as string
  const transport_mode = formData.get('transport_mode') as string
  const pickup_point = formData.get('pickup_point') as string
  const departure_date = formData.get('departure_date') as string
  const departure_time = formData.get('departure_time') as string
  const other_activities = formData.get('other_activities') as string
  const what_provided = formData.get('what_provided') as string
  const what_to_carry = formData.get('what_to_carry') as string
  const booking_amount = formData.get('booking_amount') as string
  const payment_deadline = formData.get('payment_deadline') as string
  const image_url = formData.get('image_url') as string
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('roadtrips_table')
    .update({
      trip_organizer,
      fee: fee ? Number(fee) : null,
      destination_name,
      transport_mode,
      pickup_point,
      departure_date: departure_date || null,
      departure_time,
      other_activities,
      what_provided,
      what_to_carry,
      booking_amount: booking_amount ? Number(booking_amount) : null,
      payment_deadline: payment_deadline || null,
      image_url,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    redirect(`/admin/roadtrips/${id}/edit?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/roadtrips')
  revalidatePath('/admin/roadtrips')
  redirect('/admin/roadtrips')
}

export async function deleteRoadtrip(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('roadtrips_table')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/roadtrips')
  revalidatePath('/admin/roadtrips')
}