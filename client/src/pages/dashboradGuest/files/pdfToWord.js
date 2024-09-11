import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FileUp, FileDown } from 'lucide-react';

const PDFToWordConverter = () => {
    const [file, setFile] = useState(null);
    const [converting, setConverting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Please select a valid PDF file.');
        }
    };

    const handleConvert = async () => {
        if (!file) {
            setError('Please select a PDF file first.');
            return;
        }

        setConverting(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await axios.post('/api/pdf-to-word', formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted.docx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            setFile(null);
            setSuccess('Word document successfully generated!');
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
                <title>Free PDF to Word Converter</title>
                <meta name="description" content="Convert PDF documents to Word with one click using our free tool." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-gray-100 to-white rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">PDF to Word Converter</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Convert your PDF documents to editable Word files easily.
                        </p>

                        <div className="flex flex-col items-center justify-center space-y-4">



                            {!file ? (
                                <>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        id="file-input"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="file-input"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer inline-flex items-center"
                                    >
                                        <FileUp className="mr-2" size={20} />
                                        Select PDF Document
                                    </label>
                                </>
                            ) : (
                                <>
                                    {file && (
                                        <p className="text-sm text-gray-600">
                                            Selected file: {file.name}
                                        </p>
                                    )}

                                    <button
                                        onClick={handleConvert}
                                        disabled={!file || converting}
                                        className={`mt-4 ${!file || converting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-3 px-6 rounded-lg inline-flex items-center`}
                                    >
                                        <FileDown className="mr-2" size={20} />
                                        {converting ? 'Converting...' : 'Convert to Word'}
                                    </button>
                                </>
                            )}


                        </div>

                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
                    </div>
                </div>
            </main>
        </>
    );
};

export default PDFToWordConverter;