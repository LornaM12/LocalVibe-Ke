'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Upload, X } from 'lucide-react'

export default function ImageUpload({
  folder,
  defaultImageUrl,
}: {
  folder: 'destinations' | 'roadtrips' | 'listings'
  defaultImageUrl?: string | null
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImageUrl ?? null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const supabase = createClient()

    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('adventureapp_images')
      .upload(filePath, file)

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from('adventureapp_images')
      .getPublicUrl(filePath)

    setImageUrl(data.publicUrl)
    setUploading(false)
  }

  const handleRemove = () => {
    setImageUrl(null)
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Image</label>

      {/* Hidden input so the value submits with the form */}
      <input type="hidden" name="image_url" value={imageUrl ?? ''} />

      {imageUrl ? (
        <div className="relative w-full h-48 rounded-md overflow-hidden border">
          <Image src={imageUrl} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
          <Upload size={24} className="text-gray-400" />
          <span className="text-sm text-gray-500 mt-2">
            {uploading ? 'Uploading...' : 'Click to upload an image'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  )
}