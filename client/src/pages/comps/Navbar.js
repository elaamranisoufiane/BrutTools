import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import mainBigLogo from '../../assets/mainbiglogo.png'


const getUsername = async () => {
    try {
        const response = await axios.get('/getUser', {
            withCredentials: true,
        });
        const isAuthenticated = JSON.stringify(response.data);

        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
};

const username = await getUsername().then((result) => {
    return result.username;
});
const role = await getUsername().then((result) => {
    return result.role;
});

const showAddCreditsButton = await getUsername().then((result) => {
    return (result.currentPeriodEnd && moment(result.currentPeriodEnd) > Date.now());
});

const setCheckSubscribe = async () => {
    try {
        const response = await axios.get('/checkSubscribe', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
};

const checkSubscribe = await setCheckSubscribe().then((result) => {
    return result;
});
// Call logout 
const handleLogout = () => {
    axios.get('/logout', { withCredentials: true })
        .then(res => {
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
};




let credits = null;

export default function NavBar() {
    const [plans, setPlans] = useState([]);
    // const [plansPayment, setPlansPayment] = useState([]);

    useEffect(() => {
        const getPlans = async () => {
            try {
                const response = await axios.get('/api/getAllProductss', {
                    withCredentials: true,
                });
                setPlans(response.data);
            } catch (error) {
                console.error("Login failed:", error);
            }
        };

        getPlans();
    }, []);

    // useEffect(() => {
    //     const getPlansPayment = async () => {
    //         try {
    //             const response = await axios.get('/api/getAllProductsspayment', {
    //                 withCredentials: true,
    //             });
    //             setPlansPayment(response.data);
    //         } catch (error) {
    //             console.error("Login failed:", error);
    //         }
    //     };

    //     getPlansPayment();
    // }, []);


    //dispaly the user name
    const [showProfile, setShowProfile] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [showUpgradeAddOnPlan, setShowUpgradeAddOnPlan] = useState(false);
    const [open, setOpen] = useState(false);
    const [showTools, setShowTools] = useState(false);

    useEffect(() => {
        getUsername().then(result => {
            if (result) {
                credits = result.credits;
            }
        });
    }, []);



    const toolsButtonRef = useRef(null);
    const profileButtonRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (toolsButtonRef.current && !toolsButtonRef.current.contains(event.target)) {
                setShowTools(false);
            }
        };

        const handleOutsideClickProfile = (event) => {
            if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };

        const handleOutsideClickMenu = (event) => {
            if (menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('click', handleOutsideClickProfile);
        document.addEventListener('click', handleOutsideClickMenu);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('click', handleOutsideClickProfile);
            document.removeEventListener('click', handleOutsideClickMenu);
        };
    });


    const Plans = plans.filter(plan => plan.category === "one_time");

    const getGridClasses = () => {
        if (Plans.length === 1) {
            return 'justify-center';
        } else if (Plans.length === 2) {
            return 'justify-center md:grid-cols-2';
        } else {
            return 'sm:grid-cols-1  lg:grid-cols-3';
        }
    };

    const PlansMonth = plans.filter(plan => plan.category === "subscription");

    const getGridClassesMonthlyPlans = () => {
        if (PlansMonth.length === 1) {
            return 'justify-center';
        } else {
            return 'justify-center sm:grid-cols-1 md:grid-cols-2';
        }
    };

    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };



    const ProTools = [
        {
            toolName: 'Video Downloader',
            toolUrl: '/tubedownloader-pro'

        }
        ,
        {
            toolName: 'Image to PDF',
            toolUrl: '/imagetopdf'

        }, {
            toolName: 'Word to PDF',
            toolUrl: '/wordtopdf'
        }, {
            toolName: 'PDF to Word',
            toolUrl: '/pdftoword'
        }, {
            toolName: 'Image Compressor',
            toolUrl: '/imagecompressor'
        }, {
            toolName: 'Merge PDF',
            toolUrl: '/mergepdf'
        }
    ];


    const Tools = [
        {
            toolName: 'Video Downloader',
            toolUrl: '/tubedownloader'
        },
        {
            toolName: 'Image to PDF',
            toolUrl: '/imagetopdf'

        }, {
            toolName: 'Word to PDF',
            toolUrl: '/wordtopdf'
        }, {
            toolName: 'PDF to Word',
            toolUrl: '/pdftoword'
        }, {
            toolName: 'Image Compressor',
            toolUrl: '/imagecompressor'
        }, {
            toolName: 'Merge PDF',
            toolUrl: '/mergepdf'
        }
    ];



    return (
        <>
            <nav className={`p-4 m-4 md:pl-20 mr-0 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-slate-900'}`}>
                <div className="container mx-auto flex justify-between items-center">

                    <a className="inline-flex items-center text-black-800 font-bold gap-2.5 text-xl md:text-2xl mr-20" href="/">
                        <span className=''>

                            <img className="w-40 h-auto img-responsive custom-image" alt="BrutTools logo" title="BrutTools logo" src={mainBigLogo} />
                        </span>
                        <span className='text-gray-600 text-sm mt-10'>V.0</span>
                    </a>
                    <nav className="hidden lg:flex gap-20 pr-64">
                        <a className="hover:text-indigo-500 active:text-red-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal" label="Home" href="/">Home</a>
                        {!username ? (
                            <a className="hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal" href="/pricing">Pricing</a>
                        ) : null}

                        {role == 'admin' ? (
                            <a className="hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal" href="/admin/index">Users Management</a>
                        ) : null}
                        {false ? (
                            <a className="hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal" href="/admin/add">Add Users</a>
                        ) : null}
                        {username ? (
                            <div className='relative'>
                                <a className="hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal cursor-pointer" ref={toolsButtonRef} onClick={() => setShowTools(!showTools)}>Tools</a>
                                {showTools ? (
                                    <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-300 mt-1 py-2 px-3 rounded shadow-md z-50 w-52">

                                        {ProTools.map((tool) => (
                                            <li key={tool.toolUrl}>
                                                <a
                                                    className="hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal"
                                                    href={tool.toolUrl}
                                                >
                                                    {tool.toolName}
                                                </a>
                                            </li>
                                        ))}

                                    </ul>
                                ) : null}
                            </div>

                        ) :
                            <div className='relative'>
                                <a className="hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal cursor-pointer" ref={toolsButtonRef} onClick={() => setShowTools(!showTools)}>Tools</a>
                                {showTools ? (
                                    <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-300 mt-1 py-2 px-3 rounded shadow-md z-50 w-52">

                                        {Tools.map((tool) => (
                                            <li key={tool.toolUrl}>
                                                <a
                                                    className="hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal"
                                                    href={tool.toolUrl}
                                                >
                                                    {tool.toolName}
                                                </a>
                                            </li>
                                        ))}



                                    </ul>
                                ) : null}
                            </div>
                        }

                        {username ? (
                            <a className="hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal" href="/gallery">Gallery</a>
                        ) : null}
                        {!username ? (

                            <a className="hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 lg:text-base lg:font-normal" href="/login">Login</a>
                        ) : null}

                    </nav>

                    {username && !showAddCreditsButton && role != 'admin' ? (
                        <a className="items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded cursor-pointer hidden lg:inline-flex " id="upgradeButton" onClick={() => setShowUpgrade(true)}>Upgrade</a>
                    ) : null}

                    {username && showAddCreditsButton && role != 'admin' ? (
                        <a className="items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded cursor-pointer hidden lg:inline-flex " id="upgradeButton" onClick={() => setShowUpgradeAddOnPlan(true)}>Add-on Plans</a>
                    ) : null}


                    {/* <div className=''>
                        <button
                            className="bg-gray-800 text-white font-semibold rounded-full w-10 h-10 text-xl flex items-center justify-center"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? '🌞' : '🌙'}
                        </button>
                    </div> */}


                    {!username ? (
                        <div className=''>
                            <a
                                className="inline-flex items-center justify-center h-12 p-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-main-color rounded-full float-right"
                                href="/register"
                            >
                                Sign up
                            </a>
                        </div>

                    ) :
                        <div>

                            <div className="cursor-pointer relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full" ref={profileButtonRef} onClick={() => setShowProfile(!showProfile)}>
                                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                            </div>


                            <div className="z-10 relative">
                                {showProfile ? (
                                    <ul className="absolute right-0 text-gray-900 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
                                        <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                            <span className="text-green-900 hover:text-gray-200" >
                                                Welcome {username} <span className='font-bold'>{username && role !== 'admin' ? (<>, Credits: {credits}</>) : null}</span>
                                            </span>
                                        </li>

                                        {username ? (
                                            <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                                <a href='/profile' className="">Profile</a>
                                            </li>
                                        ) : null}
                                        {username ? (
                                            <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                                <a href='/subs' className="">Subscription</a>
                                            </li>
                                        ) : null}

                                        {role == 'admin' ? (
                                            <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                                <a href='/setting' className="">Settings</a>
                                            </li>
                                        ) : null}

                                        {username ? (
                                            <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                                <button onClick={handleLogout} >Logout </button>
                                            </li>
                                        ) : null}

                                    </ul>
                                ) : null}
                            </div>
                        </div>}



                    <div className="z-10 relative">
                        <button
                            className="block lg:hidden w-10 h-10 rounded-md bg-gray-200 "
                            onClick={() => setOpen(!open)}
                            ref={menuButtonRef}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {open && (
                            <ul className="lg:hidden absolute right-0 text-gray-900 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
                                <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                    <a href="/">Home</a>
                                </li>
                                {!username ? (
                                    <>
                                        <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                            <a className="" href="/pricing">Pricing</a>
                                        </li>


                                        {Tools.map((tool) => (
                                            <li key={tool.toolUrl} className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                                <a
                                                    className=""
                                                    href={tool.toolUrl}
                                                >
                                                    {tool.toolName}
                                                </a>
                                            </li>
                                        ))}


                                    </>
                                ) : null}

                                {role == 'admin' ? (
                                    <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">

                                        <a className="" href="/admin/index">Users Management</a>
                                    </li>
                                ) : null}
                                {false ? (
                                    <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                        <a className="" href="/admin/add">Add Users</a>
                                    </li>
                                ) : null}

                                {username ? (
                                    <>
                                        {ProTools.map((tool) => (
                                            <li key={tool.toolUrl} className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                                <a
                                                    className=""
                                                    href={tool.toolUrl}
                                                >
                                                    {tool.toolName}
                                                </a>
                                            </li>
                                        ))}
                                    </>
                                ) : null}
                                {!username ? (
                                    <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                        <a className="" href="/register">Register</a>
                                    </li>
                                ) : null}
                                {username ? (
                                    <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                        <a className="" href="/gallery">Gallery</a>
                                    </li>
                                ) : null}
                                {!username ? (
                                    <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                        <a className="" href="/login">Login</a>
                                    </li>
                                ) : null}
                                {username && !showAddCreditsButton && role != 'admin' ? (
                                    <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                        <a className="w-full inline-flex items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded cursor-pointer" id="upgradeButton" onClick={() => setShowUpgrade(true)}>Upgrade</a>
                                    </li>
                                ) : null}

                                {username && showAddCreditsButton && role != 'admin' ? (
                                    <li className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                        <a className="w-full inline-flex items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded cursor-pointer" id="upgradeButton" onClick={() => setShowUpgradeAddOnPlan(true)}>Add-on Plans </a>
                                    </li>
                                ) : null}




                            </ul>
                        )}
                    </div>
                </div >
            </nav >




            {
                showUpgrade ? (
                    <div id="showLimiteMessage" className="modal fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-80 items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
                        <div className="md:w-2/3 mx-auto inline-block  align-center rounded-lg overflow-hidden shadow-xl  transform transition-all sm:my-8 sm:align-middle bg-white">
                            <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900"> Monthly Plans </h3>

                                <button onClick={() => setShowUpgrade(false)} id="closeModelButton" type="button" className=" text-gray-900 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 ">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6">
                                    </path></svg><span className="sr-only">Close</span>
                                </button>
                            </div>

                            {plans.length === 0 ? (
                                <div className="flex justify-center my-10 w-full">
                                    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>

                                </div>
                            ) : (
                                // <div className="justify-center w-auto sm:grid sm:grid-cols-1 md:grid-cols-2 gap-4 p-6">

                                <div className={`grid gap-4 p-6 ${getGridClassesMonthlyPlans()}`} >

                                    {plans.map(plan => (
                                        <>
                                            {
                                                plan.category === 'subscription' ? (
                                                    <div className="p-6 space-y-6 flex flex-col relative" >
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
                                                                        <span className="font-bold" dangerouslySetInnerHTML={{ __html: plan.description }}>
                                                                            {/* {plan.description} */}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="rounded w-full flex flex-col border-solid">
                                                                <h3 className="text-3xl p-5 text-left pl-6">{plan.name} ({plan.credits} Credits) , {plan.category}</h3>
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
                                                ) : (
                                                    <>
                                                    </>
                                                )
                                            }
                                        </>

                                    ))}

                                </div>
                            )}


                            <hr></hr>

                        </div>

                    </div >
                ) : null
            }


            {
                showUpgradeAddOnPlan ? (
                    <div id="showLimiteMessage" className="modal fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-80 items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
                        <div className="md:w-2/3 mx-auto inline-block  align-center rounded-lg overflow-hidden shadow-xl  transform transition-all sm:my-8 sm:align-middle bg-white">
                            <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900"> Add-on Plans  </h3>

                                <button onClick={() => setShowUpgradeAddOnPlan(false)} id="closeModelButton" type="button" className=" text-gray-900 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 ">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6">
                                    </path></svg><span className="sr-only">Close</span>
                                </button>
                            </div>



                            {/* <div className="justify-center w-auto sm:grid sm:grid-cols-1 md:grid-cols-3 gap-4 p-6"> */}

                            <div className={`grid gap-4 p-6 ${getGridClasses()}`} >


                                {plans.map(plan => (
                                    <>
                                        {plan.category === 'one_time' ? (

                                            <div className="p-6 space-y-6 flex flex-col relative">
                                                <div key={plan.id}>
                                                    <p className="text-gray-700 text-left">Want to buy more credits? Upgrade to <b>
                                                        ({plan.credits} Credits) , {plan.category}
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
                                                                <span className="font-bold" dangerouslySetInnerHTML={{ __html: plan.description }}>
                                                                    {/* {plan.description} */}
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
                                                            <p className="font-light text-sm"></p>
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
                                                <a className="w-[200px] plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4 absolute bottom-5" href={plan.checkoutUrl}>Add</a>

                                            </div>

                                        ) : null}
                                    </>
                                ))}



                            </div>

                        </div>

                    </div >
                ) : null
            }


        </>



    );
}

