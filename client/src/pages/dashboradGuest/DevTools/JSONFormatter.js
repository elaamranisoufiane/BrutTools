import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const JSONFormatter = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [formattedJSON, setFormattedJSON] = useState('');

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setFormattedJSON(JSON.stringify(parsed, null, 2));
        } catch (error) {
            setFormattedJSON('Invalid JSON');
        }
    };

    return (
        <>
            <Helmet>
                <title>Free JSON Formatter - Format and Validate Your JSON Data</title>
                <meta name="description" content="Easily format and validate your JSON data with our free JSON formatter tool." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">JSON Formatter</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Format and validate your JSON data easily with our tool. Ensure your JSON is properly formatted and error-free.
                        </p>

                        <div className="flex flex-col space-y-4">
                            <textarea
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                placeholder="Enter JSON here"
                                className="w-full p-2 mb-2 border rounded-md h-40"
                            />
                            <button
                                onClick={handleFormat}
                                className="w-full bg-main-color hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Format JSON
                            </button>

                            {formattedJSON && (
                                <pre className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto">
                                    {formattedJSON}
                                </pre>
                            )}
                        </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Efficient JSON Formatting!</h3>
                        <p className="text-gray-600 mb-4">
                            Our JSON formatter tool is designed to help you quickly format and validate your JSON data. Whether you're a developer or just need to clean up your JSON, our tool provides a straightforward solution.
                        </p>
                        <p className="text-gray-600">
                            For any questions or support, feel free to <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We're here to assist you!
                        </p>
                    </div>
                </div>
            </main>
        </>

    );
};

export default JSONFormatter;