import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CiCircleRemove } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import toast, { Toaster } from 'react-hot-toast';



const DashUsers = () => {
    const { presentUser } = useSelector((state) => state.user)
    const [userData, setuserData] = useState([])
    const [showMore, setshowMore] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setdeleteId] = useState('')

    const getUsers = async () => {
        try {
            const res = await fetch(`/app/get-users/${presentUser._id}`)
            const data = await res.json()
            if (res.ok) {
                setuserData(data.removePass)
            }
            if (!res.ok) {
                toast.error(data.errorMessage);
            }
            if (data.removePass.length < 7) {
                setshowMore(false);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getUsers();
    }, [presentUser])

    const handleClick = async () => {
        const index = userData.length;
        try {
            const res = await fetch(`/app/get-users/${presentUser._id}?index=${index}`)
            const data = await res.json()
            if (res.ok) {
                setuserData([...userData, ...data.removePass])
                setshowMore(false)
            }
            if (!res.ok) {
                toast.error(data.errorMessage);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDelete = async () => {
        setOpenModal(false)
        try {
            const res = await fetch(`/app/delete-user/${presentUser._id}/${deleteId}`,
                {
                    method: 'DELETE',
                });
            const data = await res.json()
            if (res.ok) {
                setuserData(userData.filter((e) => e._id !== deleteId))
                toast.success("User deleted")
            }
            if (!res.ok) {
                toast.error(data.errorMessage);
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            <Toaster />
            <div>
                {userData.length > 0 ? <>
                    <div className="container mx-auto p-4">
                        <div className=" md:block overflow-x-auto  ">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="w-full bg-gray-700 text-white">
                                        <th className="py-2 px-4"> CREATED</th>
                                        <th className="py-2 px-4">PROFILE</th>
                                        <th className="py-2 px-4">USERNAME</th>
                                        <th className="py-2 px-4">EMAIL</th>
                                        <th className="py-2 px-4">ADMIN</th>
                                        <th className="py-2 px-4">DELETE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((user) => (
                                        <tr key={user._id} className="border-b border-gray-200 shadow-sm hover:bg-gray-200">
                                            <td className="py-2 px-4 text-center">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 text-center">
                                                <img src={user.profilePic} alt={user.username} className="h-16 w-16 object-cover rounded-full mx-auto" />
                                            </td>
                                            <td className="py-2 px-4 text-center">{user.username}</td>
                                            <td className="py-2 px-4 text-center">{user.email}</td>
                                            <td className={`py-2 px-4 text-2xl mt-5 flex justify-center ${user.isAdmin ? "text-green-500" : "text-red-500"} items-center min-h-full cursor-pointer hover:underline`}>{user.isAdmin ? <CiCircleCheck /> : <CiCircleRemove />}</td>
                                            <td onClick={() => { setOpenModal(true), setdeleteId(user._id) }} className="py-2 px-4 text-center text-red-500 cursor-pointer hover:underline">Delete</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            {showMore ? <button
                                onClick={handleClick}
                                className="mt-4 w-full self-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none  focus:ring-gray-800"
                            >Show More...
                            </button> : <></>}
                        </div>
                    </div>
                </>
                    :
                    <div className="container mx-auto p-4 flex flex-col ">
                        <div className=" md:block overflow-x-auto  ">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="w-full bg-gray-800 text-white">
                                        <th className="py-2 px-4"> CREATED</th>
                                        <th className="py-2 px-4">PROFILE</th>
                                        <th className="py-2 px-4">USERNAME</th>
                                        <th className="py-2 px-4">EMAIL</th>
                                        <th className="py-2 px-4">ADMIN</th>
                                        <th className="py-2 px-4">DELETE</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className='mx-auto text-3xl mt-5'>No users yet...</div>
                    </div>
                }


                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this user?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleDelete}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div></>


    )
}

export default DashUsers