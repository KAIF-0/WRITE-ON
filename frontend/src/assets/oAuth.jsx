import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase.js"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInFailure, signInSuccess } from '@/redux/user/userSlice.js';


const GoogleButton = () => {
    const { loading, errorMessage, presentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const navigate = useNavigate();

    const handleClick = async () => {
        // navigate('/google')

        const provider = new GoogleAuthProvider();
        provider.getCustomParameters({ prompt: 'select_account' })                 //ask for google account every time on click

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            //send to the backend
            const res = await fetch('/app/google',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: resultsFromGoogle.user.displayName,
                        email: resultsFromGoogle.user.email,
                        profilePic: resultsFromGoogle.user.photoURL
                    }),
                });
            const data = await res.json()
            if (data.success !== false) {
                dispatch(signInSuccess(data));
                navigate('/dashboard/?tab=profile')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <button type='button' onClick={handleClick} className="flex items-center justify-center min-w-full max-w-xs px-4 py-2 text-black border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google icon" className="w-5 h-5 mr-2" />
            <span className="text-sm">Continue with Google</span>
        </button>
    );
}

export default GoogleButton;