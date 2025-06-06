'use client'

import FolderDuotone from '@/components/icons/folder-duotone'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import React, { useEffect } from 'react'
import Folder from './folder'
import { FoldersProps } from '@/types/index.type'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaceFolders } from '@/actions/workspace'
import { useMutationDataState } from '@/hooks/useMutationData'
import { useDispatch } from 'react-redux'
import { FOLDERS } from '@/redux/slices/folders'

type Props = {
    workspaceId: string
}

const Folders = ({workspaceId}: Props) => {
    const dispatch = useDispatch();
    const { data , isFetched} = useQueryData(
        ['workspace-folders', workspaceId], 
        ()=> getWorkspaceFolders(workspaceId)
    );

    const { latestVariables } = useMutationDataState(['create-folder']); 

    const { status , data: folders } = data as FoldersProps || { status: 0, data: []};

    if(isFetched && folders){
        dispatch(FOLDERS({folders: folders}))
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                    <FolderDuotone />
                    <h2 className='text-[#BDBDBD] text-xl'> Folders</h2>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='text-[#BDBDBD]'> See all </p>
                    <ArrowRight color='#707070'/>
                </div>
            </div>

            <div className={cn(
                status !== 200 && 'justify-center' ,
                'flex items-center gap-4 overflow-x-auto w-full'
                )}
            >
                {status != 200 ? 
                    <p className='text-neutral-300'>No folders in workspace</p> 
                    : 
                    <>
                        {latestVariables && latestVariables.status === 'pending' && (
                            <Folder 
                                name={latestVariables.variables.name} 
                                id={latestVariables.variables.id}
                                optimistic
                            />
                        )}
                        {folders.map((folder) => (
                            <Folder
                                name={folder.name}
                                count={folder._count.videos}
                                id={folder.id}
                                key={folder.id}
                            />
                        ))}
                    </>
                }
            </div>
            
        </div>
    )
}

export default Folders