import { getNotifications, onAuthenticateUser } from '@/actions/user';
import { getAllUserVideosNotInAnyFolders, getWorkspaceFolders, getWorkSpaces, verifyAccessToWebspace } from '@/actions/workspace';
import { redirect } from 'next/navigation';
import React from 'react';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from '@tanstack/react-query';
import Sidebar from '@/components/global/sidebar';
import GlobalHeader from '@/components/global/global-header';

type Props = {
    params: Promise<{ workspaceId: string }>
    children: React.ReactNode
}

const Layout = async ({ params , children } : Props) => {
    const {workspaceId} = await params;
    
    const auth = await onAuthenticateUser();
    if(!auth.user?.workspace) redirect('/auth/sign-in');
    if(!auth.user?.workspace.length) redirect('/auth/sign-in');

    const hasAccess = await verifyAccessToWebspace(workspaceId);

    if(hasAccess.status !== 200){
        redirect(`/dashboard/${auth.user?.workspace[0].id}`);
    }

    if(!hasAccess.data?.workspace) return <div>null</div>;

    const query = new QueryClient();
    await query.prefetchQuery({
        queryKey: ['workspace-folders', workspaceId],
        queryFn: () => getWorkspaceFolders(workspaceId),
    })
    await query.prefetchQuery({
        queryKey: ['user-videos', workspaceId],
        queryFn: () => getAllUserVideosNotInAnyFolders(workspaceId),
    })
    await query.prefetchQuery({
        queryKey: ['user-workspaces', auth.user.id],
        queryFn: () => getWorkSpaces(),
    });
    await query.prefetchQuery({
        queryKey: ['user-notifications', auth.user.id],
        queryFn: () => getNotifications(),
    });

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className='flex h-screen w-screen'>
                <Sidebar activeWorkspaceId={workspaceId} userId={auth.user.id} />
                <div className='w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden'>
                    <GlobalHeader workspace={hasAccess.data.workspace} />
                    <div className='mt-4'>{children}</div>
                </div>
            </div>
        </HydrationBoundary>
    );
};

export default Layout;