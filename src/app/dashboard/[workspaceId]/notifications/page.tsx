'use client'

import { getNotifications } from '@/actions/user';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useQueryData } from '@/hooks/useQueryData';
import { User } from 'lucide-react';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/global/loader'

type Props = {
    // userId: string
}

const Notifications = ({ }: Props) => {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return (
            <Loader
                state={isLoaded}
                color="#000"
            >
                Loading
            </Loader>
        );
    }

    if (!isSignedIn) {
        return <div>Please sign in</div>;
    }

    const userId = user.id;

    const { data: notifications, isPending } = useQueryData(
        ['user-notifications', userId],
        getNotifications
    );

    if (isPending) {
        return (
            <Loader
                state={isPending}
                color="#000"
            >
                Loading
            </Loader>
        );
    }

    const { data: notification, status } = notifications as {
        status: number
        data: {
            notification: {
                id: string
                userId: string | null
                content: string
            }[]
        }
    }

    if (status !== 200) {
        return (
            <div className="flex justify-center items-center h-full w-full">
                <p>No Notification</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {notification.notification.map((n) => (
                <div
                    key={n.id}
                    className="border-2 flex gap-x-3 items-center rounded-lg p-3"
                >
                    <Avatar>
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>
                    <p>{n.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Notifications