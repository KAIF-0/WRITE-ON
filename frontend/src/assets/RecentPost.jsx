import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RecentPost = ({ limit }) => {
    const [recentPost, setRecentPost] = useState([]);

    const getPost = async () => {
        try {
            const res = await fetch(`/app/get-posts?limit=${limit}`);
            const data = await res.json();
            if (res.ok) {
                setRecentPost(data.posts);
                console.log(data.posts);
            } else {
                console.log("CAN'T GET POST");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPost();
    }, [limit]);

    return (
        <div>
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
                        <Link className='flex justify-center mb-5 ' to={`/post/${post.slug}`}>
                            <Button className="w-[90%] bg-gray-700">
                                READ WRITEON's
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentPost;
