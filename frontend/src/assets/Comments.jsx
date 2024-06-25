import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Usercomments from './UserComments'
import { useNavigate, useParams } from 'react-router-dom'

const Comments = ({ postId }) => {
    const { presentUser } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [commentData, setcommentData] = useState([])
    const maxChars = 200;
    const { slug } = useParams();

    useEffect(() => {
        const getPostComment = async () => {
            try {
                const res = await fetch(`/app/get-comments/${postId}`)
                const data = await res.json()
                // console.log(data) 
                if (res.ok) {
                    setcommentData(data)
                    // console.log(data)
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        getPostComment();
    }, [postId])

    const handleChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= maxChars) {
            setComment(inputText);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/app/create-comment',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: comment, postId: postId, userId: presentUser._id }),
                });

            const data = await res.json()
            if (res.ok) {
                // console.log(data)
                setcommentData([data, ...commentData])
                // console.log(commentData)
                setComment('');
            }

        } catch (error) {
            console.log(error.message)
        }
    };

    

    const handleLike = async (commentId) => {
        if (!presentUser) {
            return;
            navigate('/signin')
        }
        try {
            const res = await fetch(`/app/commentLike/${commentId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            if (res.ok) {
                const data = await res.json();

                setcommentData(commentData.map((comment) => {
                    if (comment._id === commentId) {
                        console.log(data)
                        return { ...comment, ...data };
                    } else {
                        return comment;
                    }

                }));
                // console.log(commentData)

            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleEdit = async (commentId, content) => {
        try {
            const res = await fetch(`/app/editComment/${commentId}`
                ,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content })
                });
            if (res.ok) {
                const data = await res.json();


                setcommentData(commentData.map((comment) => {
                    if (comment._id === commentId) {
                        console.log(data)
                        return { ...comment, content: content };
                    } else {
                        return comment;
                    }

                }));
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDelete = async (commentId) => {
        console.log(commentId)
        try {
            const res = await fetch(`/app/deleteComment/${commentId}`
                ,
                {
                    method: 'DELETE'
                });
            if (res.ok) {
                const data = await res.json();
                setcommentData(commentData.filter((e) => e._id !== commentId))
                console.log(data)
            }

        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        <div >
            {presentUser ? (
                <div>
                    <span className='flex text-sm justify-center items-center'>
                        Signed In as:
                        <img src={presentUser.profilePic} alt={presentUser.username} className='h-5 w-5 m-1 rounded-full' />
                        <Link className='text-blue-600 uppercase' to={'/dashboard?tab=profile'}>@{presentUser.username}</Link>
                    </span>
                </div>
            ) : (
                <div>
                    <span className='flex text-sm justify-center items-center'>
                        Sign In to comment:
                        <Link className='text-blue-600 uppercase p-1 underline' to={'/dashboard?tab=profile'}>SIGN IN</Link>
                    </span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white bg-opacity-10 rounded-lg shadow-md">
                <textarea
                    required
                    disabled={!presentUser}
                    value={comment}
                    onChange={handleChange}
                    placeholder="Add a comment..."
                    className="w-full p-3 mb-4 text-black bg-gray-100 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gray-600"
                ></textarea>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                        {maxChars - comment.length} Characters remaining...
                    </span>
                    <button
                        disabled={!presentUser}
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {commentData.length === 0 ? (
                <div
                    className="px-4 py-2 text-lg text-center mt-5 font-medium text-gradient-to-r from-gray-800 to-gray-500 rounded-md">
                    No comments on this post...
                </div>
            ) : (
                <>
                    <div className="flex justify-center items-center p-4 md:p-8 rounded">
                        <div className="bg-white rounded-lg shadow-md max-w-full md:max-w-3xl lg:max-w-4xl w-full">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold">Comments</h2>
                                <span className="bg-gray-300 text-gray-700 rounded-full px-2 py-1 text-xs font-medium">{commentData.length}</span>
                            </div>
                            <div className='max-h-64 overflow-auto hidescroll'>
                                {commentData.map((comment) => <Usercomments key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit} onDelete={handleDelete} />)}
                            </div>
                        </div>
                    </div></>
            )}
        </div>

    )
}

export default Comments