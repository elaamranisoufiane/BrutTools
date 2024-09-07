import React from 'react';

function VerificationFailedPage() {
    return (

        <body className=" flex justify-center h-screen mt-11">
            <div className="bg-white p-8 rounded-lg shadow-lg w-auto h-60" >
                <div>
                    <h1 className="mt-2 mb-3 text-center text-3xl font-extrabold text-gray-900">Verification Failed</h1>
                </div>

                <p className="text-red-600 mb-4">Invalid token. Please check the verification link and try again.</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => window.location.href = '/'}
                >
                    Go to Homepage
                </button>
            </div>
        </body>


    );
}

export default VerificationFailedPage;
