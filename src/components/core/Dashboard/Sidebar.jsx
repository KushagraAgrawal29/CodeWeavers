import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useSelector } from 'react-redux'
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='bg-richblack-800'>
      <div className='flex flex-col w-fit md:min-w-[220px] min-h-[calc(100vh-3.5rem)] border-r border-richblack-700 py-10' >
        <div className='flex flex-col'>
          {
            sidebarLinks.map((link) => {
              if(link.type && link.type !== user?.accountType) return null;
              return <SidebarLink key={link.id} data={link}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
