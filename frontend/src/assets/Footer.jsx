import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from 'flowbite-react';
import { useState } from 'react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const footer = () => {

    function getCurrentYear() {
        const currentDate = new Date();
        return currentDate.getFullYear();
    }

    useEffect(() => {
        getCurrentYear();
    }, [])




    return (
        <Footer className="bg-white text-black flex flex-col">
            <div className=" bg-gray-300 min-w-full container mx-auto px-4 py-8 flex items-center md:flex-col justify-center ">
                <div className="flex flex-row md:flex-row space-x-5 md:space-x-12">
                    <div className="mb-6 md:mb-0">
                        <h5 className="font-bold mb-2">ABOUT</h5>
                        <ul>
                            <li><Link to="#" className="hover:underline cursor-pointer">Projects</Link></li>
                            <li><Link to="#" className="hover:underline cursor-pointer"> Blogs</Link></li>
                        </ul>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <h5 className="font-bold mb-2">FOLLOW US</h5>
                        <ul>
                            <li><Link to="#" className="hover:underline cursor-pointer">Github</Link></li>
                            <li><Link to="#" className="hover:underline cursor-pointer">Discord</Link></li>
                        </ul>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <h5 className="font-bold mb-2">LEGAL</h5>
                        <ul>
                            <li><Link to="#" className="hover:underline cursor-pointer">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:underline cursor-pointer">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-gray-800 to-gray-500 min-w-full text-white py-4">
                <div className="container mx-auto px-4 flex flex-col md:flex-row space-x-3 justify-center items-center">
                    <p className="text-sm hover:underline cursor-pointer">&copy; {getCurrentYear()} WriteOn</p>
                    <div className="mt-4 flex space-x-3 sm:mt-0 sm:justify-center ">
                        <Footer.Icon className='hover:text-white' href="#" icon={BsFacebook} />
                        <Footer.Icon className='hover:text-white' href="#" icon={BsInstagram} />
                        <Footer.Icon className='hover:text-white' href="#" icon={BsTwitter} />
                        <Footer.Icon className='hover:text-white' href="#" icon={BsGithub} />
                        <Footer.Icon className='hover:text-white' href="#" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}

export default footer;
