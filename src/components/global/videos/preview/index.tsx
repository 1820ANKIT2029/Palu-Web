'use client'

import { getPreviewVideo, sendEmailForFirstView } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { VideoProps } from '@/types/index.type'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import CopyLink from '../copy-link'
import RichLink from '../rich-link'
import { truncateString } from '@/lib/utils'
import { Download } from 'lucide-react'
import TabMenu from '../../tabs'
import AiTools from '../../ai-tools'
import VideoTranscript from '../../video-transcript'
import Activities from '../../activities'
import EditVideo from '../edit'

type Props = {
    videoId: string
}

const VideoPreview = ({ videoId }: Props) => {
    const router = useRouter();
    const { data, isFetched, isFetching } = useQueryData(['preview-video', videoId], () => getPreviewVideo(videoId));

    useEffect(() => {
        if (isFetched && data && (data as VideoProps).status !== 200) {
            router.push('/')
        }
    }, [isFetched, data, router])

    useEffect(() => {
        if (isFetched && data) {
            const { data: video } = data as VideoProps
            if (video?.views === 0) {
                sendEmailForFirstView(videoId)
            }
        }
    }, [isFetched, data, videoId])

    if (isFetching || !data) {
        return null
    }

    if (isFetching || !data) {
        return null;
    }
    const { data: video, status, author } = data as VideoProps;

    let daysAgo;

    if (video) {
        daysAgo = Math.floor(
            (new Date().getTime() - video.createdAt.getTime()) / (24 * 60 * 60 * 1000)
        )
    }

    if (isFetched && status === 200) {
        return (
            <div className='grid grid-cols-1 p-10 lg:py-10 overflow-y-auto gap-5'>
                <div className='flex flex-col lg:col-span-2 gap-y-10'>
                    <div>
                        <div className='flex gap-x-5 items-start justify-between'>
                            <h2 className='text-white text-4xl font-bold'>{video.title}</h2>
                            {author ? (
                                <EditVideo
                                    videoId={videoId}
                                    title={video.title as string}
                                    description={video.description as string}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                        <span className='flex gap-x-3 mt-2'>
                            <p className='text-[#9D9D9D] capitalize'>
                                {video.User?.firstname} {video.User?.lastname}
                            </p>
                            <p className='text-[#707070]'>
                                {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
                            </p>
                        </span>
                    </div>
                    <video
                        preload='metadata'
                        className='w-full aspect-video opacity-50 rounded-xl'
                        controls
                    >
                        <source
                            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}#1`}
                        />
                    </video>
                    <div className='flex flex-col text-2xl gap-y-4'>
                        <div className="flex gap-x-5 items-center justify-between">
                            <p className='text-[#BDBDBD] text-semibold'>Description</p>
                            {/* { author ? (
                            <EditVideo
                                videoId={videoId}
                                title={video.title as string}
                                description={video.description as string}
                            />
                        ) : (
                            <></>
                        )} */}
                        </div>
                        <p className='text-[#9D9D9D] text-lg text-medium'>
                            {video.description}
                        </p>
                    </div>
                </div>
                <div className="lg:col-span-1 flex flex-col gap-y-16">
                    <div className="flex justify-end gap-x-3 items-center">
                        <CopyLink
                            variant='outline'
                            className='rounded-full bg-transparent px-10'
                            videoId={videoId}
                        />
                        <RichLink
                            description={truncateString(video.description as string, 150)}
                            id={videoId}
                            source={video.source}
                            title={video.title as string}
                        />
                        <Download className="text-[#4d4c4c]" />
                    </div>
                    <div>
                        <TabMenu
                            defaultValue="Ai tools"
                            triggers={['Ai tools', 'Transcript', 'Activity']}
                        >
                            <AiTools
                                videoId={videoId}
                                trial={video.User?.trial!}
                                plan={video.User?.subscription?.plan!}
                            />
                            <VideoTranscript transcript={video.summery!} />
                            <Activities
                                author={video.User?.firstname as string}
                                videoId={videoId}
                            />
                        </TabMenu>
                    </div>
                </div>

            </div>
        )
    }
    else {
        return <div>loading...</div>
    }
}

export default VideoPreview