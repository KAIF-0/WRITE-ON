import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashComments = () => {
    const [showMore, setshowMore] = useState(true)
    const [commentData, setcommentData] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setdeleteId] = useState('')



    const getDashComments = async () => {
        try {
            const res = await fetch('/app/getComments')
            const data = await res.json()
            console.log(data)
            if (res.ok) {

                setcommentData(data.comments)
            }
            if (data.length < 15) {
                setshowMore(false);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getDashComments();
    }, [])

    const handleClick = async () => {
        const index = commentData.length;
        try {
            const res = await fetch(`/app/getComments?index=${index}`)
            const data = await res.json()
            // console.log(data)
            if (res.ok) {
                setcommentData([...commentData, ...data.comments])
                setshowMore(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    const handleDelete = async () => {
        // console.log(commentId)
        try {
            const res = await fetch(`/app/deleteDashComment/${deleteId}`
                ,
                {
                    method: 'DELETE'
                });
            if (res.ok) {
                const data = await res.json();
                setcommentData(commentData.filter((e) => e._id !== deleteId))
                console.log(data)
            }

        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div className='flex flex-col justify-center'>
        <div className="overflow-x-auto py-6 px-4 ">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="py-2 px-4 text-left">DATE UPDATED</th>
                        <th className="py-2 px-4 text-left">COMMENT CONTENT</th>
                        <th className="py-2 px-4 text-left">NUMBER OF LIKES</th>
                        <th className="py-2 px-4 text-left">POSTID</th>
                        <th className="py-2 px-4 text-left">USERID</th>
                        <th className="py-2 px-4 text-left">DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {commentData.map((comment, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-2 px-4">{new Date(comment.createdAt).toLocaleDateString()}</td>
                            <td className="py-[0.30rem] line-clamp-2 px-4">{comment.content}</td>
                            <td className="py-2 px-4">{comment.likes.length}</td>
                            <td className="py-2 px-4">{comment.postId}</td>
                            <td className="py-2 px-4">{comment.userId}</td>
                            <button onClick={() => { setOpenModal(true), setdeleteId(comment._id)}} className="py-2 px-4 text-red-600 cursor-pointer hover:underline">Delete</button>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
        {showMore ? <button
                onClick={handleClick}
                className="mb-5 self-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 focus:outline-none  focus:ring-gray-800"
            >Show More...
            </button> : <></>}


            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this user?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={()=>{setOpenModal(false), handleDelete()}}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DashComments;
