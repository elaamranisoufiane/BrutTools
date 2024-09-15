import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
//npm i react-markdown
import { Helmet } from 'react-helmet';


const MarkdownPreview = () => {
    const [markdown, setMarkdown] = useState('# Hello, Markdown!');

    return (
        <>
            <Helmet>
                <title>Markdown Previewer - Real-time Markdown Rendering</title>
                <meta name="description" content="Convert your Markdown text into a formatted preview in real-time. See your Markdown changes instantly with our preview tool." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Markdown Preview</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Write and preview your Markdown text in real-time. See how your Markdown formatting will appear as you type.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-gray-800">Input</h2>
                                <textarea
                                    value={markdown}
                                    onChange={(e) => setMarkdown(e.target.value)}
                                    placeholder="Enter your Markdown text here"
                                    className="w-full h-64 p-2 border rounded border-gray-300"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-gray-800">Preview</h2>
                                <div className="border rounded p-4 bg-gray-100 prose">
                                    <ReactMarkdown>{markdown}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Transform Your Markdown Instantly!</h3>
                        <p className="text-gray-600 mb-4">
                            Use our Markdown preview tool to instantly render your Markdown text as formatted content. Experiment with different Markdown syntax and see the results in real-time.
                        </p>
                        <p className="text-gray-600">
                            For any questions or support, please <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We’re here to assist you!
                        </p>
                    </div>
                </div>
            </main>
        </>

    );
};

export default MarkdownPreview;