import { getUserProfile } from '@/actions/user'
import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/preview'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params: Promise<{videoId: string}>
}

const VideoPage = async ({params}: Props) => {
    const { videoId } = await params;
    const query = new QueryClient()
    
    await query.prefetchQuery({
        queryKey: ['preview-video', videoId],
        queryFn: () => getPreviewVideo(videoId),
    })

    await query.prefetchQuery({
        queryKey: ['user-profile'],
        queryFn: getUserProfile,
    })
    

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <VideoPreview videoId={videoId} />
        </HydrationBoundary>
    )
}

export default VideoPage