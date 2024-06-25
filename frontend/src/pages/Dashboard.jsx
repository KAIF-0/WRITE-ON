import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from '@/assets/Sidebar'
import Profile from '@/assets/Profile'
import Posts from '@/assets/DashPosts'
import Users from '@/assets/DashUsers'
import DashComments from '@/assets/DashComments'
import DashOverview from '@/assets/DashOverview'


const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabOpened = urlParams.get('tab')
    if (tabOpened) {
      setTab(tabOpened)
    }

  }, [location])

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='md:min-h-screen'><Sidebar /></div>
      {tab === 'dash' && <div className='w-full min-h-screen'><DashOverview /></div>}
      {tab === 'profile' && <div className='w-full min-h-screen'><Profile /></div>}
      {tab === 'posts' && <div className='w-full min-h-screen'><Posts /></div>}
      {tab === 'users' && <div className='w-full min-h-screen'><Users /></div>}
      {tab === 'comments' && <div className='w-full min-h-screen'><DashComments /></div>}
    </div>
  )
}

export default Dashboard