// src/components/Profile.js
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import { getDownloadURL, uploadBytesResumable, getStorage, ref } from "firebase/storage";
import { app } from '@/firebase';
import { useDispatch } from 'react-redux';
import { updateStart, updateSuccess, updateFailure, deleteFailure, deleteStart, deleteSuccess, signoutSuccess } from '@/redux/user/userSlice.js';
import { Modal, Button, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';


const Profile = () => {
    const { presentUser, errorMessage, loading } = useSelector((state) => state.user)
    const [form, setform] = useState({
        username: presentUser.username,
        email: presentUser.email,
        password: '*'.repeat(presentUser.username.length),
        profilePic: presentUser.profilePic
    })
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [image, setimage] = useState(null)
    const [imageUrl, setimageUrl] = useState(null)
    const [imageUploadProgress, setimageUploadProgress] = useState(null)
    const [imageUploadError, setimageUploadError] = useState(null)
    const r = useRef()


    const handleChange = async (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateStart());
            const res = await fetch(`/app/update/${presentUser._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

            const data = await res.json()
            if (res.ok) {
                dispatch(updateSuccess(data));
            }

            if (!res.ok) {
                dispatch(updateFailure(data.errorMessage));
            }

            
        } catch (error) {
            dispatch(updateFailure(error.message));
        }
    };

    const handleDeleteAccount = async () => {
        setOpenModal(false)
        dispatch(deleteStart());
        try {
            const res = await fetch(`/app/delete/${presentUser._id}`,
                {
                    method: 'DELETE',
                });

            const data = await res.json()
            if (data.success === false) {
                dispatch(deleteFailure(data.errorMessage));
            }

            if (res.ok) {
                dispatch(deleteSuccess(data));
                navigate('/signup')
            }

        } catch (error){
            dispatch(deleteFailure(error.message));
        }
    };

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


    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        setimage(file)
        setimageUrl(URL.createObjectURL(file))                          // for temporary URL of uploaded image in localstorage
    };

    useEffect(() => {
        if (image) {
            uploadImage();
        }
    }, [image])

    const uploadImage = async () => {
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }

        // For Firebase Storage 
        const storage = getStorage(app);
        const nestedFolderPath = 'profilePic'; // Replace with your nested folder path
        const fileName = `${nestedFolderPath}/${new Date().getTime()}_${image.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image)

            uploadTask.on('state_changed', async (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setimageUploadProgress(progress.toFixed(0))
            },
            (error) => {
                    setimageUploadError('Upload Fail...');
                    setimageUploadProgress(null);
    
                },
               async () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setimageUploadProgress(null);
                        setimageUploadError(null);
                        setimageUrl(downloadURL)
                        setform({ ...form, profilePic: downloadURL })
                        
                    });
                    console.log("Image Uploaded Successfully...")
    
    
                }
            ); 
    }


    return (
        <>
            <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
                <div className="w-full mx-5 max-w-md p-8 bg-white shadow-md rounded-md">
                    <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">PROFILE</h2>
                    <div className="relative flex items-center justify-center mb-6">
                        <img
                            src={imageUrl || presentUser.profilePic}
                            alt="Profile"
                            className="w-24 h-24 border-4 rounded-full"
                        />
                        <button onClick={() => r.current.click()} className="absolute bottom-0 right-[13vh]  md:right-[20vh] w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                            <AiOutlineEdit className="w-4 h-4" />
                        </button>
                    </div>
                    <input ref={r} type="file" accept='image/*' hidden onChange={handleImageUpload} />
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name='username'
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name='password'
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-900 focus:outline-none "
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' color='white'></Spinner>
                                    <span className='pl-2'>Loading...</span>
                                </>
                            ) : "UPDATE"}
                        </button>
                    </form>
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="text-sm text-red-600 hover:underline"
                        >
                            Delete Account
                        </button>
                        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this user?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="failure" onClick={handleDeleteAccount}>
                                            {"Yes, I'm sure"}
                                        </Button>
                                        <Button color="gray" onClick={() => setOpenModal(false)}>
                                            No, cancel
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <button
                            onClick={handleSignOut}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Sign out
                        </button>
                    </div>
                    {presentUser.isAdmin && <Link to={'/create-post'}>
                        <button className="min-w-full px-4 py-2 mt-5 text-white bg-gray-700 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-700" >
                            {loading ? (
                                <>
                                    <Spinner size='sm' color='white'></Spinner>
                                    <span className='pl-2'>Loading...</span>
                                </>
                            ) : "CREATE A POST"}
                        </button>
                    </Link>}
                </div>
            </div>
        </>
    );
};

export default Profile;
