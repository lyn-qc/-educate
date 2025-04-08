"use client"
import { useGetChannel } from '@/features/channel/api/use-get-channel'
import { useCreateChannelModel } from '@/features/channel/store/use-create-clannel-model'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Loader, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'

export default function ChannelPage() {
    const router = useRouter()
    const workspaceId = useWorkspaceId()
    const [open, setOpen] = useCreateChannelModel()
    const {data: workspace,isLoading: workspaceLoading} = useGetWorkspace({id: workspaceId})
    const {data:channel,isLoading: channelLoading} = useGetChannel({
        workspaceId
    })
   
  return (
    <div>
      <h1>ChannelPage</h1>
    </div>
  )
}
