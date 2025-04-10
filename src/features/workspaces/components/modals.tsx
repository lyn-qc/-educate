'use client'
import { CreateWorkspaceModal } from "./create-workspaaces-model";
import { useEffect, useState } from "react";
export const Modals = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    },[])
    if (!mounted) {
        return 
    }
    return (
        <>
            <CreateWorkspaceModal />
        </>
    )
}
