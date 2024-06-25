import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import RecentPost from '@/assets/RecentPost';
import { Link } from 'react-router-dom';
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Home = () => {
  const [postData, setpostData] = useState([])
  const [count, setcount] = useState(0)
  const [end, setend] = useState('')


  const getPost = async () => {
    try {
      const res = await fetch(`/app/get-posts?limit=1&index=${count}`);
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        setpostData(data.posts);
        setend(data.totalPosts);
      } else {
        console.log("CAN'T GET POST");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [count]);

  return (
    <div className="font-sans">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-500 text-white pt-16">
        <div className="container mx-auto px-6 ">
          <div className='space-y-14'>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-gray-950">WELCOME</span> <br />
              <span className="text-gray-400">TO</span> <br />
              <span className="text-white">WriteOn</span> <br />
              <span className="text-white">WEBSITE</span>
            </h1>
            <p className="text-lg md:text-xl">Welcome to WriteOn, your premier destination for all things technology.<br /> At WriteOn, we’re passionate about making tech accessible and engaging for everyone,<br /> from budding developers to seasoned professionals. Our blog is a hub of expert insights,<br /> covering everything from in-depth tutorials on the latest programming languages and frameworks to <br />thought-provoking articles on emerging tech trends.</p>
          </div>
          <img
            src="https://media.istockphoto.com/id/484912128/vector/abstract-technology-background.jpg?s=612x612&w=0&k=20&c=Hs-2X82hWuTCN30i3uLEhhkeCDtqag09WXlD5PXiv5o=" // Replace with actual image URL
            alt="Software Preview"
            className="mx-auto relative top-52"
          />
        </div>
      </header>



      {/* Summary Section */}
      <section className="bg-gray-100 p-5 mt-72">
        <div className='w-full border-2 border-black p-16'>
          <div className=" container mx-auto px-6 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <img
                className='rounded'
                src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230128123255/12-Best-Full-Stack-Projects-Ideas-in-2023.png" // Replace with actual image URL
                alt="Dashboard Preview"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to learn Full-Stack developing by building fun and engaging projects?</h2>
              <p className="text-gray-600 mb-6">
                Check out these projects website and start building your own projects.
              </p>
              <div className="flex items-center">
                <a href='https://www.geeksforgeeks.org/best-full-stack-project-ideas/' target='_blank' className="bg-gray-700 text-white py-2 px-4 rounded-full transition duration-300 hover:from-gray-600 hover:to-gray-400">
                  Full-Stack Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Recent WriteOn's...</h2>
          <div>
            <RecentPost limit="6" />
          </div>
        </div>
      </section>

      <header className="bg-gradient-to-r from-gray-800 to-gray-500 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl"> To explore or write your own WriteOn's.</h1>
          <p>More than 20,000+ Customers, see some wishes here.</p>
        </div>
        <div className='flex md:flex-row flex-col gap-3'>
          <Link to={"/signup"} className="bg-white text-gray-950 px-4 py-2 rounded mr-2">SIGN UP</Link>
          <Link to={"/signin"} className="border border-white px-4 py-2 rounded">SIGN IN</Link>
        </div>
      </header>


      {postData.map((e) => {
        return (<div key={e._id} className='w-[80%] mx-auto mb-10'>
          <section className="text-center pt-5">
            <p className="italic text-3xl">{e.title}</p>
            <p className="mt-2 text-gray-600">{e.category}</p>
          </section>
          <main className="text-center">
            <div className="flex md:flex-row justify-center items-center mx-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <button disabled={count == 0} onClick={() => setcount(count - 1)} className={`text-3xl ${count == 0 && "text-gray-300"}`}><FaChevronCircleLeft /></button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Previous post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <img src={e.image} alt={e.title} className="m-4 rounded h-60" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <button disabled={count + 1 == end} onClick={() => setcount(count + 1)} className={`text-3xl ${count + 1 == end && "text-gray-300"}`}><FaChevronCircleRight /></button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Next post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className=" line-clamp-3" dangerouslySetInnerHTML={{ __html: e.content }}></div>
            <div className='mt-7'>
              <Link to={`/post/${e.slug}`} className="bg-gray-700 text-white px-6 py-3 rounded-full">Read More</Link>
            </div>
          </main>

        </div>)
      })}


    </div>
  );
}

export default Home;
