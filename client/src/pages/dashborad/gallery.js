import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadButton from './DownloadButton';


const getUsername = async () => {
    try {
        const response = await axios.get('/getUser', {
            withCredentials: true,
        });
        const isAuthenticated = JSON.stringify(response.data);
        return response.data

    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
};



const userId = await getUsername().then((result) => {
    return result.id;
});

const ITEMS_PER_PAGE = 8;
const Gallery = () => {


    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const getAllUserImages = async () => {
        try {
            const response = await axios.get('/getAllUserImages', {
                withCredentials: true,
                params: {
                    user_id: userId,
                    page: currentPage,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Request to get user images failed:', error);
            return false;
        }
    };

    const getMaxPages1 = async () => {
        try {
            const response = await axios.get('/getTotalImages', {
                withCredentials: true,
                params: {
                    user_id: userId
                },
            });
            const totalImages = response.data;
            const calculatedMaxPages = Math.ceil(totalImages / ITEMS_PER_PAGE);
            setMaxPages(calculatedMaxPages);
        } catch (error) {
            console.error("Error fetching total users:", error);
        }
    };

    useEffect(() => {
        getAllUserImages().then((result) => {
            setImages(result);
        });
        getMaxPages1();
    }, [currentPage]);




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



    //delete user 
    const deleteImage = (imageId) => {
        axios.delete(`/deleteImage/${imageId}`)
            .then((response) => {
                //console.log('image deleted successfully', response.data);
                // window.location.href = '/gallery';

                getAllUserImages().then((result) => {
                    setImages(result);
                });
                getMaxPages1();


            })
            .catch((error) => {
                console.error('Error deleting item', error);
            });
    };





    //hover to  button
    const [isHoveredDelete, setIsHoveredDelete] = useState(false);

    const handleMouseEnterDelete = () => {
        setIsHoveredDelete(true);
    };

    const handleMouseLeaveDelete = () => {
        setIsHoveredDelete(false);
    };


    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    };



    return (
        <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen" >
            <div className="container bg-white p-10 rounded-lg mx-auto">
                <h2 className="text-2xl font-semibold">Gallery</h2>
                <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">

                    {images && images.length > 0 ? (
                        images.map((image, index) => (
                            <div key={index} className="relative group">

                                <img
                                    src={image.url}
                                    alt={`Image ${index}`}
                                    className="w-full h-auto rounded-lg shadow-lg image-gallery"
                                />

                                <div className="absolute bottom-0 right-0 m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div>

                                        <button
                                            onClick={() => deleteImage(image.id)}
                                            className=" text-white flex items-center px-3 py-2 rounded-md focus:outline-none  bg-slate-50 opacity-60 hover:opacity-90"
                                            onMouseEnter={handleMouseEnterDelete}
                                            onMouseLeave={handleMouseLeaveDelete}
                                        >
                                            {isHoveredDelete && <div className="absolute right-0 text-gray-900 bg-slate-50 w-20 mr-12 mt-2 origin-top-right divide-y divide-gray-100 opacity-90 rounded-md ">Delete</div>}

                                            <svg

                                                width="30px"
                                                height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" /><line x1="88" y1="24" x2="168" y2="24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" /><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" /></svg>

                                        </button>

                                    </div >
                                    <div>
                                        <DownloadButton
                                            className="bg-blue-500 text-white flex items-center px-3 py-2 rounded-md mt-2 focus:outline-none"
                                            imageUrl={image.url}

                                            fileName={"Image_" + getCurrentDateTime() + ".jpg"}
                                        >
                                        </DownloadButton>

                                    </div>

                                </div>

                            </div>



                        ))
                    ) : (
                        <p>No images</p>
                    )}

                </div>


                <nav className="flex justify-center items-center mt-8">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button
                                onClick={() =>
                                    setCurrentPage((prevPage) => prevPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
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
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>


            </div>








            <style>{`
           .image-gallery {
            width: 100%;
            object-fit: cover;  
            aspect-ratio: 1; 
          }

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
export default Gallery; 