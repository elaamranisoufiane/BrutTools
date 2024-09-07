import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const ForgotPasswordForm = () => {
    const [plans, setPlans] = useState([]);
    // const [plansPayment, setPlansPayment] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    useEffect(() => {
        const getPlans = async () => {
            try {
                const response = await axios.get('/api/getAllProductssGuest', {
                    withCredentials: true,
                });
                setPlans(response.data);
            } catch (error) {
                console.error("Fetching plans failed:", error);
            }
        };

        // const getPlansPayment = async () => {
        //     try {
        //         const response = await axios.get('/api/getAllProductsspaymentGuest', {
        //             withCredentials: true,
        //         });
        //         setPlansPayment(response.data);
        //     } catch (error) {
        //         console.error("Fetching payment plans failed:", error);
        //     }
        // };

        getPlans();
        // getPlansPayment();
    }, []); // Empty dependency array ensures useEffect runs only once after the component mounts

    return (

        <>

            <Helmet>
                <title>Pricing</title>
                <meta name="description" content="Pricing Plans - We have plans for everyone. Find the most suitable pricing plan for your needs." />
            </Helmet>

            {/* <main className={plans.length > 0 ? "max-w-3/4 h-full flex   flex-col items-center min-h-screen" : ""}> */}
            <main className={" flex-col items-center min-h-screen"}>
                <div className="flex justify-center min-h-screen mt-11">
                    <div className="bg-white p-2 rounded-lg shadow-lg w-5/6 h-auto" >
                        <div>
                            <h1 className="mt-2 text-center text-3xl font-extrabold text-gray-900">OUR Prices</h1>
                        </div>
                        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600"></div>
                        <h3 className="text-xl font-semibold text-gray-900 text-center pt-6"> Monthly Plans </h3>



                        <div className="justify-center  sm:grid sm:grid-cols-1 lg:flex pt-8 pb-8">
                            {/* {plans.map(plan => (<>
                                {
                                    plan.category === 'subscription' ? (
                                        <div key={plan.id} className="pricing-card flex flex-col border border-gray-300 rounded-lg p-6 text-center hover:shadow-md w-full mb-12 lg:w-1/4 lg:mb-0 lg:ml-2">

                                            <h2 className="plan-name text-xl text-black font-semibold mb-4">{plan.name}</h2>
                                            <ul className="plan-features">
                                                <li>  {plan.description} </li>
                                            </ul>
                                            <p className="plan-price text-lg text-primary-500 mt-4">
                                                ${plan.price}<span className="plan-price-per-month text-sm text-gray-600">/mo</span>
                                            </p>
                                            <a
                                                className="plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4"
                                                href="/register"
                                            >
                                                Get Started
                                            </a>
                                            <p className="plan-note text-sm text-gray-600 mt-4">
                                                You can cancel your subscription anytime.
                                            </p>


                                        </div>
                                    ) : null}
                            </>
                            ))} */}
                            <div className='w-4/6'>
                                comming soon ....
                            </div>

                        </div>



                        {/* <div className="justify-center w-auto sm:grid sm:grid-cols-1 md:grid-cols-2 gap-4 p-6">
                        {plans.map(plan => (
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
                                <a className="w-[200px] plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4 absolute bottom-5" href="/register">Subscribe</a>

                            </div>
                        ))}



                    </div> */}


                        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600"></div>
                        <h3 className="text-xl font-semibold text-gray-900 text-center pt-6"> Add-on Plans  </h3>


                        <div className="justify-center sm:grid sm:grid-cols-1 lg:flex pt-8 pb-8">
                            {/* {plans.map(plan => (
                                <>
                                    {plan.category === 'one_time' ? (
                                        <div key={plan.id} className="pricing-card flex flex-col border border-gray-300 rounded-lg p-6 text-center hover:shadow-md w-full mb-12 lg:w-1/4 lg:mb-0 lg:ml-2">
                                            <h2 className="plan-name text-xl text-black font-semibold mb-4">{plan.name}</h2>
                                            <ul className="plan-features">
                                                <li>  {plan.description} </li>
                                            </ul>
                                            <p className="plan-price text-lg text-primary-500 mt-4">
                                                ${plan.price}<span className="plan-price-per-month text-sm text-gray-600">/mo</span>
                                            </p>
                                            <a
                                                className="plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4"
                                                href="/register"
                                            >
                                                Get Started
                                            </a>
                                            <p className="plan-note text-sm text-gray-600 mt-4">
                                                You can cancel your subscription anytime.
                                            </p>
                                        </div>
                                    ) : null}
                                </>
                            ))} */}

                            <div className='w-4/6'>
                                comming soon ....
                            </div>


                        </div>




                        {/* <div className="justify-center w-auto sm:grid sm:grid-cols-1 md:grid-cols-3 gap-4 p-6">
                        {plansPayment.map(plan => (
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
                                <a className="w-[200px] plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4 absolute bottom-5" href="/register">Subscribe</a>

                            </div>
                        ))}



                    </div> */}








                        <hr></hr>
                        <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full md:px-24 lg:px-8 lg:py-14">
                            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                                <div className="max-w-xl mb-10 text-center md:mx-auto md:mb-12 lg:max-w-2xl">
                                    <h2 className="max-w-lg mb-6 font-sans font-bold leading-none tracking-tight text-slate-900 text-2xl md:mx-auto lg:text-3xl">Pricing Plan FAQs</h2>
                                </div>
                                <div>
                                    <div className={`border-b ${open1 ? 'open' : ''}`}>
                                        <div className="flex text-lg font-medium py-4 flex-row text-left px-4 w-full items-center justify-between hover:bg-slate-100" onClick={() => setOpen1(!open1)}>
                                            What's included in the plans?
                                        </div>
                                        {open1 && (
                                            <div className="px-4 mb-4 mt-2">
                                                In each plan, you will receive credits based on the plan you choose, which you can use to generate images.   </div>
                                        )}
                                    </div>

                                    <div className={`border-b ${open2 ? 'open' : ''}`}>
                                        <div className="flex text-lg font-medium py-4 flex-row text-left px-4 w-full items-center justify-between hover:bg-slate-100" onClick={() => setOpen2(!open2)}>
                                            How can i get more credits?
                                        </div>
                                        {open2 && (
                                            <div className="px-4 mb-4 mt-2">
                                                You can purchase more credits from your profile settings..  </div>
                                        )}
                                    </div>


                                    <div className={`border-b ${open3 ? 'open' : ''}`}>
                                        <div className="flex text-lg font-medium py-4 flex-row text-left px-4 w-full items-center justify-between hover:bg-slate-100" onClick={() => setOpen3(!open3)}>
                                            How can I upgrade my plan?
                                        </div>
                                        {open3 && (
                                            <div className="px-4 mb-4 mt-2">
                                                You can upgrade your plan by visiting the billing section of your account settings.
                                            </div>
                                        )}
                                    </div>

                                    <div className={`border-b ${open4 ? 'open' : ''}`}>
                                        <div className="flex text-lg font-medium py-4 flex-row text-left px-4 w-full items-center justify-between hover:bg-slate-100" onClick={() => setOpen4(!open4)}>
                                            Can I cancel my subscription at any time?
                                        </div>
                                        {open4 && (
                                            <div className="px-4 mb-4 mt-2">
                                                Yes, you can cancel your subscription at any time.
                                            </div>
                                        )}
                                    </div>

                                    <div className={`border-b ${open5 ? 'open' : ''}`}>
                                        <div className="flex text-lg font-medium py-4 flex-row text-left px-4 w-full items-center justify-between hover:bg-slate-100" onClick={() => setOpen5(!open5)}>
                                            How can I contact customer support?
                                        </div>
                                        {open5 && (
                                            <div className="px-4 mb-4 mt-2">
                                                You can contact our customer support team by emailing us.
                                            </div>
                                        )}
                                    </div>


                                </div>
                            </div>
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
                </div>











                {/* <div className="justify-center sm:grid sm:grid-cols-1 lg:flex">
                <div className="pricing-card flex flex-col border border-gray-300 rounded-lg p-6 text-center hover:shadow-md w-full   mb-12 lg:w-1/4 lg:mb-0 lg:ml-2">
                    <h2 className="plan-name text-xl text-black font-semibold mb-4">Pro</h2>
                    <ul className="plan-features">
                        <li>100 images</li>
                        <li>24/6 Support</li>
                        <li>No Watermark</li>
                        <li>$0.19/image only</li>
                    </ul>
                    <p className="plan-price text-lg text-primary-500 mt-4">
                        $19<span className="plan-price-per-month text-sm text-gray-600">/mo</span>
                    </p>
                    <a
                        className="plan-btn bg-primary-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4"
                        href="/register"
                    >
                        Get Started
                    </a>
                    <p className="plan-note text-sm text-gray-600 mt-4">
                        You can cancel your subscription anytime.
                    </p>
                </div>


            </div> */}



            </main >
        </>
    );
};

export default ForgotPasswordForm;
