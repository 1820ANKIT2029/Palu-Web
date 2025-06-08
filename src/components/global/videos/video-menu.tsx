import React from 'react'
import Modal from '../modal'
import { Move } from 'lucide-react'
import ChangeVideoLocation from '@/components/forms/change-video-location'

type Props = {
    videoId: string
    currentWorkspace?: string
    currentFolder?: string
    currentFolderName?: string
}

const CardMenu = ({videoId, currentFolder, currentWorkspace}: Props) => {
  return (
    <Modal
        className='flex items-center cursor-pointer gap-x-2'
        title='Move to new Workspace/Folder'
        description='Choose Workspace and Folder to transfer to your desire location.'
        trigger={
            <Move size={20} fill='#A4A4A4' className='text-[#A4A4A4]' />
        }
    >
        <ChangeVideoLocation
            currentFolder={currentFolder}
            currentWorkSpace={currentWorkspace}
            videoId={videoId}
        />
    </Modal>
  )
}

export default CardMenu