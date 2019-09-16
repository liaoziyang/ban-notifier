import React, { Suspense } from 'react'
import Loading from '../layout/Loading'
import LiveFeed from '../layout/LiveFeed'

export default function Home(){
  return (
    <Suspense fallback={<Loading dark={false}/>}><LiveFeed/></Suspense>
  )
}