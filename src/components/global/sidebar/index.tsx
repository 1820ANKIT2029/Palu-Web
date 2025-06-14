'use client'

import { getWorkSpaces } from '@/actions/workspace'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useQueryData } from '@/hooks/useQueryData'
import { NotificationProps, WorkspaceProps } from '@/types/index.type'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Modal from '../modal'
import { Menu, PlusCircle, Workflow } from 'lucide-react'
import Search from '../search'
import { MENU_ITEMS } from '@/constants'
import SidebarItem from './sidebar-items'
import { getNotifications } from '@/actions/user'
import WorkspacePlaceholder from './workspace-placeholder'
import GlobalCard from '../global-card'
import { Button } from '@/components/ui/button'
import SidebarSkeleton from './sidebar-skeleton'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import InfoBar from '../info-bar'
import { useDispatch } from 'react-redux'
import { WORKSPACES } from '@/redux/slices/workspaces'
import PaymentButton from '../payment-button'

type Props = {
    activeWorkspaceId: string
    userId: string
}

const Sidebar = ({ activeWorkspaceId, userId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const { data: workspaces, isFetched, isFetching: isFetchingWorkspaces } = useQueryData(["user-workspaces", userId], getWorkSpaces);
    const menuItems = MENU_ITEMS(activeWorkspaceId);

    const { data: notifications, isFetching: isFetchingNotification } = useQueryData(["user-notifications", userId], getNotifications);

    if (isFetchingNotification && isFetchingWorkspaces) {
        return (
        <div className='full'>
            <InfoBar />
            <div className='md:hidden fixed my-4'>
                <Sheet>
                    <SheetTrigger asChild className='ml-2'>
                        <Button variant='ghost' className='mt-[2px]'>
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={'left'} className='p-0 w-fit h-full'>
                        <SidebarSkeleton />
                    </SheetContent>
                </Sheet>
            </div>

            <div className='md:block hidden h-full'>
                <SidebarSkeleton />
            </div>
        </div>
    )
        return <SidebarSkeleton />
    }

    const { data: workspace } = workspaces as WorkspaceProps;
    const { data: count } = notifications as NotificationProps;

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`)
    };

    // console.log(workspace)
    const currentWorkspace = workspace.workspace.find((s) => s.id === activeWorkspaceId);

    if (isFetched && workspace) {
        dispatch(WORKSPACES({ workspaces: workspace.workspace }));
    }


    const SidebarSection = (
        <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>

            <div className='bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0'>
                <Image src="/palu-logo.svg" height={40} width={40} alt='logo' />
                <p className='text-2xl'>Palu</p>
            </div>
            <Select
                defaultValue={activeWorkspaceId}
                onValueChange={onChangeActiveWorkspace}
            >
                <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
                    <SelectValue placeholder="Select a workspace"></SelectValue>
                </SelectTrigger>
                <SelectContent className='bg-[#111111] backdrop-blur-xl'>
                    <SelectGroup>
                        <SelectLabel>Workspaces</SelectLabel>
                        <Separator />
                        {workspace.workspace.map((workspace) => (
                            <SelectItem
                                key={workspace.id}
                                value={workspace.id}
                            >
                                {workspace.name}
                            </SelectItem>
                        ))}
                        {workspace.members.length > 0 && workspace.members.map((workspace) => (
                            workspace.Workspace && (
                                <SelectItem
                                    value={workspace.Workspace.id}
                                    key={workspace.Workspace.id}
                                >
                                    {workspace.Workspace.name}
                                </SelectItem>
                            )
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {currentWorkspace?.type === "PUBLIC" && workspace.subscription?.plan === "PRO" &&
                <Modal
                    trigger={
                        <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90  hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                            <PlusCircle
                                size={15}
                                className="text-neutral-800/90 fill-neutral-500"
                            />
                            <span className="text-neutral-400 font-semibold text-xs">
                                Invite To Workspace
                            </span>
                        </span>
                    }
                    title="Invite To Workspace"
                    description="Invite other users to your workspace"
                >
                    <Search workspaceId={activeWorkspaceId} />
                </Modal>
            }


            <div className='overflow-auto'>


                <p className='w-full text-[#9D9D9D] font-bold mt-4'>Menu</p>
                <nav className='w-full'>
                    <ul>
                        {menuItems.map((item) => (
                            <SidebarItem
                                href={item.href}
                                icon={item.icon}
                                selected={pathname === item.href}
                                title={item.title}
                                key={item.title}
                                notifications={
                                    (item.title === 'Notifications' &&
                                        count._count &&
                                        count._count.notification) ||
                                    0
                                }
                            />
                        ))}
                    </ul>
                </nav>

                <Separator className='w-4/5' />
                <p className='w-full text-[#9D9D9D] font-bold mt-4'>Workspaces</p>

                {
                    workspace.workspace.length === 1 && workspace.members.length === 0 &&
                    <div className='w-full mt-[10px]'>
                        <p className='text-[#3c3c3c] font-medium text-sm'>
                            {workspace.subscription?.plan === "FREE" ?
                                "Upgrade to create workspaces" :
                                "No Workspaces"
                            }
                        </p>
                    </div>
                }

                <nav className='w-full'>
                    <ul className='h-[150px] overflow-auto overflow-x-hidden fade-layer'>
                        {workspace.workspace.length > 0 && workspace.workspace.map((item) => (
                            item.type !== "PERSONAL" && (
                                <SidebarItem
                                    href={`/dashboard/${item.id}`}
                                    selected={pathname === `/dashboard/${item.id}`}
                                    title={item.name}
                                    notifications={0}
                                    key={item.name}
                                    icon={<WorkspacePlaceholder>{item.name.charAt(0)}</WorkspacePlaceholder>}
                                />
                            )
                        ))}

                        {
                            workspace.members.length > 0 && workspace.members.map((item) => (
                                <SidebarItem
                                    href={`/dashboard/${item.Workspace.id}`}
                                    selected={pathname === `/dashboard/${item.Workspace.id}`}
                                    title={item.Workspace.name}
                                    notifications={0}
                                    key={item.Workspace.name}
                                    icon={<WorkspacePlaceholder>{item.Workspace.name.charAt(0)}</WorkspacePlaceholder>}
                                />
                            ))
                        }
                    </ul>
                </nav>

                <Separator className='w-4/5' />

                {
                    workspace.subscription?.plan === "FREE" &&
                    <div className='p-2'>
                        <GlobalCard
                            title="Upgrade to Pro"
                            description='Unlock AI feature like transcription, AI summary and more.'
                            footer={
                                <PaymentButton />
                            }
                        >
                        </GlobalCard>
                    </div>
                }
            </div>

        </div>
    );


    return (
        <div className='full'>
            <InfoBar />
            <div className='md:hidden fixed my-4'>
                <Sheet>
                    <SheetTrigger asChild className='ml-2'>
                        <Button variant='ghost' className='mt-[2px]'>
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={'left'} className='p-0 w-fit h-full'>
                        {SidebarSection}
                    </SheetContent>
                </Sheet>
            </div>

            <div className='md:block hidden h-full'>
                {SidebarSection}
            </div>
        </div>
    )
}

export default Sidebar