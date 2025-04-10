'use client'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import React from 'react'

export default function WorkspaceIdPage() {
  const workspacesId = useWorkspaceId()



  const { data, isLoading } = useGetWorkspace({ id: workspacesId})



  return (
    <div>
      ID:{workspacesId}
      {/* <div>{JSON.stringify(data)}</div> */}
    </div>
  )
}
