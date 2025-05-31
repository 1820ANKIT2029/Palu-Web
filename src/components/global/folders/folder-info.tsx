'use client'

import { getFolderInfo } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import { FoldersProps } from '@/types/index.type'
import { FolderProps } from '@/types/index.type'

type Props = {
    folderId: string
}

function FolderInfo({folderId}: Props) {
    const { data, isFetching } = useQueryData(['folder-info', folderId], () => getFolderInfo(folderId));

    if(isFetching){
        return null;
    }

    const { data : folder } = data as FolderProps;

    return (
        <div className='flex items-center'>
            <h2 className='text[#BDBDBD] text-2xl'>{folder.name}</h2>
        </div>
    )
}

export default FolderInfo