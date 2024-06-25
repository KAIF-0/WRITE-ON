import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, uploadBytesResumable, getStorage, ref } from "firebase/storage";
import { app } from '@/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [form, setform] = useState({
        title: '',
        category: '',
        content: ''
    });
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [fileUploadProgress, setFileUploadProgress] = useState(null)
    const [fileUploadError, setFileUploadError] = useState(null)

    

    const handlePublish = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/app/create-post",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

            const data = await res.json()
            console.log(data)

            if (!res.ok) {
                // dispatch(updateFailure(data.errorMessage));
                toast(errorMessage + "...", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

            if (res.ok) {
                // dispatch(updateSuccess(data));
                // console.log(presentUser)
                toast("POST SUCCESFULL...", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            console.log(error.message)
            // dispatch(updateFailure(error.errorMessage));
        }
    //   console.log(form)
    }

    const handleUploadFile = async () => {
        try {
            const storage = getStorage(app);
            const nestedFolderPath = 'blogPic'; // Replace with your nested folder path
            const fileName = `${nestedFolderPath}/${new Date().getTime()}_${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setFileUploadProgress(progress.toFixed(0))
            },
                (error) => {
                    setFileUploadError('Upload Fail...')
                    setFileUploadProgress(null);
                    console.log(fileUploadError)

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFileUploadError(null);
                        setFileUploadProgress(null);
                        setform({ ...form, image: downloadURL })
                    });
                    console.log("Image Uploaded Successfully...")


                }
            );
        } catch (error) {
            console.log(error)
            setFileUploadError("IMAGE UPLOAD FAIL...");
            setFileUploadProgress(null);
        }


    }





    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <div className="flex justify-center mx-5 items-center min-h-screen bg-white text-white">
                <div className="w-full max-w-screen-md bg-gray-700 p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold mb-4">Create a post</h2>
                    <form onSubmit={handlePublish} >
                            <input
                                required
                                onChange={(e)=>setform({ ...form, title: e.target.value })}
                                type="text"
                                placeholder="Title"
                                className="w-full p-2 mb-5 bg-white text-black rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <select
                                onChange={(e)=>setform({ ...form, category: e.target.value })}
                                required
                                className="w-full p-2 mb-5 bg-white text-black rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option>Select a category</option>
                                <option>Category 1</option>
                                <option>Category 2</option>
                                <option>Category 3</option>
                            </select>
                            <div className="flex items-center justify-between mb-5 space-x-4">
                                <input  type="file" accept='image/*' className='bg-white text-black rounded' onChange={(e) => setFile(e.target.files[0])} />
                                <button onClick={handleUploadFile} disabled={!file} className=" p-2 min-w-[50%] bg-white text-black rounded border border-black focus:ring-2 focus:ring-black">
                                    Upload Image
                                </button>
                            </div>
                            {form.image && <img
                                src={form.image}
                                alt="image"
                                className="w-full my-5 h-60 object-cover"

                            />}
                        <div className="mb-5 h-64 bg-white  text-black">
                            <ReactQuill onChange={(value)=> setform({...form, content:value })} theme="snow" className='h-[188px] md:h-[214px] rounded' />
                        </div>
                        <button type="submit" className="min-w-full px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-700" >
                            Publish
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreatePost;
