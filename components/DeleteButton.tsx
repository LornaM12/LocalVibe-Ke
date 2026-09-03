'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'

export default function DeleteButton({
  onDelete,
}: {
  onDelete: () => Promise<void>
}) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (!confirm('Are you sure you want to delete this? This cannot be undone.')) {
      return
    }
    startTransition(() => {
      onDelete()
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-red-600 hover:text-red-800 disabled:opacity-50"
      aria-label="Delete"
    >
      <Trash2 size={16} />
    </button>
  )
}