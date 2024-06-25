// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { signoutSuccess } from '@/redux/user/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { BsFilePost } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { useLocation } from 'react-router-dom'


const Sidebar = () => {
  const { presentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabOpened = urlParams.get('tab')
    if (tabOpened) {
      setTab(tabOpened)
    }

  }, [location])

  const handleSignOut = async () => {
    try {
      const res = await fetch('/app/signout',
        {
          method: 'POST',
        });

      const data = await res.json()
      if (res.ok) {
        dispatch(signoutSuccess());
      }

    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="flex flex-col w-full min-h-full md:h-full p-4 bg-gradient-to-r from-gray-700 to-gray-500 text-white md:w-64">
      <Link to="/dashboard?tab=profile" className={`flex cursor-pointer items-center justify-between p-2 mb-4 bg-gray-600 hover:bg-gray-800 ${tab === 'profile' && "bg-gray-800"} rounded-lg`}>
        <div className="flex items-center">
          <AiOutlineUser className="w-6 h-6 mr-2" />
          <span>Profile</span>
        </div>
        {presentUser.isAdmin ? <span className="px-2 py-1 text-xs bg-gray-500 rounded-md">ADMIN</span> : <span className="px-2 py-1 text-xs bg-gray-500 rounded-md">USER</span>}
      </Link>
      {presentUser.isAdmin && (
        <Link to="/dashboard?tab=dash" className={`flex cursor-pointer items-center text-gray-400 justify-between p-2 mb-1 hover:bg-gray-800 ${tab === 'dash' && "bg-gray-800"} rounded-lg`}>
          <div className="flex items-center">
            <MdOutlineDashboardCustomize className="w-6 h-6 mr-2" />
            <span>Dashboard</span>
          </div>
        </Link>
      )}
      {presentUser.isAdmin && (
        <Link to="/dashboard?tab=comments" className={`flex items-center p-2 mb-2 text-gray-400 cursor-pointer hover:bg-gray-800 ${tab === 'comments' && "bg-gray-800"} rounded-lg`}>
          <div className="flex items-center">
            <FaComments className="w-4 h-4 mr-2" />
            <span>Comments</span>
          </div>
        </Link>
      )}
      <Link to="/dashboard?tab=posts" className={`flex items-center p-2 mb-2 text-gray-400 cursor-pointer hover:bg-gray-800 ${tab === 'posts' && "bg-gray-800"} rounded-lg`}>
        <div className="flex items-center">
          <BsFilePost className="w-4 h-4 mr-2" />
          <span>Posts</span>
        </div>
      </Link>
      {presentUser.isAdmin && (
        <Link to="/dashboard?tab=users" className={`flex items-center p-2 mb-2 text-gray-400 cursor-pointer hover:bg-gray-800 ${tab === 'users' && "bg-gray-800"} rounded-lg`}>
          <div className="flex items-center">
            <FaUsers className="w-4 h-4 mr-2" />
            <span>Users</span>
          </div>
        </Link>
      )}
      <div className="flex items-center p-2 mb-2 text-gray-400 cursor-pointer hover:bg-gray-800 rounded-lg">
        <FiArrowRight className="w-4 h-4 mr-2" />
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
