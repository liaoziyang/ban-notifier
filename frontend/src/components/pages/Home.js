
import React from 'react'
import Header from '../layout/Header'
import React, { Suspense } from 'react'
import Loading from '../layout/Loading'
import LiveFeed from '../layout/LiveFeed'

export default function Home(){
  return (
    <div>
      <Header/>
      <Suspense fallback={<Loading dark={false}/>}><LiveFeed/></Suspense>
    </div>
  )
}