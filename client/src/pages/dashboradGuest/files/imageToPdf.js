import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Upload, FileUp } from 'lucide-react';

const JPGtoPDFConverter = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const [converting, setConverting] = useState(false);
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
            file => file.type === 'image/jpeg'
        );
        setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).filter(
            file => file.type === 'image/jpeg'
        );
        console.log('Selected files:', selectedFiles);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const handleConvert = async () => {
        if (files.length === 0) {
            setError('Please select at least one JPG image.');
            return;
        }

        setConverting(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        try {
            const response = await axios.post('/api/convert', formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            setFiles([]);
            setSuccess('PDF successfully generated!');
        } catch (err) {
            console.error('Conversion failed:', err);
            setError('An error occurred during conversion. Please try again.');
        } finally {
            setConverting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Free Image To PDF - From image to PDF with one</title>
                <meta name="description" content="Our free tools convert image to PDF with one click." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">JPG en PDF</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Convertissez vos images en PDF. Ajustez l'orientation et les marges.
                        </p>


                        {files && files.length > 0 ? (
                            <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                                {error && <p className="text-red-500 mt-4">{error}</p>}
                                {success && <p className="text-green-500 mt-4">{success}</p>}
                                <button
                                    onClick={handleConvert}
                                    disabled={converting}
                                    className="bg-main-color hover:bg-blue-300 text-white font-bold py-3 px-6 rounded-lg cursor-pointer inline-flex items-center"
                                >
                                    {converting ? 'Converting...' : 'Convert to PDF'}
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
                                    accept="image/jpeg"
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
                                    Sélectionner les images JPG
                                </label>

                                <p className="mt-2 text-gray-500">ou déposer des images JPG ici</p>
                            </div>


                        )}




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

export default JPGtoPDFConverter;
