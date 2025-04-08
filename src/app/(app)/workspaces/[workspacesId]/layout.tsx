'use client'
interface workspaceIdLayoutProps{
    children: React.ReactNode;
}
import React from 'react'
import Toolbar from './toolbar';
import Sidebar from './sidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import Workspacesiberbar from './workspacesiberbar';

export default function WorkspacesIdLayout({children}: workspaceIdLayoutProps) {
  return (
    <div>
        <Toolbar></Toolbar>
        <div className='flex h-[calc(100vh-40px)]'>
            <Sidebar></Sidebar>
            <ResizablePanelGroup direction='horizontal'
            autoSaveId="ca-workspace-layout"
            >
                <ResizablePanel
                 defaultSize={20}
                 minSize={10}
                 className='bg-amber-200'
                >
                   <Workspacesiberbar></Workspacesiberbar>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel minSize={50}>
                    {children}
                </ResizablePanel>
            </ResizablePanelGroup>
            
        </div>
        
    </div>
  )
}
