import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const RecentPost = ({ limit }) => {
    const [recentPost, setRecentPost] = useState([]);
    const navigate = useNavigate();
    const { presentUser } = useSelector((state) => state.user)

    const getPost = async () => {
        try {
            const res = await fetch(`/app/get-posts?limit=${limit}`);
            const data = await res.json();
            if (res.ok) {
                setRecentPost(data.posts);
            }
            if (!res.ok) {
                toast.error(data.errorMessage);
              }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPost();
    }, [limit]);

    const handleClick = async (slug) => {
        if (!presentUser) {
            toast.custom(
                <div className="flex items-center justify-center w-full max-w-sm p-4 bg-red-600 text-white rounded-lg shadow-md">
                    <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 11-12.728 0M12 9v4m0 4h.01"></path>
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="font-semibold">Sign In Required</p>
                    </div>
                </div>, {
                duration: 1000,
            }
            )
        }
        else {
            navigate(`/post/${slug}`)
        }
    }


    return (
        <div>
            <Toaster />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-7 mx-2">
                {recentPost.map((post, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
                    >
                        <img
                            className="w-full h-48 object-cover"
                            src={post.image}
                            alt={post.title}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
                            <span className="text-sm bg-gray-50 text-gray-500">{post.category}</span>
                        </div>
                        <Button onClick={() => { handleClick(post.slug) }} className="w-[90%] mb-5 bg-gray-700">
                            READ WRITEON's
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentPost;
