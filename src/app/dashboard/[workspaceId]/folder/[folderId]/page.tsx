import { getAllUserVideos, getFolderInfo } from '@/actions/workspace'
import FolderInfo from '@/components/global/folders/folder-info'
import Videos from '@/components/global/videos'
import { dehydrate, HydrationBoundary, Query, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
  params: Promise<{
    folderId: string
    workspaceId: string
  }>
}

const page = async ({ params }: Props) => {
  const { folderId, workspaceId } = await params;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ['folder-videos', folderId],
    queryFn: () => getAllUserVideos(folderId),
  });

  await query.prefetchQuery({
    queryKey: ['folder-info', folderId],
    queryFn: () => getFolderInfo(folderId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <FolderInfo folderId={folderId} />
      <Videos workspaceId={workspaceId} folderId={folderId} videosKey="folder-videos" />
    </HydrationBoundary>
  )
}

export default page