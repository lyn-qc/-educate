'use client'
import React from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
export default function page() {
  const { signOut } = useAuthActions();
  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
