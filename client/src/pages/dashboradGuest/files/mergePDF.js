import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Upload, FileUp } from 'lucide-react';

const PDFMerger = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const [merging, setMerging] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            file => file.type === 'application/pdf'
        );
        setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).filter(
            file => file.type === 'application/pdf'
        );
        console.log('Selected files:', selectedFiles);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            setError('Please select at least two PDF files.');
            return;
        }

        setMerging(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        files.forEach(file => formData.append('pdfs', file));

        try {
            const response = await axios.post('/api/merge-pdf', formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'merged.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            setFiles([]);
            setSuccess('PDFs successfully merged!');
        } catch (err) {
            console.error('Merge failed:', err);
            setError('An error occurred while merging PDFs. Please try again.');
        } finally {
            setMerging(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Merge PDFs - Combine multiple PDFs into one</title>
                <meta name="description" content="Our tool combines multiple PDFs into a single file." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Merge PDFs</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Combine multiple PDF files into one. Drag and drop or select files to start merging.
                        </p>

                        {files && files.length > 0 ? (
                            <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                                {error && <p className="text-red-500 mt-4">{error}</p>}
                                {success && <p className="text-green-500 mt-4">{success}</p>}
                                <button
                                    onClick={handleMerge}
                                    disabled={merging}
                                    className="bg-main-color hover:bg-blue-300 text-white font-bold py-3 px-6 rounded-lg cursor-pointer inline-flex items-center"
                                >
                                    {merging ? 'Merging...' : 'Merge PDFs'}
                                </button>
                            </div>
                        ) : (
                            <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    className="hidden"
                                    id="file-input"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="file-input"
                                    className="bg-gray-600 hover:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg cursor-pointer w-auto inline-flex items-center"
                                >
                                    <FileUp className="mr-2" size={20} />
                                    Select PDF files
                                </label>

                                <p className="mt-2 text-gray-500">or drag and drop PDFs here</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Easily Merge Your PDFs!</h3>
                        <p className="text-gray-600 mb-4">
                            Our free PDF merger tool allows you to combine multiple PDF files into a single document effortlessly. Simply upload your PDFs, and our tool will take care of the rest. Perfect for organizing reports, contracts, and more.
                        </p>
                        <p className="text-gray-600">
                            If you need any assistance or have questions, please <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We're always here to help!
                        </p>
                    </div>
                </div>

                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    main {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                    .footer-content {
                        width: 100%;
                        border-top: 1px solid #eaeaea;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: gray;
                    }
                    .footer-links {
                        text-decoration: none;
                        color: gray;
                    }
                    code {
                        background: #fafafa;
                        border-radius: 5px;
                        padding: 0.75rem;
                        font-size: 1.1rem;
                        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, Courier New, monospace;
                    }
                `}</style>
            </main>
        </>
    );
};

export default PDFMerger;
