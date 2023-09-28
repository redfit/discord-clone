'use client'

import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthings'
import '@uploadthing/react/styles.css'
import { X } from 'lucide-react'

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: 'messageFile' | 'serverImage'
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Uploaded image" className="rounded-full" />
        <button
          onClick={() => onChange('')}
          type="button"
          className="absolute bg-rose-500 text-white p-1 rounded-full top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
          console.log(error)
        }}
      />
    </>
  )
}

export default FileUpload
