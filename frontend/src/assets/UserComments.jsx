import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";


const UserComments = ({ comment, onLike, onEdit, onDelete }) => {
    const { presentUser } = useSelector((state) => state.user)
    const [userData, setuserData] = useState({})
    const [editingComment, seteditingComment] = useState(false)
    const [newComment, setnewComment] = useState({ "content": "" })
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await fetch(`/app/getusers/${comment.userId}`)
                const data = await res.json()
                if (res.ok) {
                    setuserData(data)
                }
            } catch (error) {
                console.log(error)
            }
        };

        getUser()
    }, [comment])

    const handleChange = async (e) => {
        setnewComment({ ...newComment, [e.target.name]: e.target.value })
    };

    const handleEdit = async () => {
        seteditingComment(true)
    }


    return (
        <div className="divide-y divide-gray-200">
            <div className="p-4 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                <div className="flex space-x-3">
                    <img src={userData.profilePic} alt="" className="h-10 w-10 rounded-full" />
                    <div className="flex-grow">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{userData.username}</p>
                            <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                        </div>


                        {editingComment ? (
                            <>
                                <textarea
                                    onChange={handleChange}
                                    defaultValue={comment.content}
                                    // value={newComment.content}
                                    className="w-full max-w-lg mt-1 mb-1 border border-gray-300 rounded-lg"
                                    name="content"
                                />
                                <div className="flex space-x-4">
                                    <button onClick={() => { onEdit(comment._id, newComment.content), seteditingComment(false) }} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        Save
                                    </button>
                                    <button onClick={() => { seteditingComment(false) }} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                        )}

                        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this comment?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="failure" onClick={()=>{onDelete(comment._id),setOpenModal(false)}}>
                                            {"Yes, I'm sure"}
                                        </Button>
                                        <Button color="gray" onClick={() => setOpenModal(false)}>
                                            No, cancel
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>


                        <div className="flex items-center justify-between mt-2 space-x-2">
                            <button className={`flex items-center text-xs ${comment.likes.includes(presentUser._id) ? "text-blue-700" : " text-blue-700" } hover:text-blue-500`} onClick={() => { onLike(comment._id) }}>
                                <svg className='h-4 w-4 mr-1' fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                                {comment.likes.length} Likes
                            </button>

                            {presentUser && (presentUser._id === comment.userId) ? (
                                <div className='space-x-1 mb-1'>
                                    <button className="text-xs text-blue-600 hover:underline" onClick={handleEdit} >Edit</button>
                                    <button className="text-xs text-red-600 hover:underline" onClick={()=>setOpenModal(true)} >Delete</button>
                                </div>
                            ) : (<></>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserComments