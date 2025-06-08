import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    title: string
    id: string
    source: string
    description: string
}

const RichLink = ({ title, id, source, description }: Props) => {
    const copyRichText = () => {
        const originalTitle = title;

        const thumbnail = `
      <a href="${process.env.NEXT_PUBLIC_HOST_URL}/preview/${id}" 
         style="
           display: block; 
           padding: 16px; 
           text-decoration: none; 
           background: #fff; 
           border-radius: 12px; 
           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
           transition: transform 0.2s ease;
         "
         onmouseover="this.style.transform='scale(1.02)'"
         onmouseout="this.style.transform='scale(1)'"
      >
        <h3 style="
              margin: 0 0 8px 0; 
              font-size: 18px; 
              color: #111;"
        >
          ${originalTitle}
        </h3>
        <p style="
              margin: 0 0 12px 0; 
              font-size: 14px; 
              color: #555;"
        >
          ${description}
        </p>
        <video width="100%" style="border-radius: 8px;" controls>
          <source 
            type="video/webm" 
            src="${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}" 
          />
        </video>
      </a>`
        const thumbnailBlob = new Blob([thumbnail], { type: 'text/html'});
        const blobTitle = new Blob([originalTitle, description, `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}`], { type: 'text/plain'});
        const data = [
            new ClipboardItem({
                ['text/plain']: blobTitle,
                ['text/html']: thumbnailBlob,
            }),
        ]
        navigator.clipboard.write(data).then(() => {
            return toast('Embedded Link Copied', {
                description: 'Successfully copied embedded link',
            })
        })
    }
    return (
        <Button
        onClick={copyRichText}
        className="rounded-full"
        >
        Get Embedded Code
        </Button>
    )
}

export default RichLink;