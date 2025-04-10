"use client"
import { useGetChannel } from '@/features/channel/api/use-get-channel'
import { useGetChannels } from '@/features/channel/api/use-get-channels'
import { useCreateChannelModel } from '@/features/channel/store/use-create-clannel-model'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useChannelId } from '@/hooks/use-channel-id'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { AlertTriangle, Loader, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import ChannelHeader from './channel-header'
import ChatInput from './chat-input'

export default function ChannelPage() {
    const router = useRouter()
    const workspaceId = useWorkspaceId()
    const channelId = useChannelId()
    const {data:channel,isLoading: channelLoading} = useGetChannel({id:channelId})
    if (channelLoading) {
       return (
         <div className='flex flex-col bg-blue-50 h-full items-center justify-center'>
           <Loader className='size-5 aniamte-spin text-aqua-500'></Loader>
         </div>
       )
     }
     if (!channel) {
       return (
         <div className='flex flex-col gap-y-2 bg-blue-50 h-full items-center justify-center'>
           <AlertTriangle className='size-5 text-white'></AlertTriangle>
           <p className='text-white text-sm'>未找到频道</p>
         </div>
       )
     }
  return (
    <div className='flex flex-col h-full bg-gradient-to-br from-[rgb(250,244,255)] to-[rgb(221,235,255)]'>
      <ChannelHeader name={channel.name} />
        <div className='flex-1'>

        </div>
        <ChatInput></ChatInput>
    </div>
  )
}
