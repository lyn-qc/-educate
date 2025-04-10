import { useCurrentMember } from '@/features/member/api/use-current-member'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { AlertTriangle, Loader } from 'lucide-react'
import React, { useEffect } from 'react'
import WorkspaceHeader from './workspace-header'

export default function Workspacesiberbar() {
  const workspaceId = useWorkspaceId()
  const {data:member,isLoading:memberLoading} = useCurrentMember({workspaceId})
  const {data:workspace,isLoading :workspaceLoading} = useGetWorkspace({id:workspaceId})

  if(memberLoading || workspaceLoading) {
    return (
      <div className='flex flex-col bg-amber-300 h-full items-center justify-center'>
        <Loader className='size-5 aniamte-spin text-white'></Loader>
      </div>
    )
  }
  if(!workspace || !member) {
    return (
      <div className='flex flex-col gap-y-2 bg-amber-300 h-full items-center justify-center'>
        <AlertTriangle className='size-5 text-white'></AlertTriangle>
        <p className='text-white text-sm'>未找到工作区</p>
      </div>
    )
  }
  return (
    <div className='flex flex-col bg-amber-300 h-full items-center'>
        <WorkspaceHeader workspace={workspace} isAdmin={member.role== "admin"}></WorkspaceHeader>
      </div>
  )
}
