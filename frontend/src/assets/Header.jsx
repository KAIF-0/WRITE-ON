import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Dropdown } from 'flowbite-react';
import { signoutSuccess } from '@/redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { presentUser } = useSelector((state) => state.user)
  const [isOpen, setIsOpen] = useState(false);
  const [search, setsearch] = useState("")
  console.log(search)

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const term = query.get('search')
    if (term) {
      setsearch(term)
    }

    // console.log(term)

  }, [location.search])


  const handleChange = async (e) => {
    setsearch(e.target.value)
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('/app/signout',
        {
          method: 'POST',
        });

      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        console.log(data.errorMessage)
      } else {
        dispatch(signoutSuccess());
        navigate('/login');
      }

    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-500 text-white shadow-lg md:w-full">
      <div className="container mx-auto px-4 flex justify-around items-center py-3">
        <div className="flex border border-white rounded-full items-center ">
          <div className=" text-white rounded-full p-2">
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
          <Link to="/" className=" pr-3 py-1 font-bold ">
            WriteOn
          </Link>
          {/* <span className="text-xl font-bold">On</span> */}
        </div>
        <div className="hidden md:flex items-center text-xl space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/projects" className="hover:text-gray-400">Projects</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
            required
              onChange={(e) => setsearch(e.target.value)}
              type="text"
              className="bg-gray-800  text-white rounded-full pl-4 pr-10 py-1 focus:outline-none"
              placeholder="Search..."
            />
            <Link to={`/search?search=${search}`} >
            {/* <div onClick={()=>setsearch("")}> */}
              <svg
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.75-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {/* </div> */}
            </Link>
          </div>
        </div>
        {presentUser ? (<div className='ml-32'>
          <Dropdown label={<Avatar alt="USER" img={presentUser.profilePic}></Avatar>} inline>
            <Dropdown.Header className='font-bold uppercase'>{presentUser.username}</Dropdown.Header>
            <Dropdown.Item><Link to={'/dashboard?tab=profile'}>Profile</Link></Dropdown.Item>
            <Dropdown.Item><Link onClick={handleSignOut}>Sign Out</Link></Dropdown.Item>
          </Dropdown>
        </div>) : (<Link to="/signin" className="border ml-28 border-white  px-4 py-1 rounded-full font-bold hover:bg-white hover:text-black">
          Sign in
        </Link>)}

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="flex justify-stretch mx-10 relative">
          <input
            required
            defaultValue={search}
            onChange={(e) => setsearch(e.target.value)}
            type="text"
            className="bg-gray-800 text-white rounded-full pl-4 pr-10 py-1 focus:outline-none"
            placeholder="Search..."
          />
          <Link to={`/search?search=${search}`}>
            <svg
            
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.75-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>
        </div>
        <Link to="/" className="block py-2 px-4 hover:bg-gray-800">Home</Link>
        <Link to="/about" className="block py-2 px-4 hover:bg-gray-800">About</Link>
        <Link to="/projects" className="block py-2 px-4 hover:bg-gray-800">Projects</Link>
      </div>
    </nav>
  );
};

export default Navbar;
