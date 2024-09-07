import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from 'react-helmet';

export default function Register() {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPassword2, setRegisterPassword2] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerCoupon, setRegisterCoupon] = useState('');
    const [agreeCheckBox, setAgreeCheckBox] = useState('');
    const [loading, setLoading] = useState(false);

    //input validation 
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const [SuccessMessage, setSuccessMessage] = useState("");
    const [agreeCheckBoxError, setAgreeCheckBoxError] = useState(false);

    const [recaptchaToken, setRecaptchaToken] = useState(null);
    // const CAPTCHA_KEY = "6LeOHQYqAAAAAKV76dEPqhPuON6aRuf93f-ZG5sj";
    const CAPTCHA_KEY = "6Ldu7zgqAAAAAKYckqfs9wXxuLZ5wX8l8Ey_vWFD";



    const navigate = useNavigate();


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

        if (!agreeCheckBox) {
            setAgreeCheckBoxError("Please agree to the terms and conditions.");
            isValid = false;

        } else {
            setAgreeCheckBoxError("");
        }

        return isValid;
    };
    const handleRecaptchaVerify = (token) => {
        console.log(token);
        setRecaptchaToken(token);
    };

    const register = () => {

        if (validateForm()) {
            setLoading(true);
            axios({
                method: "post",
                data: {
                    username: registerUsername,
                    password: registerPassword,
                    email: registerEmail,
                    coupon: registerCoupon,
                    recaptchaToken,
                },
                withCredentials: true,
                url: "/register"
            })
                .then(response => {
                    //console.log("Registration successful!", response.data.message);
                    //console.log("Captcha : ", response.data.message);

                    if (response.data.message === 'Username already exists') {
                        setErrorMessage('The Username already exists');
                        setLoading(false);
                    } else if (response.data.message === 'Email already exists') {
                        setErrorMessage('The email already exists');
                        setLoading(false);
                    } else if (response.data.message === 'reCAPTCHA verification failed') {
                        setErrorMessage('reCAPTCHA verification failed');
                        setLoading(false);
                    }
                    else {
                        // window.location.href = '/login';
                        setErrorMessage('');
                        setSuccessMessage('Registration successful! Please Verify your email and log in.')
                        setLoading(false);
                        setTimeout(() => {
                            navigate('/login');
                        }, 5000);

                    }

                })
                .catch(error => {
                    console.error("Registration failed:", error);
                    setLoading(false);
                });
        }
    }

    return (

        <>

            <Helmet>
                <title>Register</title>
                <meta name="description" content="Register on Repixer to get better fetures." />
            </Helmet>


            <body className=" flex justify-center h-screen mt-11">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-150" >
                    <div>
                        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h1>
                    </div>
                    {ErrorMessage && (
                        <p className="text-red-500 text-sm mt-2">{ErrorMessage}</p>
                    )}
                    {SuccessMessage && (
                        <p className="text-green-500 text-sm mt-2">{SuccessMessage}</p>
                    )}


                    <div className="mt-4 rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
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
                        <div className="items-center mt-4">
                            <input
                                id="coupon"
                                name="coupon"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="coupon"
                                onChange={e => setRegisterCoupon(e.target.value)}
                            />
                        </div>
                        <div className="items-center mt-4">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value={agreeCheckBox}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
                                // onChange={e => setAgreeCheckBox(e.value)}
                                onChange={() => setAgreeCheckBox(!agreeCheckBox)}
                            />
                            <label for="link-checkbox" className="ml-2 text-sm font-medium text-gray-900">I agree with the <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>.</label>
                            <p className="text-red-500 text-xs">{agreeCheckBoxError}</p>

                        </div>

                    </div>
                    <div className="items-center mt-4">
                        <ReCAPTCHA sitekey={CAPTCHA_KEY}
                            onChange={handleRecaptchaVerify}
                        />
                    </div>

                    <div className="items-center mt-4">


                        {loading ? (
                            <button
                                type=""
                                disabled={loading}
                                className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                            //disabled={!agreeCheckBox}
                            >
                                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                type=""
                                disabled={loading || !recaptchaToken || !agreeCheckBox}
                                onClick={register}
                                className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                            //disabled={!agreeCheckBox}
                            >
                                Register
                            </button>
                        )}




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
            </body>
        </>
    );
}
