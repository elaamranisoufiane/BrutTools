import React from 'react';

function EmailVerifiedPage() {
    return (

        <body className=" flex justify-center h-screen mt-11">
            <div className="bg-white p-8 rounded-lg shadow-lg w-auto h-60" >
                <div>
                    <h1 className="mt-2 mb-3 text-center text-3xl font-extrabold text-gray-900">Email Verified Successfully</h1>
                </div>


                <p className="text-gray-700 mb-4">Your email address has been successfully verified.</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => window.location.href = '/login'} // Redirect to homepage
                >
                    Go to Login page
                </button>
            </div>
        </body>
    );
}

export default EmailVerifiedPage;
