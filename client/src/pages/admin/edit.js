import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


// //get Plans for Month subscription
// const getPlans = async () => {
//     try {
//         const response = await axios.get('/api/getAllProductss', {
//             withCredentials: true,
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Login failed:", error);
//         return false;
//     }
// };


// const plans = await getPlans().then((result) => {
//     return result;
// });

export default function Edit() {
    const [plans, setPlans] = useState([]);

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



    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPassword2, setRegisterPassword2] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const [oldUserInfo, setOldUserInfo] = useState('');
    const { id } = useParams();


    //fill in the inputs 
    useEffect(() => {
        axios.get(`/getUserByNumber/${id}`)
            .then(response => {
                setOldUserInfo(response.data);

                setRegisterUsername(response.data.username);
                setRegisterEmail(response.data.email);

            })
            .catch(error => {
                console.error('Error fetching item data:', error);
            });

    }, []);



    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const [SubscriptionChangeMessage, setSubscriptionChangeMessage] = useState("");


    const validateForm = () => {
        let isValid = true;

        if (!registerUsername.trim()) {
            setUsernameError("Username is required");
            isValid = false;
        } else {
            setUsernameError("");

        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
        if (!emailRegex.test(registerEmail)) {
            setEmailError("Invalid email address");
            isValid = false;

        } else {
            setEmailError("");
        }
        if (registerPassword) {
            if (registerPassword.length < 6) {
                setPasswordError("Password must be at least 6 characters");
                isValid = false;

            } else {
                setPasswordError("");
            }

            if (registerPassword !== registerPassword2) {
                setPassword2Error("Passwords do not match");
                isValid = false;

            } else {
                setPassword2Error("");
            }
        }

        return isValid;
    };

    const edit = async () => {
        if (validateForm()) {
            setLoading(true);
            axios({
                method: "post",
                data: {
                    username: registerUsername,
                    password: registerPassword,
                    email: registerEmail,
                    id: id
                },
                withCredentials: true,
                url: "/editUser"
            })
                .then(response => {
                    if (response.data.message === 'Username already exists') {
                        setErrorMessage('The Username already exists');
                        setLoading(false);
                    } else if (response.data.message === 'Email already exists') {
                        setErrorMessage('The email already exists');
                        setLoading(false);
                    } else {
                        window.location.href = '/admin/index';
                        setLoading(false);
                    }
                    console.log("edit successful!", response.data.message);
                    // window.location.href = '/admin/index';
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoading(false);
                });
        }
    }

    // const cancelSubscription = (userId) => {
    //     axios.delete('/api/cancelSubscription', {
    //         data: { userId },
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => {
    //             if (response.data) {
    //                 setSubscriptionChangeMessage('Subscription canceled');
    //                 window.location.reload();
    //             } else {
    //                 setSubscriptionChangeMessage('This user not subscribed');
    //             }

    //         })
    //         .catch((error) => {
    //             setSubscriptionChangeMessage('This user not subscribed');
    //             //console.error('Error deleting item', error);
    //         });
    // };

    // const resumingSubscription = (userId) => {
    //     axios({
    //         method: "post",
    //         data: {
    //             userId,
    //         },
    //         withCredentials: true,
    //         url: "/api/resumingSubscription"
    //     })
    //         .then(response => {
    //             setSubscriptionChangeMessage('Subscription resumed');
    //             window.location.reload();
    //         })
    //         .catch(error => {
    //             setSubscriptionChangeMessage('This user not subscribed');
    //         });
    // }


    // const variantIdPro = 'price_1Onm8SG7wv77vtTG3feWL5yz'; //'101465'
    // const variantIdUnlimited = 'price_1OnmB8G7wv77vtTGeNefIme2'; //'99012'


    const [cancelLoading, setCancelLoading] = useState(false);

    const cancelSubscription = (userId) => {
        setCancelLoading(true);
        axios.delete('/api/cancelSubscription', {
            data: { userId },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setCancelLoading(false);
                //if (response) {
                if (response.data) {
                    setSubscriptionChangeMessage('Subscription canceled');
                    window.location.reload();
                } else {
                    setSubscriptionChangeMessage('This user not subscribed');
                }

            })
            .catch((error) => {
                setCancelLoading(false);
                setSubscriptionChangeMessage('This user not subscribed');
                //console.error('Error deleting item', error);
            });
    };

    const [resumeLoading, setResumeLoading] = useState(false);
    const resumingSubscription = (userId) => {
        setResumeLoading(true);
        axios({
            method: "post",
            data: {
                userId,
            },
            withCredentials: true,
            url: "/api/resumingSubscription"
        }).then(response => {
            setResumeLoading(false);
            setSubscriptionChangeMessage('Subscription resumed');
            window.location.reload();
        })
            .catch(error => {
                setResumeLoading(false);
                setSubscriptionChangeMessage('This user not subscribed');
            });
    }



    // const changeUserPlanTo100 = (userId) => {
    //     axios({
    //         method: "post",
    //         data: {
    //             userId,
    //             variantId: variantIdPro
    //         },
    //         withCredentials: true,
    //         url: "/api/changePlan"
    //     })
    //         .then(response => {
    //             //console.log('Item', response.data);
    //             setSubscriptionChangeMessage('User Plan changed to Standard');
    //             window.location.reload();
    //         })
    //         .catch(error => {
    //             setSubscriptionChangeMessage('This user not subscribed', error);
    //         });
    // }



    // const changeUserPlanToUnlimited = (userId) => {
    //     axios({
    //         method: "post",
    //         data: {
    //             userId,
    //             variantId: variantIdUnlimited
    //         },
    //         withCredentials: true,
    //         url: "/api/changePlan"
    //     })
    //         .then(response => {
    //             //console.log('Item', response.data);
    //             setSubscriptionChangeMessage('User Plan changed to Premium');
    //             window.location.reload();
    //         })
    //         .catch(error => {
    //             setSubscriptionChangeMessage('This user not subscribed', error);
    //         });
    // }

    const [changePlanLoading, setChangePlanLoading] = useState(false);
    const changeUserPlan = (userId, variantId) => {
        setChangePlanLoading(true);
        axios({
            method: "post",
            data: {
                userId,
                variantId: variantId
            },
            withCredentials: true,
            url: "/api/changePlan"
        })
            .then(response => {
                setChangePlanLoading(false);
                //console.log('Item', response.data);
                setSubscriptionChangeMessage('User Plan changed');
                window.location.reload();
            })
            .catch(error => {
                setChangePlanLoading(false);
                setSubscriptionChangeMessage('This user not subscribed', error);
            });
    }

    const [openChnagePlanModal, setOpenChnagePlanModel] = useState(false);

    const PlansMonth = plans.filter(plan => plan.category === "subscription");

    const getGridClassesMonthlyPlans = () => {
        if (PlansMonth.length === 1) {
            return 'justify-center';
        } else {
            return 'justify-center sm:grid-cols-1 md:grid-cols-2';
        }
    };


    return (

        <body className=" flex justify-center h-screen mt-11">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-125" >
                <div>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900"> Edit {oldUserInfo.username}</h1>
                </div>
                {ErrorMessage && (
                    <p className="text-red-500 text-sm mt-2">{ErrorMessage}</p>
                )}

                {SubscriptionChangeMessage && (
                    <p className="text-green-500 text-sm mt-2">{SubscriptionChangeMessage}</p>
                )}


                <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">

                    <div className="items-center mt-4 grid grid-cols-1 gap-2">
                        {oldUserInfo.canceled === 0 && oldUserInfo.variantId ? (
                            <div className="items-center">

                                {!cancelLoading ? (

                                    < a className="w-full inline-flex items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-red-900 focus:shadow-outline focus:outline-none bg-red-500 rounded cursor-pointer " id="upgradeButton" onClick={() => cancelSubscription(oldUserInfo.id)}>Cancel Subscription</a>

                                ) : (
                                    <a type=""
                                        className="w-full inline-flex items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-red-900 focus:shadow-outline focus:outline-none bg-red-500 rounded cursor-pointer " id="upgradeButton">
                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </a>
                                )}


                            </div>




                        ) : oldUserInfo.canceled === 1 && oldUserInfo.variantId ? (
                            <div className="items-center">

                                {!resumeLoading ? (
                                    < a className="w-full inline-flex items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-900 focus:shadow-outline focus:outline-none bg-blue-500 rounded cursor-pointer " id="upgradeButton" onClick={() => resumingSubscription(oldUserInfo.id)}>Resume Subscription</a>

                                ) : (
                                    <a type=""
                                        className="w-full inline-flex items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-900 focus:shadow-outline focus:outline-none bg-blue-500 rounded cursor-pointer">
                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </a>
                                )}
                            </div>



                        ) : null}


                    </div>
                    <div className="items-center grid grid-cols-1 gap-2">


                        {oldUserInfo.variantId ? (
                            <div className="items-center">
                                < a className="w-full inline-flex items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-green-900 focus:shadow-outline focus:outline-none bg-green-500 rounded cursor-pointer " id="upgradeButton" onClick={() => setOpenChnagePlanModel(true)}>Change User Plan</a>
                            </div>
                        ) : null}


                        {/* {oldUserInfo.variantId == variantIdUnlimited && oldUserInfo.variantId ? (
                            <div className="items-center">
                                < a className="w-full inline-flex items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-green-900 focus:shadow-outline focus:outline-none bg-green-500 rounded cursor-pointer " id="upgradeButton" onClick={() => changeUserPlanTo100(oldUserInfo.id)}>Change User Plan To Standard</a>
                            </div>
                        ) : oldUserInfo.variantId == variantIdPro && oldUserInfo.variantId ? (<div className="items-center">
                            < a className="w-full inline-flex items-center justify-center h-10 px-6 text-xs md:text-md md:font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-green-900 focus:shadow-outline focus:outline-none bg-green-500 rounded cursor-pointer " id="upgradeButton" onClick={() => changeUserPlanToUnlimited(oldUserInfo.id)}>Change User Plan To Premium</a>
                        </div>) : null} */}

                    </div>

                    <div>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={registerUsername}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username"
                            onChange={e => setRegisterUsername(e.target.value)}
                        />
                        <p className="text-red-500 text-xs">{usernameError}</p>
                    </div>

                    <div className="items-center mt-4">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={registerEmail}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email"
                            onChange={e => setRegisterEmail(e.target.value)}
                        />
                        <p className="text-red-500 text-xs">{emailError}</p>
                    </div>


                    <div className="items-center mt-4">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            onChange={e => setRegisterPassword(e.target.value)}
                        />
                        <p className="text-red-500 text-xs">{passwordError}</p>
                    </div>
                    <div className="items-center mt-4">
                        <input
                            id="password2"
                            name="password2"
                            type="password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Confirm the password"
                            onChange={e => setRegisterPassword2(e.target.value)}
                        />
                        <p className="text-red-500 text-xs">{password2Error}</p>
                    </div>

                </div>

                <div className="items-center mt-4">


                    {loading ? (
                        <button
                            type=""
                            disabled={loading}
                            className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                        >
                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type=""
                            disabled={loading}
                            onClick={edit}
                            className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                        >
                            Edit
                        </button>
                    )}





                    {openChnagePlanModal ? (
                        <div id="showLimiteMessage" className="modal fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-80 items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
                            <div className="md:w-2/3 mx-auto inline-block  align-center rounded-lg overflow-hidden shadow-xl  transform transition-all sm:my-8 sm:align-middle bg-white">
                                <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900"> Monthly Plans </h3>

                                    <button onClick={() => setOpenChnagePlanModel(false)} id="closeModelButton" type="button" className=" text-gray-900 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 ">
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

                                    <>
                                        {ErrorMessage && (
                                            <p className="text-red-500 text-sm mt-2">{ErrorMessage}</p>
                                        )}

                                        {SubscriptionChangeMessage && (
                                            <p className="text-green-500 text-sm mt-2">{SubscriptionChangeMessage}</p>
                                        )}

                                        <div className={`grid gap-4 p-6 ${getGridClassesMonthlyPlans()}`} >
                                            {plans.map(plan => (
                                                <>
                                                    {plan.category === 'subscription' ? (
                                                        <div className={`p-6 space-y-6 flex flex-col relative ${plan.variantId === oldUserInfo.variantId ? 'border border-green-500' : ''}`}>

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


                                                            {plan.variantId !== oldUserInfo.variantId && (

                                                                <>
                                                                    {!changePlanLoading ? (
                                                                        <button className="w-[200px] plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4 absolute bottom-5" onClick={(e) => { changeUserPlan(oldUserInfo.id, plan.variantId) }}> Change To This Plan</button>

                                                                    ) : (
                                                                        <button className="w-[200px] plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4 absolute bottom-5">
                                                                            <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                            </svg>
                                                                        </button>
                                                                    )}

                                                                </>

                                                            )}

                                                        </div >

                                                    ) : null}

                                                </>

                                            ))}



                                        </div>
                                    </>
                                )}


                            </div>

                        </div>
                    ) : null
                    }



                </div>


            </div>
            <style>{`

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
       
      `}</style>
        </body >
    );
}
