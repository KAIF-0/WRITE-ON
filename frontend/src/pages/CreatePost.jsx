import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, uploadBytesResumable, getStorage, ref } from "firebase/storage";
import { app } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CreatePost = () => {
    const [form, setform] = useState({
        title: '',
        category: '',
        content: ''
    });
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [fileUploadProgress, setFileUploadProgress] = useState(false)

    

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
            if(res.ok){
                toast.success('Post Created Successfully')
                navigate(`/post/${data.slug}`)
            }
            if(!res.ok){
                toast.error(data.errorMessage)
            }

        } catch (error) {
            console.log(error.message)      
        }
    }

    const handleUploadFile = async () => {
        const toastId = toast.loading('Uploading image...');
        try {
            const storage = getStorage(app);
            const nestedFolderPath = 'blogPic'; // Replace with your nested folder path
            const fileName = `${nestedFolderPath}/${new Date().getTime()}_${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed', (snapshot) => {
                setFileUploadProgress(true)
            },
                (error) => {
                    setFileUploadProgress(false);
                    toast.error('Image Upload Failed')
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setform({ ...form, image: downloadURL })
                        setFileUploadProgress(false);
                    });
                    {!fileUploadProgress && toast.dismiss(toastId)}


                }
            );
        } catch (error) {
            console.log(error)
            setFileUploadProgress(false);
        }
        


    }





    return (
        <>
         <Toaster/>
            <div className="flex my-10 justify-center mx-5 items-center min-h-screen bg-white text-white">
                <div className="w-full max-w-screen-md bg-gray-300 p-6 rounded-lg shadow-lg">
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
