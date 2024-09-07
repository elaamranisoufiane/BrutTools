import React from 'react';
import { Helmet } from 'react-helmet';

const NotFoundPage = () => {
    return (

        
    <>

        <Helmet>
        <title>Page Not Found - 404 Error</title>
        <meta name="description" content="Page Not Found." />
        </Helmet>

        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-xl text-gray-600">Oops! Page not found.</p>
            <a className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600" href="/">Go Home</a>
        </div>
    </>

    );
};

export default NotFoundPage;