import React from 'react'

export default function page() {
  function lengthOfLongestSubstring(s: string): number {
    let curlist = []
    for (let i =0;i<s.length;i++){
      if (Array.isArray(curlist) && curlist.length === 0) {
        curlist.push(i);
      }
    }
    return curlist.length
  };
  return (
    <div>
      
    </div>
  )
}
