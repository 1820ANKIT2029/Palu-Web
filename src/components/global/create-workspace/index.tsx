'use client'

import { getWorkSpaces } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import Modal from '../modal'
import FolderPlusDuotine from '@/components/icons/folder-plus-duotone'
import { Button } from '@/components/ui/button'
import WorkspaceForm from '@/components/forms/workspace-form'
import { useUser } from '@clerk/nextjs';
import Loader from '../loader'

type Props = {}

const CreateWorkspace = (props: Props) => {
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

  const { data, isPending } = useQueryData(["user-workspaces", userId], getWorkSpaces);

  if (isPending || !data) {
    return (
      <Loader
        state={isPending}
        color="#000"
      >
        Loading
      </Loader>
    );
  }

  const { data: plan } = data as {
    status: number
    data: {
      subscription: {
        plan: "PRO" | "FREE"
      } | null
    }
  }

  if (plan.subscription?.plan === "FREE") {
    return <></>
  }

  if (plan.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a Workspace"
        description=" Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself."
        trigger={
          <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
            <FolderPlusDuotine />
            Create a Workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    )
  }
}

export default CreateWorkspace;