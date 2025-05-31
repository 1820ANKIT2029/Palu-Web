//  reference to prefetch query

query = [
    {
        queryKey: ['workspace-folders', workspaceId],
        queryFn: () => getWorkspaceFolders(workspaceId),
    },
    {
        queryKey: ['user-videos', workspaceId],
        queryFn: () => getAllUserVideos(workspaceId),
    },
    {
        queryKey: ['user-workspaces', auth.user.id],
        queryFn: () => getWorkSpaces(),
    },
    {
        queryKey: ['user-notifications', auth.user.id],
        queryFn: () => getNotifications(),
    },
    {
        queryKey: ['folder-videos', folderId],
        queryFn: () => getAllUserVideos(folderId),
    },
    {
        queryKey: ['folder-videos', workspaceId],
        queryFn: () => getAllUserVideosNotInAnyFolders(workspaceId),
    },
    {
        queryKey: ['folder-info', folderId],
        queryFn: () => getFolderInfo(folderId),
    },
    {
        queryKey: ['video-comments', videoId],
        queryFn: () => getVideoComments(videoId),
    },
    {
        queryKey: ['preview-video', videoId], 
        queryFn: ()=> getPreviewVideo(videoId)
    },
    {
        queryKey: ['user-profile', userId], 
        queryFn: getUserProfile
    },
]
