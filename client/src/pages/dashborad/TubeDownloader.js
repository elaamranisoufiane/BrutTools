//'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadButton from './DownloadButtonS';
import moment from 'moment';
const DOMAIN_NAME = window.location.origin;
let selectedfile = null;
let isProS = null;
let credits = null;
let descBool = null;

//increments
const incrementAttempt = async () => {
    try {
        const response = await axios.get('/incrementAttempt', {
            withCredentials: true,
        });
        const dataAsText = JSON.stringify(response.data);

        return dataAsText;
    } catch (error) {
        console.error("Attempt number Check failed:", error);
        return false;
    }
};

const descrementCredits = async () => {
    try {
        const response = await axios.get('/descrementCredits', {
            withCredentials: true,
        });
        const dataAsText = JSON.stringify(response.data);

        return dataAsText;
    } catch (error) {
        console.error("Credit desc failed:", error);
        return false;
    }
};


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

const role = await getUsername().then((result) => {
    return result.role;
});

const showAddCreditsButton = await getUsername().then((result) => {
    return (result.currentPeriodEnd && moment(result.currentPeriodEnd) > Date.now());
});




const TubeDownloader = () => {
    const [plans, setPlans] = useState([]);
    const [plansPayment, setPlansPayment] = useState([]);
    const [showlimitImageSize, setShowlimitImageSize] = useState(false);


    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('/api/getAllProductss', {
                    withCredentials: true,
                });
                setPlans(response.data);
            } catch (error) {
                console.error("Failed to fetch plans:", error);
            }
        };

        fetchPlans();
    }, []);

    useEffect(() => {
        const fetchPlansPayment = async () => {
            try {
                const response = await axios.get('/api/getAllProductsspayment', {
                    withCredentials: true,
                });
                setPlansPayment(response.data);
            } catch (error) {
                console.error("Failed to fetch plans payment:", error);
            }
        };

        fetchPlansPayment();
    }, []);

    const [showUpgrade, setShowUpgrade] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const [displayrenimage, setDisplaygenimage] = useState(true);
    const [imageUrl, setImageUrl] = useState(null);
    const [datagen, setDataGen] = useState(null);
    const [descfield, setDescfield] = useState('');
    const [descError, setDescError] = useState('');
    //galery images vlaues 

    var [checkpass, setCheckPass] = useState(null);
    var [checkSubscribe, setCheckSubscribe] = useState(null);

    //initialize 
    const initialize = async () => {
        setImageUrl(null);
        setDataGen(null);
    }

    // useEffect(() => {
    //     const myButton = document.getElementById('myButton');
    //     myButton.addEventListener('click', handleUpload);
    // }, []);



    //var checkpass = true;

    useEffect(() => {
        axios({
            method: "get",
            withCredentials: true,
            url: "/checkNumberOfAttempt"
        })
            .then(respense => {
                setCheckPass(respense.data);
            })
            .catch(err => console.log(err));
    });

    //var checkpass = true;
    useEffect(() => {
        axios({
            method: "get",
            withCredentials: true,
            url: "/checkSubscribe"
        })
            .then(respense => {
                const isPro = JSON.stringify(respense.data);
                setCheckSubscribe(isPro);
                isProS = isPro;
                // setCheckSubscribe(0);
            })
            .catch(err => console.log(err));
    });

    //var checkpass = true;

    useEffect(() => {
        axios({
            method: "get",
            withCredentials: true,
            url: "/getUserCredits"
        })
            .then(response => {
                credits = response.data.credits;
            })
            .catch(err => console.error(err));
    }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        selectedfile = file;
    };



    useEffect(() => {
        if (!descfield.trim()) {
            descBool = true;
        } else {
            descBool = false;
        }
    });

    //save the new removed background image
    const handleUpload = async () => {
        try {
            if (isProS === 'true' && (credits > 0 || role == 'admin')) {
                checkpass = true;
            } else if (credits > 0) {
                checkpass = true;
            } else {
                checkpass = false;
            }

            if (descBool) {
                setDescError('The Description is required.');
                return;
            } else {
                setDescError('');
            }

            if (!checkpass) {
                setIsLoading(false);
                setShowUpgrade(true);
            }
            else if (checkpass) {
                const displayResults = document.getElementById('displayResults');
                //upload image  
                if (!selectedfile) {
                    return;
                }

                // Check the dimensions of the selected image
                const image = new Image();
                image.src = URL.createObjectURL(selectedfile);
                image.onload = async () => {
                    const width = image.width;
                    const height = image.height;
                    if ((width * height) > 8294400 && isProS !== 'true') {
                        setIsLoading(false);
                        setShowlimitImageSize(true);
                        setDataGen(null);
                        return;
                    } else {

                        setIsLoading(true);
                        try {
                            initialize()
                            const formData = new FormData();
                            formData.append('image', selectedfile);
                            const response = await axios.post('/upload', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });
                            if (response.status === 200) {
                                setImageUrl(DOMAIN_NAME + '/uploads/' + response.data.newImageUrl);

                                const urlSaved = '/uploads/' + response.data.newImageUrl;
                                axios({
                                    method: "post",
                                    data: {
                                        url: urlSaved,
                                        id_user: userId
                                    },
                                    url: "/addImage",
                                    withCredentials: true,
                                })
                                    .then((data) => {
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });

                                displayResults.style.display = 'block';
                            }


                        } catch (error) {
                            setIsLoading(false);
                            console.error('Error uploading image:', error);
                        } finally {
                            setIsLoading(false);
                        }
                    }
                };
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    //genrate BG
    useEffect(() => {
        if (isProS === 'true' && (credits > 0 || role == 'admin')) {
            checkpass = true;
        } else if (credits > 0) {
            checkpass = true;
        } else {
            checkpass = false;
        }

        if (checkpass) {
            if (imageUrl) {
                try {
                    setDisplaygenimage(true);
                    const encodedUrl = encodeURIComponent(imageUrl);
                    var image_number;
                    var NpromptDesc2;
                    var NpromptDesc;
                    if (document.getElementById('numberImages') != null) { image_number = document.getElementById('numberImages').value; }
                    const promptDesc2 = document.getElementById('desc').value;
                    const words = promptDesc2.split(" ");
                    const promptDescDispatched = words.join("+");
                    const promptDesc = encodeURIComponent(promptDescDispatched);
                    if (document.getElementById('NegPro') != null) {
                        NpromptDesc2 = document.getElementById('NegPro').value;
                        const Nwords = NpromptDesc2.split(" ");
                        const NpromptDescDispatched = Nwords.join("+");
                        NpromptDesc = encodeURIComponent(NpromptDescDispatched);
                    } else { NpromptDesc = ""; }
                    var size;
                    var scale;
                    if (document.getElementById('size') != null) { size = encodeURIComponent(document.getElementById('size').value); } else { size = "Original"; }
                    if (document.getElementById('scale') != null) { scale = document.getElementById('scale').value; } else { scale = 1; }

                    fetch(`/api/genbg?url=${encodedUrl}&promptDesc=${promptDesc}&image_number=${image_number}&NpromptDesc=${NpromptDesc}&size=${size}&scale=${scale}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                                setDisplaygenimage(false);
                            }
                            return response.json();
                        })
                        .then(async (responseData) => {
                            setDataGen(responseData.newurl);
                            //save image 

                            for (let i = 0; i < responseData.newurl.length; i++) {
                                axios({
                                    method: "post",
                                    data: {
                                        imageURL: responseData.newurl[i]
                                    },
                                    url: "/downloadImage",
                                    withCredentials: true,
                                })
                                    .then(respense => {
                                        const urlSaved = respense.data.newImageUrl;

                                        axios({
                                            method: "post",
                                            data: {
                                                url: urlSaved,
                                                id_user: userId
                                            },
                                            url: "/addImage",
                                            withCredentials: true,
                                        })
                                            .then((data) => {
                                                //console.log(data.message);
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    })
                                    .catch(err => console.log(err));

                            }
                            setIsLoading(false);
                            //checksub 
                            axios({
                                method: "get",
                                withCredentials: true,
                                url: "/checkSubscribe"
                            })
                                .then(respense => {
                                    const isPro = JSON.stringify(respense.data);
                                    setCheckSubscribe(isPro);
                                })
                                .catch(err => console.log(err));
                            //checknumber
                            await incrementAttempt();
                            await descrementCredits();
                            axios({
                                method: "get",
                                withCredentials: true,
                                url: "/checkNumberOfAttempt"
                            })
                                .then(respense => {
                                    setCheckPass(respense.data);
                                })
                                .catch(err => console.log(err));


                            //update dredits
                            axios({
                                method: "get",
                                withCredentials: true,
                                url: "/getUserCredits"
                            })
                                .then(respense => {
                                    credits = respense.data.credits;
                                })
                                .catch(err => console.log(err));
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            setIsLoading(false);

                        });
                    setIsLoading(false);
                    setDisplaygenimage(false);

                } catch (error) {
                    console.error('Error creating object URL:', error);
                    setIsLoading(false);
                    setDisplaygenimage(false);

                }
            }

        }
    }, [imageUrl]);


    // //display image uploaded
    // if (typeof window !== 'undefined') {
    //     const imageInput = document.getElementById('dropzone-file');
    //     const imageView = document.getElementById('imageView');
    //     const imageContainer = document.getElementById('imageContainer');
    //     const imagePlaceFree = document.getElementById('imagePlaceFree');
    //     const imagePlaceFilled = document.getElementById('imagePlaceFilled');
    //     if (imageInput) {
    //         imageInput.addEventListener('change', function () {
    //             const file = imageInput.files[0];
    //             if (file) {
    //                 const reader = new FileReader();

    //                 reader.onload = function (e) {
    //                     const imageUrl = e.target.result;
    //                     imagePlaceFree.style.display = 'none';
    //                     imagePlaceFilled.style.display = 'block';
    //                     imageView.src = imageUrl;
    //                     imageContainer.style.display = 'block';
    //                 };
    //                 reader.readAsDataURL(file);
    //             }
    //         });
    //     }
    // }


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
        <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen p-2">
            Comming Soon ....
            {false && (
                <div className="container bg-white p-10 rounded-lg  mx-auto flex-col">
                    <h2 className="text-2xl font-semibold">Video Downloader</h2><br></br>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                                </div>
                                <input id="dropzone-file" hidden type="file" onChange={handleFileChange} className="hidden" name="dropzone-file" />
                            </label>
                            {descError && <p className="text-red-500 text-sm mt-2">{descError}</p>}
                            <textarea onChange={(e) => {
                                setDescfield(e.target.value);
                            }}
                                placeholder="Describe image" id="desc" name="desc" className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-900 mt-2" required></textarea>

                            <select id="numberImages" name="numberImages" className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-900 mt-2 mb-2" defaultValue="1">
                                <option value="1" disabled hidden>Number of images to generate</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>



                            {isProS && !(isProS === 'true') ?
                                (
                                    <div id="adsDiv1" className='w-full h-auto bg-red-600'>
                                        <center>↓</center>
                                    </div>
                                ) : null}


                            {isLoading ? (
                                <button id="myButton" value="" className="mt-4 w-full items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded" >
                                    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </button>
                            ) : (
                                <button id="myButton" value="" className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded" >
                                    Generate Background
                                </button>
                            )}


                        </div>

                        <div src="" id="imagePlaceFree" width="100%" className=" bg-slate-100" alt="Processed Image"></div>



                        <div className="w-full" id="imagePlaceFilled" hidden>
                            <div id="imageContainer">

                                <div className="flex items-center justify-center container h-100">
                                    <img
                                        src=""
                                        className="h-full object-cover shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                                        id="imageView"
                                        alt="Processed Image"
                                    />
                                </div>



                            </div>
                        </div>
                    </div>



                    Comming Soon ...

                    <div id="displayResults" className="flex items-center justify-center">

                        {datagen ? (
                            <>
                                <h1 className="text-2xl font-bold mt-3 text-center">Downloaded Videos</h1>

                                {isProS && isProS !== 'true' && (
                                    <div id="adsDiv2" className="w-full h-auto bg-red-600">
                                        <center>↓</center>
                                    </div>
                                )}

                                <div className={`grid md:grid-cols-${datagen.length <= 2 ? 1 : datagen.length <= 4 ? 2 : 3} gap-1`}>
                                    {datagen.slice(1).map((url, index) => (
                                        <div
                                            key={index}
                                            className="relative group flex items-center justify-center container h-100 mt-3"
                                        >
                                            <video
                                                src={url}
                                                className="h-full object-cover shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                                                controls
                                                alt={`Downloaded Video ${index + 1}`}
                                            />
                                            <div className="absolute bottom-0 right-0 m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <DownloadButton
                                                    className="bg-blue-500 text-white flex items-center px-3 py-2 rounded-md mt-2 focus:outline-none"
                                                    fileUrl={url}
                                                    fileName={`Video_${getCurrentDateTime()}.mp4`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div>
                                {!displayrenimage && (
                                    <div className="w-full max-w-md mx-auto">
                                        <div className="flex justify-center items-center h-48">
                                            <div className="animate-spin w-16 h-16 border-t-2 border-blue-500 rounded-full"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>





                    {showUpgrade && role != 'admin' && !showAddCreditsButton ? (
                        <div id="showLimiteMessage" className="modal fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-80 items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
                            <div className="md:w-2/3 mx-auto inline-block  align-center rounded-lg overflow-hidden shadow-xl  transform transition-all sm:my-8 sm:align-middle bg-white">

                                <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">

                                    <h3 className="text-xl font-semibold text-gray-900"> Monthly Plans </h3>

                                    <button onClick={() => setShowUpgrade(false)} id="closeModelButton" type="button" className=" text-gray-900 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 ">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6">
                                        </path></svg><span className="sr-only">Close</span>
                                    </button>
                                </div>

                                <div className="justify-center w-auto sm:grid sm:grid-cols-1 md:grid-cols-2 gap-4 p-6">
                                    {plans.slice().reverse().map(plan => (
                                        <div className="p-6 space-y-6 flex flex-col relative">
                                            <div key={plan.id}>
                                                <p className="text-gray-700 text-left">Need more generations?  Upgrade to <b>
                                                    {plan.name}
                                                </b> today.
                                                </p>
                                                <div className="flex flex-col">
                                                    <div className="flex">
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="col-span-11 text-l flex font-semibold pl-2">
                                                            <span className="font-bold">
                                                                {plan.description}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rounded w-full flex flex-col border-solid">
                                                    <h3 className="text-3xl p-5 text-left pl-6">{plan.name}</h3>
                                                    <div className="flex flex-row items-center pt-3 pl-6 pr-10 gap-3 pb-3 text-primary-500">
                                                        <div className="flex flex-row gap-1">
                                                            <span className="text-base">$</span>
                                                            <p className="text-5xl font-semibold">{plan.price}</p>
                                                        </div>
                                                        <p className="font-light text-sm">/ month</p>
                                                    </div>
                                                    <div className="pl-6 pr-10 gap-3 pb-3 text-left">
                                                        <ul className="text-gray-700">
                                                            <li>No advertisements</li>
                                                            <li>Commercial usage of photos</li>
                                                            <li>Premium support</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="w-[200px] plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4 absolute bottom-5" href={plan.checkoutUrl}>Subscribe</a>

                                        </div>
                                    ))}



                                </div>

                            </div>

                        </div>
                    ) : null
                    }
                    {showUpgrade && role != 'admin' && showAddCreditsButton ? (
                        <div id="showLimiteMessage" className="modal fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-80 items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
                            <div className="md:w-2/3 mx-auto inline-block  align-center rounded-lg overflow-hidden shadow-xl  transform transition-all sm:my-8 sm:align-middle bg-white">


                                <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">

                                    <h3 className="text-xl font-semibold text-gray-900"> Add-on Plans </h3>


                                    <button onClick={() => setShowUpgrade(false)} id="closeModelButton" type="button" className=" text-gray-900 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 ">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6">
                                        </path></svg><span className="sr-only">Close</span>
                                    </button>
                                </div>

                                <div className="justify-center w-auto sm:grid sm:grid-cols-1 md:grid-cols-3 gap-4 p-6">
                                    {plansPayment.slice().reverse().map(plan => (
                                        <div className="p-6 space-y-6 flex flex-col relative">
                                            <div key={plan.id}>
                                                <p className="text-gray-700 text-left">Want to buy more credits? Upgrade to <b>
                                                    {plan.name}
                                                </b> today.
                                                </p>
                                                <div className="flex flex-col">
                                                    <div className="flex">
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="col-span-11 text-l flex font-semibold pl-2">
                                                            <span className="font-bold">
                                                                {plan.description}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rounded w-full flex flex-col border-solid">
                                                    <h3 className="text-3xl p-5 text-left pl-6">{plan.name}</h3>
                                                    <div className="flex flex-row items-center pt-3 pl-6 pr-10 gap-3 pb-3 text-primary-500">
                                                        <div className="flex flex-row gap-1">
                                                            <span className="text-base">$</span>
                                                            <p className="text-5xl font-semibold">{plan.price}</p>
                                                        </div>
                                                        <p className="font-light text-sm">/ month</p>
                                                    </div>
                                                    <div className="pl-6 pr-10 gap-3 pb-3 text-left">
                                                        <ul className="text-gray-700">
                                                            <li>No advertisements</li>
                                                            <li>Commercial usage of photos</li>
                                                            <li>Premium support</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="w-[200px] plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4 absolute bottom-5" href={plan.checkoutUrl}>Subscribe</a>

                                        </div>
                                    ))}



                                </div>
                            </div>

                        </div>
                    ) : null
                    }



                    {showlimitImageSize ? (
                        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div class="flex items-center justify-center min-h-screen">
                                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"> </div>
                                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-auto shadow-xl z-50">
                                    <div class="text-center">
                                        <div class="flex justify-center items-center mb-4">
                                            <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <title></title>
                                                    <g id="Complete">
                                                        <g id="alert-circle">
                                                            <g>
                                                                <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line>
                                                                <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line>
                                                                <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <p class="text-xl text-gray-800 font-bold mb-2">Alert! </p>
                                        <p class="text-gray-600">The image size exceeds the limit. Please subscribe to process higher size images.</p>
                                        <div class="mt-6">
                                            <button type="button" class="bg-red-500 hover:bg-red-600  py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out" onClick={() => setShowlimitImageSize(!showlimitImageSize)}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}




                </div>
            )}





            <style>{`

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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

        </main>

    );

};
export default TubeDownloader; 