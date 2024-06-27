import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import CounterAction from '@/assets/Counteraction';
import Comments from '@/assets/Comments';
import RecentPost from '@/assets/RecentPost';
import toast, { Toaster } from 'react-hot-toast';

const Post = () => {
    const { slug } = useParams();
    const [postData, setpostData] = useState({})
    const [loading, setloading] = useState(false)


    const getPost = async () => {
        setloading(true)
        const toastId = toast.loading('Loading content...');
        try {
            const res = await fetch(`/app/get-posts?slug=${slug}`)
            const data = await res.json()
            if (res.ok) {
                setpostData(data.posts[0])
                setloading(false)
            }
            if (!res.ok) {
                toast.error(data.errorMessage);
                setloading(false)
              }
            {!loading && toast.dismiss(toastId)}
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        getPost()
    }, [slug])


    return (
        <>
        <Toaster/>
        <div className="max-w-screen-xl mx-2 my-10 flex flex-col justify-center items-center md:mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h2 className="text-3xl uppercase font-semibold text-center text-gray-800">
                    {postData.title}
                </h2>
            </div>
            <Link to={`/search?category=${postData.category}`}>
                <div className=" text-center bg-gray-300 text-gray-800 text-xs font-medium rounded-full px-2 py-1 mt-2">
                    {postData.category}
                </div>
            </Link>

            <div className="w-full object-cover px-6 mt-8">
                <img
                    className="w-full object-cover "
                    src={postData.image}
                    alt={postData.title}
                />
            </div>
            <div className="p-4 flex justify-between min-w-full text-gray-600 text-sm">
                <span>{new Date(postData.createdAt).toLocaleTimeString()}</span>
                <span>{new Date(postData.createdAt).toLocaleDateString()}</span>
            </div>
            <div className='p-3 max-w-5xl mx-auto postContent' dangerouslySetInnerHTML={{ __html: postData.content }}></div>
            <div className='p-3 mb-5 max-w-3xl mx-auto'>
                <CounterAction />
            </div>
            <div className='p-3 mb-5 w-full mx-auto'>
                <Comments postId={postData._id} />
            </div>


            {/* <div className="py-12 bg-gray-100"> */}
            <h2 className="text-3xl font-bold text-center mb-8">Recent WriteOn's...</h2>
            <div className='min-w-full'>
            <RecentPost limit="3"/>
            </div>

        </div>
        </>
    )
}

export default Post