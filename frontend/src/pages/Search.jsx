import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SearchPage = () => {
    const location = useLocation();
    const [search, setsearch] = useState({
        "search": "",
        "category": "",
        "order": " "
    })
    const [searchResult, setSearchResult] = useState([])
    const [showMore, setshowMore] = useState(true)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const searchTerm = query.get('search')
        if (searchTerm) {
            setsearch({ ...search, search: searchTerm })
        }
    }, [location.search])


    const getPosts = async () => {
        setloading(true)
        const toastId = toast.loading('Loading content...');
        try {
            const res = await fetch(`/app/get-posts?search=${search.search}&sorting=${search.order}&category=${search.category}&limit=9`)
            const data = await res.json()
            if (res.ok) {
                setSearchResult(data.posts)
                setloading(false)
            }
            if (data.posts.length < 9) {
                setshowMore(false);
            }
            if (!res.ok) {
                setloading(false)
                toast.error(data.errorMessage);
              }
            {!loading && toast.dismiss(toastId)}

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getPosts();
    }, [location.search])


    const handleClick = async () => {
        const index = searchResult.length;
        try {
            const res = await fetch(`/app/get-posts?search=${search.search}&sorting=${search.order}&category=${search.category}&index=${index}`)
            const data = await res.json()
            if (res.ok) {
                setSearchResult([...searchResult, ...data.posts])
                setshowMore(false)
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
        <Toaster/>
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg flex flex-col">
                {/* <form onSubmit={handleSearch}> */}
                <div className="mb-6">
                    <label htmlFor="search-term" className="block text-gray-700 text-sm font-bold mb-2">
                        Search Term:
                    </label>
                    <input
                        type="text"
                        id="search-term"
                        defaultValue={search.search}
                        onChange={(e) => setsearch({ ...search, search: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                </div>
                <div className="flex justify-between mb-6">
                    <div className="w-1/2 pr-2">
                        <label htmlFor="sort" className="block text-gray-700 text-sm font-bold mb-2">
                            Sort:
                        </label>
                        <select
                            // defaultValue={search.order}
                            onChange={(e) => setsearch({ ...search, order: e.target.value })}
                            id="sort"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>
                    <div className="w-1/2 pl-2">
                        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                            Category:
                        </label>
                        <select
                            // value={search.category}
                            onChange={(e) => setsearch({ ...search, category: e.target.value })}
                            id="category"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option>Category 1</option>
                            <option>Category 2</option>
                            <option>Category 3</option>
                        </select>
                    </div>
                </div>
                <div className="mb-6 text-center">
                    <Link to={`/search?search=${search.search}&sorting=${search.order}&category=${search.category}`}><Button>SEARCH</Button></Link>

                </div>
                {/* </form> */}
                {searchResult.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-7 mx-2">
                        {searchResult.map((post, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
                            >
                                <img
                                    className="w-full h-48 object-cover"
                                    src={post.image}
                                    alt={post.title}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
                                    <span className="text-sm bg-gray-50 text-gray-500">{post.category}</span>
                                </div>
                                <Link className='flex justify-center mb-5 ' to={`/post/${post.slug}`}>
                                    <Button className="w-[90%] bg-gray-700">
                                        READ WRITEON's
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (<><p className="italic text-center text-3xl">No results...</p></>)}

                {showMore ? <Button
                    onClick={handleClick}

                >Show More...
                </Button> : <></>}

            </div>
        </div></>
    );
};

export default SearchPage;
