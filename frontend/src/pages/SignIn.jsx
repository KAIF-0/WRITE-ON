import { Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '@/redux/user/userSlice.js';
import GoogleButton from '@/assets/oAuth';

const SignIn = () => {
  const { loading, errorMessage, presentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch('/app/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

      const data = await res.json()

      if (data.success === false) {
        dispatch(signInFailure(data.errorMessage));
      }

      if (data.success !== false) {
        dispatch(signInSuccess(data));
        navigate('/dashboard?tab=profile')
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md min-h-[70vh] flex justify-center items-center flex-col rounded-lg p-8 mx-5 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-black text-white rounded-full p-3">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l6.16-3.422A12.042 12.042 0 0112 21a12.042 12.042 0 01-6.16-10.422L12 14z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">SIGN IN</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-bold hover:bg-gray-800 transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' color='white'></Spinner>
                  <span className='pl-2'>Loading...</span>
                </>
              ) : "SIGN IN"}
            </button>
            <GoogleButton/>
            <div className="text-center mt-4">
              <Link to="/signup" className="text-black hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
