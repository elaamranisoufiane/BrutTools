//'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';



const ITEMS_PER_PAGE = 10;
const Admin = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [searchSentence, setSearchSentence] = useState("");

    const [searchSubs, setSearchSubs] = useState(-1);
    const [searchStatus, setSearchStatus] = useState(-1);

    const handleSearchSubsChange = (e) => {
        setSearchSubs(e.target.value);
    };

    const handleSearchStatusChange = (e) => {
        setSearchStatus(e.target.value);
    };

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`/getAllUsers?page=${currentPage}&querySearch=${searchSentence}&statusActive=${searchStatus}&statusSubscription=${searchSubs}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    };

    const getMaxPages1 = async () => {
        try {
            const response = await axios.get('/getTotalUsers', {
                withCredentials: true,
            });
            const totalUsers = response.data;
            const calculatedMaxPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);
            setMaxPages(calculatedMaxPages);
        } catch (error) {
            console.error("Error fetching total users:", error);
        }
    };

    useEffect(() => {
        getAllUsers().then((result) => {
            setUsers(result);
        });
        //setCurrentPage(1);
        getMaxPages1();
    }, [currentPage]);

    //////////////
    const handleSearchSubmit = (event) => {
        getAllUsers().then((result) => {
            setUsers(result);
        });
        setCurrentPage(1);
        getMaxPages1();
    };

    //delete user 
    const deleteUser = (userId) => {
        axios.delete(`/deleteUser/${userId}`)
            .then((response) => {
                //console.log('Item deleted successfully', response.data);
                //window.location.href = '/admin/index';
                getAllUsers().then((result) => {
                    setUsers(result);
                });
                generatePageNumbers();
                getMaxPages1();

            })
            .catch((error) => {
                console.error('Error deleting item', error);
            });
    };


    const generatePageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(maxPages, currentPage + 1);


        if (currentPage > 2) {
            pageNumbers.push(
                <li key="min" className="mr-2">
                    <button
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 "
                    >
                        ...
                    </button>
                </li>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className="mr-2">
                    <a
                        onClick={() => setCurrentPage(i)}
                        className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${currentPage === i
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                            } hover:bg-gray-100 hover:text-gray-700 `}
                    >
                        {`${i}`}
                    </a>
                </li>
            );
        }

        if (currentPage < (maxPages - 1)) {
            pageNumbers.push(
                <li key="max" className="mr-2">
                    <button
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 "
                    >
                        ...
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };


    return (
        <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen">
            <div className="container bg-white p-10 rounded-lg   mx-auto flex-col">
                <h2 className="text-2xl font-semibold">Users Management</h2>

                <div className="bg-white p-4 rounded-lg">
                    <div className="grid grid-cols-1 gap-4">

                        <div className="p-4 rounded-lg flex-auto">
                            <span className="float-left">
                                <a className="font-bold py-2 px-4 roundedmt-4  items-center  tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                    href="/admin/add">Add User</a>
                            </span>

                            <div className="float-right">

                                <select
                                    id="searchSubs"
                                    name="searchSubs"
                                    className="border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-900 mt-2 mb-2"
                                    value={searchSubs}
                                    onChange={handleSearchSubsChange}
                                >
                                    <option value="-1" >Subscribe Status</option>
                                    <option value="0">Not subscribe</option>
                                    <option value="1">Subscribe</option>
                                </select>

                                <select
                                    id="searchStatus"
                                    name="searchStatus"
                                    className="border ml-2 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-900 mt-2 mb-2 placeholder='status'"
                                    value={searchStatus}
                                    onChange={handleSearchStatusChange}
                                >
                                    <option value="-1">Status</option>
                                    <option value="0">Not Active</option>
                                    <option value="1">Active</option>
                                </select>

                                <input className='font-bold py-2 px-4 roundedmt-4 ml-2  items-center placeholder="Search"  tracking-wide bg-gray-100 transition duration-200 shadow-mdfocus:shadow-outline focus:outline-none rounded'
                                    onChange={e => { setSearchSentence(e.target.value); }} placeholder="Search users" />
                                <a onClick={e => { handleSearchSubmit(e) }} className="font-bold py-2 px-4 ml-2 roundedmt-4 cursor-pointer  items-center  tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded">Search</a>

                            </div>

                        </div>

                        {users.map((user, index) => (

                            <div key={index} className="bg-gray-100 p-4 rounded-lg flex-auto">
                                <div className="text-xl font-semibold">{user.id} - {user.username}  </div>
                                <div className="text-sm text-gray-600">
                                    <span className="mb-2"><b>Email:</b> {user.email}</span>
                                    <span className="mb-2 ml-3"><b>Number of generated images: </b>{user.attempt}</span>
                                    <span className="mb-2 ml-3"><b>User created at: </b>{new Date(user.created_at).toLocaleDateString()}</span>
                                    <span className="mb-2 ml-3"><b> Credits: {user.credits}</b></span>
                                    <span className="block"><b>Subscription End: </b>
                                        {user.currentPeriodEnd ? (
                                            <>
                                                {new Date(user.currentPeriodEnd).toLocaleDateString()}
                                            </>
                                        ) : <>Not subscribed</>}
                                    </span>

                                    <span ><b>Status: </b>
                                        {user.canceled || user.credits == 0 || user.planName === 'Free Plan' ? (
                                            <span className="text-red-700">
                                                Not Active
                                            </span>
                                        ) :
                                            <span className="text-green-700">
                                                Active
                                            </span>
                                        }
                                    </span>
                                    <br />
                                    <span ><b>Plan: </b>
                                        {user.planName ? (
                                            <>
                                                {user.planName}
                                            </>
                                        ) : null}
                                    </span>
                                    <br />
                                    <span ><b>Email Status: </b>
                                        {user.is_verified && user.is_verified == 1 ? (
                                            <>
                                                verified
                                            </>
                                        ) :
                                            <>
                                                Not verified
                                            </>}
                                    </span>

                                </div>

                                <div className="mt-2 float-right">
                                    <a className="bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 roundedmt-4  items-center  tracking-wide text-white transition duration-200 shadow-md focus:shadow-outline focus:outline-none  rounded" href={`/admin/edit/${user.id}`}>Edit</a>
                                    <a className="ml-4 bg-red-500 font-bold py-2 px-4 roundedmt-4  items-center  tracking-wide text-white transition duration-200 shadow-md hover:bg-red-800 focus:shadow-outline focus:outline-none rounded cursor-pointer" onClick={() => deleteUser(user.id)}>Delete</a>
                                </div>
                            </div>

                        ))}

                        <nav className="flex justify-center items-center">
                            <ul className="inline-flex -space-x-px text-sm">
                                <li>
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prevPage) => prevPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Previous
                                    </button>
                                </li>
                                {generatePageNumbers()}
                                <li>
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prevPage) => prevPage + 1)
                                        }
                                        disabled={currentPage === maxPages}
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>




                    </div>
                </div>

            </div>


            <style>{`
        main { 
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .footer-content {
          width: 100%;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: space-between; 
          align-items: center; 
          color: gray;
        }

        .footer-links {
          text-decoration: none;
          color: gray;
        } 
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

            <style>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        
      `}</style>


        </main >


    );

};
export default Admin; 