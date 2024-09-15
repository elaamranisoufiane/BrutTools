import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const URLShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleShorten = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/shorten-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ longUrl }),
            });

            if (!response.ok) throw new Error('Failed to shorten URL');

            const data = await response.json();
            setShortUrl(data.shortUrl);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    const handleCopyColor = () => {
        navigator.clipboard.writeText(shortUrl)
            .then()
            .catch(err => alert('Failed to copy color code.'));
    };

    return (
        <>
            <Helmet>
                <title>URL Shortener - Simplify Your Links</title>
                <meta name="description" content="Shorten long URLs into concise links with our URL shortener tool. Easily manage and share your shortened URLs." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">URL Shortener</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Simplify your long URLs into short, manageable links. Enter a long URL to get a shorter, shareable version in just a few clicks.

                            <br /><span className='text-red-700'>For free plan your Url will be displaied ones the user checkit for the first time, if you want to keep it permanantly please, create an account and login into iur platrform.
                            </span>
                        </p>
                        <div className="space-y-4">
                            <input
                                type="url"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                placeholder="Enter long URL here"
                                className="w-full p-2 border rounded border-gray-300"
                            />
                            <button
                                onClick={handleShorten}
                                disabled={isLoading || !longUrl}
                                className="w-full bg-main-color hover:bg-blue-300 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                            >
                                {isLoading ? 'Shortening...' : 'Shorten URL'}
                            </button>
                            {shortUrl && (
                                <div className="mt-4 p-4 bg-gray-100 rounded">
                                    <h2 className="font-bold mb-2 text-gray-800">Shortened URL:</h2>
                                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        {shortUrl}
                                    </a>
                                    <button
                                        onClick={handleCopyColor}
                                        className="mt-4 font-bold py-2 px-4 rounded flex items-center justify-center"
                                    >
                                        <svg width="40px" height="40px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M589.3 260.9v30H371.4v-30H268.9v513h117.2v-304l109.7-99.1h202.1V260.9z" fill="#E1F0FF"></path><path d="M516.1 371.1l-122.9 99.8v346.8h370.4V371.1z" fill="#E1F0FF"></path><path d="M752.7 370.8h21.8v435.8h-21.8z" fill="#446EB1"></path><path d="M495.8 370.8h277.3v21.8H495.8z" fill="#446EB1"></path><path d="M495.8 370.8h21.8v124.3h-21.8z" fill="#446EB1"></path><path d="M397.7 488.7l-15.4-15.4 113.5-102.5 15.4 15.4z" fill="#446EB1"></path><path d="M382.3 473.3h135.3v21.8H382.3z" fill="#446EB1"></path><path d="M382.3 479.7h21.8v348.6h-21.8zM404.1 806.6h370.4v21.8H404.1z" fill="#446EB1"></path><path d="M447.7 545.1h261.5v21.8H447.7zM447.7 610.5h261.5v21.8H447.7zM447.7 675.8h261.5v21.8H447.7z" fill="#6D9EE8"></path><path d="M251.6 763h130.7v21.8H251.6z" fill="#446EB1"></path><path d="M251.6 240.1h21.8v544.7h-21.8zM687.3 240.1h21.8v130.7h-21.8zM273.4 240.1h108.9v21.8H273.4z" fill="#446EB1"></path><path d="M578.4 240.1h130.7v21.8H578.4zM360.5 196.5h21.8v108.9h-21.8zM382.3 283.7h196.1v21.8H382.3zM534.8 196.5h65.4v21.8h-65.4z" fill="#446EB1"></path><path d="M360.5 196.5h65.4v21.8h-65.4zM404.1 174.7h152.5v21.8H404.1zM578.4 196.5h21.8v108.9h-21.8z" fill="#446EB1"></path></g></svg>
                                    </button>
                                </div>
                            )}
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Transform Long URLs into Short Links Instantly!</h3>
                        <p className="text-gray-600 mb-4">
                            Our URL shortener tool allows you to easily convert lengthy URLs into short, user-friendly links. Perfect for sharing on social media or through email.
                        </p>
                        <p className="text-gray-600">
                            For any support or inquiries, feel free to <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We're here to help you streamline your URLs!
                        </p>
                    </div>
                </div>
            </main>
        </>

    );
};

export default URLShortener;