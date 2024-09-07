import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Login() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sendLinkloading, setSendLinkloading] = useState(false);

    const [showEmailVerificationModel, setShowEmailVerificationModel] = useState(null);
    const [emailToverify, setEmailToverify] = useState('');
    const [successSendingLink, setSuccessSendingLink] = useState(false);
    const [errorSendingLink, setErrorSendingLink] = useState(false);


    const validateEmailForm = () => {
        let isValid = true;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
        if (!emailRegex.test(emailToverify)) {
            setErrorSendingLink("Invalid email address");
            isValid = false;

        } else {
            setErrorSendingLink("");
        }
        return isValid;
    }

    const handleSubmitsEmailToverify = () => {
        if (validateEmailForm()) {
            setSuccessSendingLink('');
            setErrorSendingLink('');
            setSendLinkloading(true);
            axios({
                method: "post",
                data: {
                    email: emailToverify,
                },
                withCredentials: true,
                url: "/send-verification-link"
            })
                .then(response => {
                    setSendLinkloading(false);
                    if (response.data.message == true) {
                        setSuccessSendingLink("Please check your email.");
                    } else {
                        setErrorSendingLink("Email not available for verification.");
                    }
                })
                .catch((error) => {
                    setSendLinkloading(false);
                    setErrorSendingLink('Error: ' + error.message);
                })
                .finally(() => {
                    setEmailToverify('');
                });
        }
    };



    const validateForm = () => {
        let isValid = true;

        if (!loginUsername.trim()) {
            setUsernameError('Username is required');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (!loginPassword.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    //const navigate = useNavigate();

    const handleLogin = () => {
        if (validateForm()) {
            setLoading(true);
            axios({
                method: 'post',
                data: {
                    username: loginUsername,
                    password: loginPassword,
                },
                withCredentials: true,
                url: '/login',
            })
                .then((response) => {
                    //navigate('/dashboard');
                    localStorage.setItem('authenticated', 'true');
                    console.log('Login successful!', response.data);
                    setLoading(false);
                    window.location.href = '/dashboard';

                })
                .catch((error) => {
                    setLoginError('Login failed. Please check your username and password, or verify your email address.');
                    setLoading(false);
                    console.error('Login failed:', error);
                });

        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
                <meta name="description" content="Login to your account on Repixer." />
            </Helmet>


            <body className=" flex justify-center h-screen mt-11">
                <div>
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-auto" >
                        <div>
                            <h1 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Login</h1>
                        </div>

                        <div className="mt-4 rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">
                            {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
                            <div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                />
                                <p className="text-red-500 text-xs">{usernameError}</p>
                            </div>
                            <div className="gap-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                                <p className="text-red-500 text-xs">{passwordError}</p>
                            </div>
                        </div>
                        <div>

                            {loading ? (
                                <button type=""
                                    className="mt-4 w-full items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded">
                                    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </button>
                            ) : (
                                <button type=""
                                    onClick={handleLogin} className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded">
                                    Login
                                </button>
                            )}


                        </div>


                        <a
                            href="/forget-password"
                            className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
                        >
                            Forgot Password?
                        </a>

                        <a
                            onClick={() => { setShowEmailVerificationModel(true) }}
                            className="text-blue-500 hover:text-blue-700 text-sm float-right cursor-pointer"
                        >
                            Verify your email
                        </a>

                    </div>
                </div>


                {showEmailVerificationModel ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-96">

                            <div className="flex justify-end">
                                <button
                                    onClick={() => { setShowEmailVerificationModel(false) }}
                                    className="text-gray-400 hover:text-gray-500"
                                    aria-label="Close"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
                            {errorSendingLink && <p className="text-red-500 text-sm mt-2">{errorSendingLink}</p>}
                            {successSendingLink && <p className="text-green-500 text-sm mt-2">{successSendingLink}</p>}
                            <div className="mb-4">

                                <input
                                    type="email"
                                    id="emailToverify"
                                    name="emailToverify"
                                    value={emailToverify}
                                    onChange={(e) => setEmailToverify(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>




                            {sendLinkloading ? (
                                <button type=""
                                    className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded">
                                    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </button>
                            ) : (
                                <button type=""
                                    onClick={handleSubmitsEmailToverify}
                                    className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded">
                                    Verify Email
                                </button>
                            )}



                        </div>
                    </div>
                ) : null
                }



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
            </body>
        </>



    );
}
