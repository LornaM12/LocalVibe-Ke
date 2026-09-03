'use client'

import { useTransition } from 'react'
import { updateUserRole } from '@/app/admin/users/actions'

export default function RoleSelect({
  userId,
  currentRole,
}: {
  userId: string
  currentRole: string
}) {
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value
    startTransition(() => {
      updateUserRole(userId, newRole)
    })
  }

  return (
    <select
      defaultValue={currentRole}
      onChange={handleChange}
      disabled={isPending}
      className="border rounded-md px-2 py-1 text-sm disabled:opacity-50"
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  )
}