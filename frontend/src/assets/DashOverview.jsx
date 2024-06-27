import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FaUserFriends } from "react-icons/fa";
import { LiaCommentsSolid } from "react-icons/lia";
import { MdOutlinePostAdd } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const DashOverview = () => {
    const { presentUser } = useSelector((state) => state.user);
    const [userData, setuserData] = useState([])
    const [commentData, setcommentData] = useState([])
    const [postData, setpostData] = useState([])
    const navigate = useNavigate();

    const [overviewStats, setoverviewStats] = useState([
        { label: "TOTAL USERS", value: '', change: "+8", period: "Last month", icon: <FaUserFriends /> },
        { label: "TOTAL COMMENTS", value: '', change: "+1", period: "Last month", icon: <LiaCommentsSolid /> },
        { label: "TOTAL POSTS", value: '', change: "+13", period: "Last month", icon: <MdOutlinePostAdd /> },
    ]);

    useEffect(() => {
      if(!presentUser.isAdmin){
        navigate('/')
      }
    }, [])
    


    const getUsers = async () => {
        try {
            const res = await fetch(`/app/get-users/${presentUser._id}?limit=4`)
            const data = await res.json()
            if (res.ok) {
                setuserData(data.removePass)
                setoverviewStats(overviewStats.map((e) => {
                    if (e.label === "TOTAL USERS") {
                        return e.value = data.totalUsers
                    } else {
                        return e;
                    }
                }))
            }
            if (!res.ok) {
                toast.error(data.errorMessage);
              }

        } catch (error) {
            console.log(error.message)
        }
    }

    const getDashComments = async () => {
        try {
            const res = await fetch('/app/getComments?limit=5')
            const data = await res.json()
            if (res.ok) {
                setcommentData(data.comments)
                setoverviewStats(overviewStats.map((e) => {
                    if (e.label === "TOTAL COMMENTS") {
                        return e.value = data.totalComments 
                    } else {
                        return e;
                    }
                }))
            }
            if (!res.ok) {
                toast.error(data.errorMessage);
              }
        } catch (error) {
            console.log(error.message)
        }
    }


    const getPosts = async () => {
        try {
            const res = await fetch('/app/get-posts?limit=5')
            const data = await res.json()
            if (res.ok) {
                setpostData(data.posts)
                setoverviewStats(overviewStats.map((e) => {
                    if (e.label === "TOTAL POSTS") {
                        return {...e, value: data.totalPosts}
                    } else {
                        return e;
                    }
                }))
            }
            if (!res.ok) {
                toast.error(data.errorMessage);
              }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getPosts();
        getUsers();
        getDashComments();
    }, []) 

    return (
        <>
        <Toaster/>
        <div className="p-4 space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {overviewStats.map((stat, index) => (
                    <div key={index} className="flex border items-center bg-white p-4 rounded shadow">
                        <div className="text-5xl mr-4">{stat.icon}</div>
                        <div>
                            <div className="text-gray-500">{stat.label}</div>
                            <div className="text-lg font-semibold">{stat.value}</div>
                            <div className="text-green-500">{stat.change}</div>
                            <div className="text-gray-400 text-sm">{stat.period}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Users and Recent Comments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:mx-32">
                {/* Recent Users */}
                <div className="bg-white rounded shadow p-5">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-lg font-semibold">Recent users</h2>
                        <Link to={'/dashboard?tab=users'}>
                        <Button className="bg-gray-700">See all</Button>
                        </Link>
                    </div>
                    <div className="flex justify-around justify-items-center bg-gray-200 items-center rounded py-2 my-2 mt-3 ">
                        <h2 className="text-lg font-semibold">USER IMAGE</h2>
                        <h2 className="text-lg font-semibold">USERNAME</h2>
                    </div>
                    <div>
                        {userData.map((user, index) => (
                            <div key={index} className="flex justify-center gap-24 items-center py-2">
                                <div className="w-[30%]" >
                                    <img src={user.profilePic} alt={user.username} className="w-10 h-10 rounded-full " />
                                </div>
                                <div>{user.username}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Comments */}
                <div className="bg-white rounded shadow p-5">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-lg font-semibold">Recent comments</h2>
                        <Link to={'/dashboard?tab=comments'}>
                           <Button className="bg-gray-700">See all</Button> 
                        </Link>
                    </div>
                    <div className="flex justify-around justify-items-center bg-gray-200 items-center rounded py-2 my-2 mt-3 ">
                        <h2 className="text-lg font-semibold">COMMENT CONTENT</h2>
                        <h2 className="text-lg font-semibold">LIKES</h2>
                    </div>
                    <div>
                        {commentData.map((comment, index) => (
                            <div key={index} className="flex justify-center gap-24 items-center py-2">
                                <div className="w-[40%] line-clamp-1" >{comment.content}</div>
                                <div>{comment.likes.length}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded shadow p-5">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">Recent posts</h2>
                    <Link to={'/dashboard?tab=posts'}>
                    <Button className="bg-gray-700">See all</Button>
                    </Link>
                </div>
                <div className="flex justify-around justify-items-center bg-gray-200 items-center rounded py-2 my-2 mt-3 ">
                    <h2 className="text-lg font-semibold">POST IMAGE</h2>
                    <h2 className="text-lg font-semibold">POST TITLE</h2>
                    <h2 className="text-lg font-semibold">CATEGORY</h2>
                </div>
                <div>
                    {postData.map((post, index) => (
                        <div key={index} className="flex justify-around items-center py-2">
                            <img src={post.image} alt={post.title} className="w-10 h-10 rounded-full mr-4" />
                            <div className="w-[10%] text-center line-clamp-1">{post.title}</div>
                            <div className="w-[10%] text-center line-clamp-1">{post.category}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div></>
    );
};

export default DashOverview;
