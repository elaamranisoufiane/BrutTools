import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

const ForgotPasswordForm = () => {

    const { token, userId } = useParams();

    const [registerPassword, setRegisterPassword] = useState('');

    const [registerPassword2, setRegisterPassword2] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    //input validation  
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

        if (registerPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            isValid = false;

        } else {
            setPasswordError("");
        }

        if (registerPassword !== registerPassword2) {
            setPassword2Error("Passwords do not match.");
            isValid = false;

        } else {
            setPassword2Error("");
        }

        return isValid;
    };


    const resetPassword = () => {
        if (validateForm()) {
            setLoading(true);
            axios({
                method: "post",
                data: {
                    password: registerPassword,
                    token: token,
                    userId: userId
                },
                withCredentials: true,
                url: "/submit-reset-password"
            })
                .then(response => {
                    setSuccessMessage('Password reset successful! Please log in')
                    setLoading(false);
                    setTimeout(() => {
                        navigate('/login');
                    }, 5000);

                })
                .catch(error => {
                    console.error("Reset password failed:", error);
                    setLoading(false);
                });
        }
    }



    return (


        <div className="flex justify-center h-screen mt-11">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-80" >
                <div>
                    <h1 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Reset Password</h1>
                </div>
                {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
                <div className="mt-4 rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">
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
                            onClick={resetPassword} className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded">
                            Reset Password
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
        </div>
    );
};

export default ForgotPasswordForm;
