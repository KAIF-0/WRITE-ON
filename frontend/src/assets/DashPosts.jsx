import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DashPosts = () => {
  const { presentUser } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const [postData, setpostData] = useState([])
  const [showMore, setshowMore] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setdeleteId] = useState('')

  const getPosts = async () => {
    try {
      const res = await fetch(`/app/get-posts?userId=${presentUser._id}`)
      const data = await res.json()
      // console.log(data.posts)
      if (res.ok) {
        setpostData(data.posts)
      }
      if (data.posts.length < 7) {
        setshowMore(false);
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getPosts();
  }, [presentUser])

  const handleClick = async () => {
    const index = postData.length;
    try {
      const res = await fetch(`/app/get-posts?userId=${presentUser._id}&index=${index}`)
      const data = await res.json()
      // console.log(data.posts)
      if (res.ok) {
        setpostData([...postData, ...data.posts])
        setshowMore(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async () => {
    console.log('POST DELETED')
    setOpenModal(false)
    try {
      const res = await fetch(`/app/delete-post/${presentUser._id}/${deleteId}`,
        {
          method: 'DELETE',
        });
      if (res.ok) {
        setpostData(postData.filter((e) => e._id !== deleteId))
      }

    } catch (error) {
      console.log(error.message)
    }
  }


  const handleRouting = async (e) => {
    navigate(`/post/${e}`)
  }

  return (
    <div>
      {postData.length > 0 ? <>
        <div className="container mx-auto p-4">
          <div className="hidden md:block overflow-x-auto  ">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-700 text-white">
                  <th className="py-2 px-4">DATE UPDATED</th>
                  <th className="py-2 px-4">POST IMAGE</th>
                  <th className="py-2 px-4">POST TITLE</th>
                  <th className="py-2 px-4">CATEGORY</th>
                  <th className="py-2 px-4">DELETE</th>
                  <th className="py-2 px-4">EDIT</th>
                </tr>
              </thead>
              <tbody>
                {postData.map((post) => (
                  <tr onClick={() => handleRouting(post.slug)} key={post._id} className="border-b border-gray-200 shadow-sm hover:bg-gray-200">
                    <td className="py-2 px-4 text-center">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-center">
                      <img src={post.image} alt={post.title} className="h-16 w-16 object-cover mx-auto" />
                    </td>
                    <td className="py-2 px-4 text-center">{post.title}</td>
                    <td className="py-2 px-4 text-center">{post.category}</td>
                    <td onClick={() => { setOpenModal(true), setdeleteId(post._id) }} className="py-2 px-4 text-center text-red-500 cursor-pointer hover:underline">Delete</td>
                    <td className="py-2 px-4 text-center text-blue-500 cursor-pointer hover:underline"> <Link to={`/edit-post/${post._id}`}>Edit</Link></td>
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

          <div className="block md:hidden">
            {postData.map((post) => (
              <div onClick={() => handleRouting(post.slug)} key={post._id} className="bg-white mb-4 p-4 hover:bg-gray-200 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{post.updatedAt}</span>
                  <div className="flex space-x-4">
                    <button onClick={() => { setOpenModal(true), setdeleteId(post._id) }} className="text-red-500 cursor-pointer">Delete</button>
                    <Link to={`/edit-post/${post._id}`}><button className="text-blue-500 cursor-pointer">Edit</button></Link>
                  </div>
                </div>
                <div className="mt-4">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-500">{post.category}</p>
                </div>

              </div>
            ))}
            {showMore ? <button
              onClick={handleClick}
              className="mt-4 w-full self-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none  focus:ring-gray-800"
            >Show More...
            </button> : <></>}
          </div>

        </div>
      </>
        : <div className="container mx-auto p-4 flex flex-col ">
          <div className=" md:block overflow-x-auto  ">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-800 text-white">
                  <th className="py-2 px-4">DATE UPDATED</th>
                  <th className="py-2 px-4">POST IMAGE</th>
                  <th className="py-2 px-4">POST TITLE</th>
                  <th className="py-2 px-4">CATEGORY</th>
                  <th className="py-2 px-4">DELETE</th>
                  <th className="py-2 px-4">EDIT</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className='mx-auto text-3xl mt-5'>No posts yet...</div>
        </div>}

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
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
    </div>

  )
}

export default DashPosts